# HTTP Script

Tool to easily create http request scripts

## Overview

`http-script` is a tool that simplifies the creation and execution of HTTP scripts. This documentation provides an overview of the main features of the tool, including practical instructions and examples.

### Sample Script

```
post httpbin.org/post

q=word
User-Agent: HTTP Script

.body
{"name":"John","age":31}
.

.js
this.state.user = JSON.parse(this.body)
.

< path/to/fileSend.docx
```

```js
{
  method: "POST",
  url: 'https://httpbin.org/post',

  queries: { q: 'word' },
  headers: { 'User-Agent': 'HTTP Script' },
  body: '{"name":"John","age":31}',

  fileToSend: 'path/to/fileSend.docx',
  saveFile: null,

  state: { name: 'John', age: 31 },

  js: 'this.state.user = JSON.parse(this.body)',

  runJs(response) {
    if (this.js) eval(this.js);
  }
}
```

### Installation

To install `http-script`, you can use npm or include the script directly in your HTML:

```sh
npm install github:brunodavi/http-script
```

or

```html
<script src="https://cdn.jsdelivr.net/gh/brunodavi/http-script@1.0.0/dist/httpScript.js"></script>
```

### How to Use

```js
import httpScript from 'http-script';

// Example function for debugging and testing
function httpRequest(options) {
  // Implement your request here
}

httpScript('g :1234', httpRequest);
```

### Script Structure

#### Available Methods

HTTP methods are defined on the first line of the script and can be abbreviated or written in full:

- `g` or `get`
- `p` or `post`
- `u` or `put`
- `a` or `patch`
- `d` or `delete`
- `h` or `head`
- `o` or `options`
- `t` or `trace`

#### URL

The URL follows the method and can be written in various forms:

- `httpbin.org` = `https://httpbin.org`
- `localhost` = `http://localhost`
- `:1234` = `http://localhost:1234`
- `0.0.0.0` = `http://0.0.0.0`

##### Example

```
g :1234 = # GET http://localhost:1234
```

#### Queries

Additional parameters for the request can be specified after the URL or on separate lines:

##### Example

```
g :1234/search

q=item
page=2
```

or

```
g :1234/search?q=item&page=2
```

#### Headers

Headers are specified after the URL, each on a separate line:

##### Example

```
p :1234/search

Content-Type: application/json
Authorization: Bearer token
User-Agent: HTTP Script/1.0.0
Cache-Control: no-cache
```

#### Body

The body of the request is used for methods that accept a body (POST, PUT, PATCH) and should be terminated with a period (`.`):

##### Example

```
p :1234

.body
{
  "name": "user",
  "password": "user12345"
}
.
```

#### JavaScript

JavaScript code can be included to execute during the request and should be terminated with a period (`.`) on the following line. The code has access to `response` and `this`, which contain information about the current request.

##### Example

```
g :1234/user

.js
console.log(JSON.parse(this.body));
console.log(response.data.user.name);
.
```

#### Files

To send or save files, use `<` for sending and `>` for saving. Specify these after the URL and other parameters.

##### Example

```
p :1234/convert/png

< ./image.jpg
> ./image.png
```

### Request Cycle

You can chain requests one after another using `---` to separate each request. Additionally, you can define variables and use a shared state between requests, as well as set a base URL to simplify working with extensive APIs.

#### Chaining Requests

Requests can be separated by `---`:

##### Example

```
p :1234

---

g :1234

---

u :1234

---

d :1234
```

#### Shared States & Variables

States are defined in `this.state` and can be used as variables starting with `$`:

```
g :1234

User-Agent: HTTP Script

.js
this.state.userAgent = this.headers['User-Agent'];
.

---

p :1234

User-Agent: $userAgent
```

#### Base URL

The base URL is automatically set if `this.state.baseUrl` is not defined, completing the URL if it starts with `/`:

```
g httpbin.org/get

---

p /post

.js
this.state.baseUrl = 'reqres.in/api';
.

---

g /users/2
```
