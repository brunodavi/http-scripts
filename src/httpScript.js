const REST_OPTIONS = {
  method: "GET",
  url: null,

  queries: {},
  headers: {},
  body: null,

  fileToSend: null,
  saveFile: null,

  state: {},

  js: null,

  runJs(response) {
    if (this.js) eval(this.js)
  }
}

const REST_METHODS = {
  g: 'GET',
  p: 'POST',
  u: 'PUT',
  a: 'PATCH',
  d: 'DELETE',
  h: 'HEAD',
  o: 'OPTIONS',
  t: 'TRACE',

  get: 'GET',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
  delete: 'DELETE',
  head: 'HEAD',
  options: 'OPTIONS',
  trace: 'TRACE',
}

function parseKeyValue(script, regex) {
  const json = {}
  const regexGroups = script.matchAll(regex)

  for (const [_, key, value] of regexGroups)
    json[key] = value

  return json
}

function getMethod(method) {
  let lowerMethod = method.toLowerCase()
  const upperMethod = REST_METHODS[lowerMethod]

  if (!upperMethod)
    throw new Error(`Method '${method}' unknown!`)

  return upperMethod
}

function addProtocol(url) {
  if (!url) return url

  return url
    .replace(/^:\d+/, 'http://localhost$&')
    .replace(/^localhost(:\d+)?/, 'http://$&')
    .replace(
      /^(?:[\w-]+\.)+[a-zA-Z]{2,}/m,
      'https://$&'
    )
    .replace(
      /^(?:\d{1,3}\.){3}\d{1,3}/m,
      'http://$&'
    )
}

function parseScript(script) {
  const options = { ...REST_OPTIONS }

  const regexMethod = /^([a-zA-Z]+) +(.*?)$/m

  if (!regexMethod.test(script))
    throw new Error('Method or URL not found')

  const [_, method, url] = (
    script.match(regexMethod)
  )

  script = script.replace(regexMethod, '')

  options.method = getMethod(method)

  if (!url)
    throw new Error('URL is empty')

  options.url = addProtocol(url)

  if (/^\.body/m.test(script)) {
    if (['GET', 'TRACE', 'HEAD'].includes(options.method)) {
      throw new Error(`Invalid ${options.method} method to send body`)
    }

    const regexBody = /^\.body\s*([\s\S]+?)\s*^\./m

    if (!regexBody.test(script)) {
      throw new Error("Invalid body (check if you forgot to close it with '.')")
    }

    const [_b, body] = script.match(regexBody)
    options.body = body

    script = script.replace(regexBody, '')
  }

  if (/^\.js/m.test(script)) {
    const regexJs = /^.js\s*([\s\S]+?)\s*^\./m

    if (!regexJs.test(script)) {
      throw new Error("Invalid js (check if you forgot to close it with '.')")
    }

    const [_j, js] = script.match(regexJs)
    script = script.replace(regexJs, '')

    options.js = js
  }

  options.queries = parseKeyValue(
    script,
    /^(\S+?) *= *(.*?)$/gm
  )

  options.headers = parseKeyValue(
    script,
    /^(\S+?): *(.*?)$/gm
  )

  if (/^</m.test(script)) {
    const regexFileSend = /< (.+?)$/m

    if (!regexFileSend.test(script))
      throw new Error('File to send not specified')

    const methodSenders = [
      'POST',
      'PUT',
      'PATCH',
      'OPTIONS',
      'DELETE'
    ]

    const isMethodSender = (
      methodSenders
        .includes(options.method)
    )

    if (!isMethodSender) {
      throw new Error(
        `Invalid method (${options.method}), use one this: ` +
        methodSenders.join(', ')
      )
    }

    const [_sd, sendedFile] = script.match(regexFileSend)
    options.fileToSend = sendedFile
  }

  if (/^>/m.test(script)) {
    const regexSaveFile = /^> (.+?)$/m

    if (!regexSaveFile.test(script))
      throw new Error('File to save not specified')

    const [_sv, savedFile] = script.match(/^> (.+?)$/m)
    options.saveFile = savedFile
  }

  return options
}

export function parseHttpScript(restScript) {
  return (
    restScript
      .replace(/#.*$/gm, '')
      .split(/^---/gm)
      .map(parseScript)
  )
}

function evalParsed(parsed) {
  const regex = /(?<!\\)\$([_\w][_\w.]*)\b/g
  const escapeRegex = /\\(\$[_\w][_\w.]*)\b/g

  function parseData(_, data) {
    const props = data.split('.')
    let state = parsed.state

    if (state == null) {
      throw new Error(`Variable 'state' is ${state}`)
    }

    for (let prop of props) {
      const tmp = state[prop];

      if (tmp == null) {
        const prettyState = JSON.stringify(parsed.state, null, 2)
        throw new Error(`Property '${prop}' is ${tmp} on ${data} with ${prettyState}`);
      }

      state = tmp;
    }

    return state
  }

  function serializeParsed(obj, isParsed = false) {
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'state' && isParsed) continue

      const type = typeof value

      if (type === 'string') {
        obj[key] = value.replace(regex, parseData)
        obj[key] = obj[key].replace(escapeRegex, '$1')
      }
      else if (type === 'object' && value !== null)
        obj[key] = serializeParsed(value)
    }

    return obj
  }

  serializeParsed(parsed, true)
}

function httpRequestDefault(options) {
  console.log(options)
  return options
}

export default function httpScript(script, httpRequest = httpRequestDefault, state = {}) {
  const parsedList = parseHttpScript(script)

  let state = { ...state }
  let response = null
  let baseUrl = null

  for (const parsed of parsedList) {
    parsed.state = state

    if (
      parsed.url.startsWith('http')
      || parsed.state.baseUrl != null
    )
      baseUrl = (
        addProtocol(parsed.state.baseUrl) ||
        new URL(parsed.url).origin
      )

    if (baseUrl != null && parsed.url.startsWith('/'))
      parsed.url = baseUrl + parsed.url

    evalParsed(parsed)

    response = httpRequest(parsed)

    parsed.runJs(response)
    state = { ...state, ...parsed.state }
  }

  return response
}
