"use strict";

if (exports == null) var exports = {};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = httpScript;
exports.parseHttpScript = parseHttpScript;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var REST_OPTIONS = {
  method: "GET",
  url: null,
  queries: {},
  headers: {},
  body: null,
  fileToSend: null,
  saveFile: null,
  state: {},
  js: null,
  runJs: function runJs(response) {
    if (this.js) eval(this.js);
  }
};
var REST_METHODS = {
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
  "delete": 'DELETE',
  head: 'HEAD',
  options: 'OPTIONS',
  trace: 'TRACE'
};
function parseKeyValue(script, regex) {
  var json = {};
  var regexGroups = script.matchAll(regex);
  var _iterator = _createForOfIteratorHelper(regexGroups),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 3),
        _ = _step$value[0],
        key = _step$value[1],
        value = _step$value[2];
      json[key] = value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return json;
}
function getMethod(method) {
  var lowerMethod = method.toLowerCase();
  var upperMethod = REST_METHODS[lowerMethod];
  if (!upperMethod) throw new Error("Method '".concat(method, "' unknown!"));
  return upperMethod;
}
function addProtocol(url) {
  if (!url) return url;
  return url.replace(/^:\d+/, 'http://localhost$&').replace(/^localhost(:\d+)?/, 'http://$&').replace(/^(?:[\w-]+\.)+[a-zA-Z]{2,}/m, 'https://$&').replace(/^(?:\d{1,3}\.){3}\d{1,3}/m, 'http://$&');
}
function parseScript(script) {
  var options = _objectSpread({}, REST_OPTIONS);
  var regexMethod = /^([a-zA-Z]+) +(.*?)$/m;
  if (!regexMethod.test(script)) throw new Error('Method or URL not found');
  var _script$match = script.match(regexMethod),
    _script$match2 = _slicedToArray(_script$match, 3),
    _ = _script$match2[0],
    method = _script$match2[1],
    url = _script$match2[2];
  script = script.replace(regexMethod, '');
  options.method = getMethod(method);
  if (!url) throw new Error('URL is empty');
  options.url = addProtocol(url);
  if (/^\.body/m.test(script)) {
    if (['GET', 'TRACE', 'HEAD'].includes(options.method)) {
      throw new Error("Invalid ".concat(options.method, " method to send body"));
    }
    var regexBody = /^\.body\s*([\s\S]+?)\s*^\./m;
    if (!regexBody.test(script)) {
      throw new Error("Invalid body (check if you forgot to close it with '.')");
    }
    var _script$match3 = script.match(regexBody),
      _script$match4 = _slicedToArray(_script$match3, 2),
      _b = _script$match4[0],
      body = _script$match4[1];
    options.body = body;
    script = script.replace(regexBody, '');
  }
  if (/^\.js/m.test(script)) {
    var regexJs = /^.js\s*([\s\S]+?)\s*^\./m;
    if (!regexJs.test(script)) {
      throw new Error("Invalid js (check if you forgot to close it with '.')");
    }
    var _script$match5 = script.match(regexJs),
      _script$match6 = _slicedToArray(_script$match5, 2),
      _j = _script$match6[0],
      js = _script$match6[1];
    script = script.replace(regexJs, '');
    options.js = js;
  }
  options.queries = parseKeyValue(script, /^(\S+?) *= *(.*?)$/gm);
  options.headers = parseKeyValue(script, /^(\S+?): *(.*?)$/gm);
  if (/^</m.test(script)) {
    var regexFileSend = /< (.+?)$/m;
    if (!regexFileSend.test(script)) throw new Error('File to send not specified');
    var methodSenders = ['POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'];
    var isMethodSender = methodSenders.includes(options.method);
    if (!isMethodSender) {
      throw new Error("Invalid method (".concat(options.method, "), use one this: ") + methodSenders.join(', '));
    }
    var _script$match7 = script.match(regexFileSend),
      _script$match8 = _slicedToArray(_script$match7, 2),
      _sd = _script$match8[0],
      sendedFile = _script$match8[1];
    options.fileToSend = sendedFile;
  }
  if (/^>/m.test(script)) {
    var regexSaveFile = /^> (.+?)$/m;
    if (!regexSaveFile.test(script)) throw new Error('File to save not specified');
    var _script$match9 = script.match(/^> (.+?)$/m),
      _script$match10 = _slicedToArray(_script$match9, 2),
      _sv = _script$match10[0],
      savedFile = _script$match10[1];
    options.saveFile = savedFile;
  }
  return options;
}
function parseHttpScript(restScript) {
  return restScript.replace(/#.*$/gm, '').split(/^---/gm).map(parseScript);
}
function evalParsed(parsed) {
  var regex = /(?<!\\)\$([_\w][_\w.]*)\b/g;
  var escapeRegex = /\\(\$[_\w][_\w.]*)\b/g;
  function parseData(_, data) {
    var props = data.split('.');
    var state = parsed.state;
    if (state == null) {
      throw new Error("Variable 'state' is ".concat(state));
    }
    var _iterator2 = _createForOfIteratorHelper(props),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var prop = _step2.value;
        var tmp = state[prop];
        if (tmp == null) {
          var prettyState = JSON.stringify(parsed.state, null, 2);
          throw new Error("Property '".concat(prop, "' is ").concat(tmp, " on ").concat(data, " with ").concat(prettyState));
        }
        state = tmp;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return state;
  }
  function serializeParsed(obj) {
    var isParsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      if (key === 'state' && isParsed) continue;
      var type = _typeof(value);
      if (type === 'string') {
        obj[key] = value.replace(regex, parseData);
        obj[key] = obj[key].replace(escapeRegex, '$1');
      } else if (type === 'object' && value !== null) obj[key] = serializeParsed(value);
    }
    return obj;
  }
  serializeParsed(parsed, true);
}
function httpRequestDefault(options) {
  console.log(options);
  return options;
}
function httpScript(script) {
  var httpRequest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : httpRequestDefault;
  var parsedList = parseHttpScript(script);
  var state = {};
  var response = null;
  var baseUrl = null;
  var _iterator3 = _createForOfIteratorHelper(parsedList),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var parsed = _step3.value;
      parsed.state = state;
      if (parsed.url.startsWith('http') || parsed.state.baseUrl != null) baseUrl = addProtocol(parsed.state.baseUrl) || new URL(parsed.url).origin;
      if (baseUrl != null && parsed.url.startsWith('/')) parsed.url = baseUrl + parsed.url;
      evalParsed(parsed);
      response = httpRequest(parsed);
      parsed.runJs(response);
      state = _objectSpread(_objectSpread({}, state), parsed.state);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return response;
}
