import assert from "node:assert"

import httpScript from "../src/httpScript.js";

function testAutoBaseUrl() {
  console.log('Testing Auto Base Url...')

  assert.strictEqual(
    httpScript(
      'g https://httpbin.org/get'
      + '\n---'
      + '\np /post'
    ).url,

    'https://httpbin.org/post'
  )

  assert.strictEqual(
    httpScript(
      'g httpbin.org/get'
      + '\n---'
      + '\np /post'
    ).url,

    'https://httpbin.org/post'
  )

  assert.strictEqual(
    httpScript(
      'g 0.0.0.0/index.html'
      + '\n---'
      + '\np /settings.html'
      + '\n---'
      + '\np /save.html'
    ).url,

    'http://0.0.0.0/save.html'
  )

  assert.strictEqual(
    httpScript(
      'g 0.0.0.0/index.html'
      + '\n---'
      + '\np 192.168.0.1/settings.html'
      + '\n---'
      + '\np /save.html'
    ).url,

    'http://192.168.0.1/save.html'
  )

  assert.strictEqual(
    httpScript(
      'p 0.0.0.0/index.html'
      + '\n'
      + '\n.js'
      + '\nthis.state.baseUrl = "0.0.0.0"'
      + '\n.'
      + '\n---'
      + '\np 192.168.0.1/settings.html'
    ).url,

    'http://192.168.0.1/settings.html'
  )

  assert.strictEqual(
    httpScript(
      'p 0.0.0.0/index.html'
      + '\n'
      + '\n.js'
      + '\nthis.state.baseUrl = "0.0.0.0"'
      + '\n.'
      + '\n---'
      + '\np 192.168.0.1/settings.html'
      + '\n---'
      + '\np /save.html'
    ).url,

    'http://0.0.0.0/save.html'
  )

  assert.strictEqual(
    httpScript(
      'p 0.0.0.0/index.html'
      + '\n'
      + '\n.js'
      + '\nthis.state.baseUrl = "https://0.0.0.0"'
      + '\n.'
      + '\n---'
      + '\np 192.168.0.1/settings.html'
      + '\n---'
      + '\np /save.html'
    ).url,

    'https://0.0.0.0/save.html'
  )

  assert.strictEqual(
    httpScript(
      'p 0.0.0.0/index.html'
      + '\n'
      + '\n.js'
      + '\nthis.state.baseUrl = "https://0.0.0.0/config"'
      + '\n.'
      + '\n---'
      + '\np /firewall.html'
    ).url,

    'https://0.0.0.0/config/firewall.html'
  )
}

function testVariables() {
  console.log('Testing Variables...')

  function funcAuth(request) {
    console.log(request)
    const auth = request.headers['Authorization']

    if (typeof request.body === 'string') {
      const json = JSON.parse(request.body)

      if (json.user === 'demo' && json.key === '123')
        return { token: 'XXX' }
    }

    if (auth === 'Bearer XXX') {
      return {
        user: {
          id: 1,
          name: 'demo',
          key: '123'
        }
      }
    }

    return request
  }

  assert.strictEqual(
    httpScript(
      'g :1234'
      + '\n'
      + '\n.js'
      + '\nthis.state.user = { id: 1 }'
      + '\n.'
      + '\n---'
      + '\ng :1234/$user.id'
    ).url,

    'http://localhost:1234/1'
  )

  const authResult = httpScript(
    'p :1234/auth'
    + '\n'
    + '\n.body'
    + '\n{"user": "demo", "key": "123"}'
    + '\n.'
    + '\n'
    + '\n.js'
    + '\nthis.state.token = response.token'
    + '\n.'
    + '\n---'
    + '\ng :1234/user/config'
    + '\n'
    + '\nAuthorization: Bearer $token'
    + '\n',

    funcAuth
  )

  assert.deepEqual(
    authResult,
    {
      user: {
        id: 1,
        name: 'demo',
        key: '123'
      }
    }
  )

  assert.strictEqual(
    httpScript(
      'g :1234'
      + '\n'
      + '\n.js'
      + '\nthis.state.arr = [1, 2, 3]'
      + '\n.'
      + '\n---'
      + '\ng :1234/$arr.0/$arr.1'
    ).url,

    'http://localhost:1234/1/2'
  )

  assert.strictEqual(
    httpScript(
      'g :1234'
      + '\n'
      + '\n.js'
      + '\nthis.state.user = "Test"'
      + '\n.'
      + '\n---'
      + '\ng :1234'
      + '\n'
      + '\nUser-Agent:$user'
      + '\n'
    ).headers['User-Agent'],

    'Test'
  )

  assert.strictEqual(
    httpScript(
      'g :1234'
      + '\n'
      + '\n.js'
      + '\nthis.state.user = "Test"'
      + '\n.'
      + '\n---'
      + '\ng :1234/search'
      + '\n'
      + '\nq=$user'
      + '\n'
    ).queries.q,

    'Test'
  )

  const resultFiles = httpScript(
    'g :1234/image.png'
    + '\n'
    + '\n.js'
    + '\nthis.state.image = this.url.split("/").slice(-1)'
    + '\nthis.state.path = "/path/to"'
    + '\n.'
    + '\n---'
    + '\np :1234/galery'
    + '\n< $path/$image'
    + '\n> $path/data.json'
  )

  assert.strictEqual(resultFiles.fileToSend, '/path/to/image.png')
  assert.strictEqual(resultFiles.saveFile, '/path/to/data.json')

  assert.strictEqual(
    httpScript(
      'g :1234'
      + '\n'
      + '\n.js'
      + '\nthis.state.image = "test.png"'
      + '\n.'
      + '\n---'
      + '\np :1234'
      + '\n.js'
      + '\nthis.state.image = "_$image"'
      + '\n.'
    ).state.image,

    '_test.png'
  )

  assert.strictEqual(
    httpScript(
      'g :1234'
      + '\n'
      + '\n.js'
      + '\nthis.state.image = "test.png"'
      + '\n.'
      + '\n---'
      + '\np :1234'
      + '\n.body'
      + '\nfield=$image'
      + '\n.'
    ).body,

    'field=test.png'
  )
}

function testState() {
  console.log('Testing State...')

  const result = httpScript(
    'g :1234'
    + '\n'
    + '\n'
    + '\n.js'
    + '\nthis.state.data = 0'
    + '\n.'
    + '\n---'
    + '\ng :1234'
    + '\n'
    + '\n'
    + '\n.js'
    + '\nthis.state.name = "John Due"'
    + '\n.'
  )

  assert.strictEqual(result.state.data, 0)
  assert.strictEqual(result.state.name, "John Due")
}


export default function testHttpScript() {
  testAutoBaseUrl()
  testVariables()
  testState()

  console.log('Tests httpScript OK\n')
}
