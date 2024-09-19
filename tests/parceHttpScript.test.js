import assert from 'node:assert'
import { parseHttpScript } from '../src/httpScript.js'


function testMethods() {
  console.log('Testing Methods...')

  assert.strictEqual(
    parseHttpScript('g :1234')[0].method,
    'GET',
  )

  assert.strictEqual(
    parseHttpScript('get :1234')[0].method,
    'GET',
  )

  assert.strictEqual(
    parseHttpScript('p :1234')[0].method,
    'POST',
  )

  assert.strictEqual(
    parseHttpScript('post :1234')[0].method,
    'POST',
  )

  assert.strictEqual(
    parseHttpScript('u :1234')[0].method,
    'PUT',
  )

  assert.strictEqual(
    parseHttpScript('put :1234')[0].method,
    'PUT',
  )

  assert.strictEqual(
    parseHttpScript('a :1234')[0].method,
    'PATCH',
  )

  assert.strictEqual(
    parseHttpScript('patch :1234')[0].method,
    'PATCH',
  )

  assert.strictEqual(
    parseHttpScript('d :1234')[0].method,
    'DELETE',
  )

  assert.strictEqual(
    parseHttpScript('delete :1234')[0].method,
    'DELETE',
  )

  assert.strictEqual(
    parseHttpScript('h :1234')[0].method,
    'HEAD',
  )
  assert.strictEqual(
    parseHttpScript('head :1234')[0].method,
    'HEAD',
  )

  assert.strictEqual(
    parseHttpScript('o :1234')[0].method,
    'OPTIONS',
  )

  assert.strictEqual(
    parseHttpScript('options :1234')[0].method,
    'OPTIONS',
  )

  assert.strictEqual(
    parseHttpScript('t :1234')[0].method,
    'TRACE',
  )

  assert.strictEqual(
    parseHttpScript('trace :1234')[0].method,
    'TRACE',
  )

  assert.strictEqual(
    parseHttpScript('G :1234')[0].method,
    'GET',
  )

  assert.strictEqual(
    parseHttpScript('Get :1234')[0].method,
    'GET',
  )

  assert.strictEqual(
    parseHttpScript('P :1234')[0].method,
    'POST',
  )

  assert.strictEqual(
    parseHttpScript('Post :1234')[0].method,
    'POST',
  )

  assert.strictEqual(
    parseHttpScript('U :1234')[0].method,
    'PUT',
  )

  assert.strictEqual(
    parseHttpScript('Put :1234')[0].method,
    'PUT',
  )

  assert.strictEqual(
    parseHttpScript('A :1234')[0].method,
    'PATCH',
  )

  assert.strictEqual(
    parseHttpScript('Patch :1234')[0].method,
    'PATCH',
  )

  assert.strictEqual(
    parseHttpScript('D :1234')[0].method,
    'DELETE',
  )

  assert.strictEqual(
    parseHttpScript('Delete :1234')[0].method,
    'DELETE',
  )

  assert.strictEqual(
    parseHttpScript('H :1234')[0].method,
    'HEAD',
  )
  assert.strictEqual(
    parseHttpScript('Head :1234')[0].method,
    'HEAD',
  )

  assert.strictEqual(
    parseHttpScript('O :1234')[0].method,
    'OPTIONS',
  )

  assert.strictEqual(
    parseHttpScript('Options :1234')[0].method,
    'OPTIONS',
  )

  assert.strictEqual(
    parseHttpScript('T :1234')[0].method,
    'TRACE',
  )

  assert.strictEqual(
    parseHttpScript('Trace :1234')[0].method,
    'TRACE',
  )
}

function testUrl() {
  console.log('Testing Url...')

  const domain = 'httpbin.org'
  const siteUrl = `https://${domain}`

  const site = {}

  site.home = domain
  site.path = domain + '/get'
  site.query = domain + '/get?q=test'


  const ipDomain = '192.168.0.1'

  const ip = {}

  ip.port = ipDomain + ':8000'
  ip.path = ipDomain + '/index.html'
  ip.query = ipDomain + '/search.html?q=0.0.0.0'


  assert.strictEqual(
    parseHttpScript('g :1234')[0].url,
    'http://localhost:1234'
  )

  assert.strictEqual(
    parseHttpScript('g localhost')[0].url,
    'http://localhost'
  )

  assert.strictEqual(
    parseHttpScript('g localhost:1234')[0].url,
    'http://localhost:1234'
  )

  assert.strictEqual(
    parseHttpScript('g http://localhost')[0].url,
    'http://localhost'
  )

  assert.strictEqual(
    parseHttpScript('g http://localhost:1234')[0].url,
    'http://localhost:1234'
  )

  assert.strictEqual(
    parseHttpScript(`g ${site.home}`)[0].url,
    siteUrl
  )

  assert.strictEqual(
    parseHttpScript(`g ${site.path}`)[0].url,
    siteUrl + '/get'
  )

  assert.strictEqual(
    parseHttpScript(`g ${site.query}`)[0].url,
    siteUrl + '/get?q=test'
  )

  assert.strictEqual(
    parseHttpScript(`g ${ip.port}`)[0].url,
    `http://${ipDomain}:8000`
  )

  assert.strictEqual(
    parseHttpScript(`g ${ip.path}`)[0].url,
    `http://${ipDomain}/index.html`
  )

  assert.strictEqual(
    parseHttpScript(`g ${ip.query}`)[0].url,
    `http://${ipDomain}/search.html?q=0.0.0.0`
  )
}

function testQueries() {
  console.log('Testing Queries...')

  const [result] = parseHttpScript(
    'g :1234/search'
    + '\n'
    + '\nq=item'
    + '\nlimit =10'
    + '\npage= 2'
    + '\ndev='
    + '\n'
    + '\nsort = likes'
  )

  assert.deepEqual(
    result.queries,

    {
      q: 'item',
      limit: '10',
      page: '2',
      dev: '',
      sort: 'likes'
    }
  )
}

function testHeaders() {
  console.log('Testing Headers...')

  const [result] = parseHttpScript(
    'g :1234/search'
    + '\n'
    + '\nContent-Type: application/json'
    + '\nAuthorization: Bearer xxx'
    + '\n'
    + "\nAccept:application/xml"
    + '\nUser-Agent:Testing'
    + '\n'
    + '\n'
    + '\n@123:321'
    + '\nX-Request-ID: 12345'
    + '\nContent-Length: '
    + '\nNo-Value:'
    + '\nCache-Control:no-cache'
  )

  assert.deepEqual(
    result.headers,

    {
      "Content-Type": "application/json",
      "Authorization": "Bearer xxx",
      "Accept": "application/xml",
      "User-Agent": "Testing",
      "@123": "321",
      "X-Request-ID": "12345",
      "Content-Length": "",
      "No-Value": "",
      "Cache-Control": "no-cache"
    }
  )
}

function testBody() {
  console.log('Testing Body...')

  const [result] = parseHttpScript(
    'p :1234'
    + '\n'
    + '\n.body'
    + '\n'
    + '\n'
    + '\n{'
    + '\n\t"name": "user",'
    + '\n\t"password": "user12345"'
    + '\n}'
    + '\n'
    + '\n.'
  )

  const bodyExpected = (
    '{'
    + '\n\t"name": "user",'
    + '\n\t"password": "user12345"'
    + '\n}'
  )

  assert.strictEqual(result.body, bodyExpected)
}

function testJs() {
  console.log('Testing Js...')

  const [result] = parseHttpScript(
    'p :1234'
    + '\n'
    + '\n.js'
    + '\n'
    + '\n'
    + '\nconsole.log("test")'
    + '\nconsole.log(this)'
    + '\n'
    + '\n.'
  )

  const jsExpected = (
    'console.log("test")'
    + '\nconsole.log(this)'
  )

  assert.strictEqual(result.js, jsExpected)
}

function testFiles() {
  console.log('Testing Files...')

  const [resultConvert] = parseHttpScript(
    'p :1234/convert/png'
    + '\n'
    + '\n< ./image.jpg'
    + '\n> ./image.png'
    + '\n'
  )

  assert.strictEqual(resultConvert.fileToSend, './image.jpg')
  assert.strictEqual(resultConvert.saveFile, './image.png')


  const [result] = parseHttpScript(
    'g :1234/photos/png/image.png'
    + '\n'
    + '\n> ./image.png'
    + '\n'
  )

  assert(result.url.endsWith('.png'))
  assert.strictEqual(result.saveFile, './image.png')
}

function testMultiples() {
  console.log('Testing Multiples Requests Scripts...')

  const url = 'http://localhost:1234'

  const [getResult, postResult, putResult] = parseHttpScript(
    'g :1234'
    + '\n'
    + '\nq=item'
    + '\nContent-Type: application/json'
    + '\n---'
    + '\np :1234'
    + '\n.body'
    + '\nfield=123'
    + '\n.'
    + '\n< ./file.txt'
    + '\n---'
    + '\nu :1234'
    + '\n> ./data.json'
    + '\n.js'
    + '\nconsole.log(123)'
    + '\n.'
  )

  assert.strictEqual(getResult.url, url)
  assert.strictEqual(getResult.queries.q, 'item')
  assert.strictEqual(
    getResult.headers['Content-Type'],
    'application/json'
  )

  assert.strictEqual(postResult.url, url)
  assert.strictEqual(postResult.body, 'field=123')
  assert.strictEqual(postResult.fileToSend, './file.txt')

  assert.strictEqual(putResult.url, url)
  assert.strictEqual(putResult.saveFile, './data.json')
  assert.strictEqual(putResult.js, 'console.log(123)')
}

function testInvalidMethods() {
  console.log('Testing Invalid Methods...')

  try {
    parseHttpScript('gg :1234')
    assert.fail('Not fail, invalid method')
  } catch (error) {
    assert.strictEqual(error.message, "Method 'gg' unknown!")
  }

  try {
    parseHttpScript(' :1234')
    assert.fail('Not fail, invalid method')
  } catch (error) {
    assert.strictEqual(error.message, "Method or URL not found")
  }
}

function testInvalidUrls() {
  console.log('Testing Invalid Urls...')

  try {
    parseHttpScript('g ')
    assert.fail('Not fail, invalid url')
  } catch (error) {
    assert.strictEqual(error.message, "URL is empty")
  }

  try {
    parseHttpScript('g')
    assert.fail('Not fail, invalid url')
  } catch (error) {
    assert.strictEqual(error.message, "Method or URL not found")
  }

  try {
    parseHttpScript('ghttp://0.0.0.0')
    assert.fail('Not fail, invalid url')
  } catch (error) {
    assert.strictEqual(error.message, "Method or URL not found")
  }
}


function testInvalidQueries() {
  console.log('Testing Invalid Queries...')

  assert.deepEqual(
    parseHttpScript(
      'g :1234'
      + '\n=value123'
      + '\n = value123'
      + '\n   =value123'
      + '\n =  value123'
    )[0].queries,
    {}
  )
}

function testInvalidHeaders() {
  console.log('Testing Invalid Headers...')

  assert.deepEqual(
    parseHttpScript(
      'g :1234'
      + '\n:value123'
      + '\n: value123'
      + '\n : value123'
      + '\n: value123'
      + '\n :  value123'
    )[0].headers,
    {}
  )
}

function testInvalidBody() {
  console.log('Testing Invalid Body...')

  try {
    parseHttpScript(
      'g :1234'
      + '\n'
      + '\n.body'
      + '\nfield=data'
      + '\n.'
    )
    assert.fail('Not fail, invalid url')
  } catch (error) {
    assert.strictEqual(error.message, "Invalid GET method to send body")
  }

  try {
    parseHttpScript(
      'p :1234'
      + '\n'
      + '\n.body'
      + '\nfield=data'
      + '\n'
    )
    assert.fail('Not fail, invalid url')
  } catch (error) {
    assert.strictEqual(error.message, "Invalid body (check if you forgot to close it with '.')")
  }
}

function testInvalidJs() {
  console.log('Testing Invalid Js...')

  try {
    parseHttpScript(
      'p :1234'
      + '\n'
      + '\n.js'
      + '\nconsole.log(this)'
      + '\n'
    )
    assert.fail('Not fail, invalid url')
  } catch (error) {
    assert.strictEqual(error.message, "Invalid js (check if you forgot to close it with '.')")
  }
}

function testInvalidSendToFile() {
  console.log('Testing Invalid Send To File...')

  try {
    parseHttpScript(
      'g :1234'
      + '\n'
      + '\n< image.png'
    )
    assert.fail('Not fail, invalid url')
  } catch (error) {
    assert.strictEqual(
      error.message,
      "Invalid method (GET), use one this: "
      + "POST, PUT, PATCH, OPTIONS, DELETE")
  }

  try {
    parseHttpScript(
      'p :1234'
      + '\n'
      + '\n< '
    )
    assert.fail('Not fail, invalid url')
  } catch (error) {
    assert.strictEqual(error.message, "File to send not specified")
  }

  try {
    parseHttpScript(
      'p :1234'
      + '\n'
      + '\n<'
    )
    assert.fail('Not fail, invalid url')
  } catch (error) {
    assert.strictEqual(error.message, "File to send not specified")
  }
}

function testInvalidSaveFile() {
  console.log('Testing Invalid Save File...')
  try {
    parseHttpScript(
      'p :1234'
      + '\n'
      + '\n> '
    )
    assert.fail('Not fail, invalid url')
  } catch (error) {
    assert.strictEqual(error.message, "File to save not specified")
  }

  try {
    parseHttpScript(
      'p :1234'
      + '\n'
      + '\n>'
    )
    assert.fail('Not fail, invalid url')
  } catch (error) {
    assert.strictEqual(error.message, "File to save not specified")
  }
}

export default function testParseHttpScript() {
  testMethods()
  testUrl()
  testQueries()
  testHeaders()
  testBody()
  testJs()
  testFiles()
  testMultiples()

  testInvalidMethods()
  testInvalidUrls()
  testInvalidQueries()
  testInvalidHeaders()
  testInvalidBody()
  testInvalidJs()
  testInvalidSendToFile()
  testInvalidSaveFile()

  console.log('Tests parseHttpScript OK\n')
}

