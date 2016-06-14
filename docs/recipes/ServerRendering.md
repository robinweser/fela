# Server Rendering
As [already mentioned](../introduction/Benefits.md), Fela supports server-side rendering from the very beginning. There actually is only one difference to DOM rendering at all. The `createRenderer` API itself. To render styles on the server we have to import the `createRenderer` from `fela/server` rather than from `fela` directly.
It does not accept a `mountNode`, but only configuration. All methods are identical to the one the DOM renderer uses.
```javascript
import { createRenderer } from 'fela/server'
const renderer = createRenderer()
const rule = props => ({ color: props.color })
renderer.renderRule(rule, { color: 'blue' })
```
Basically that's it. No magic. No extra configuration. Just switch the `createRenderer` and go.
## renderToString
Usually you will render all styles on the server and inject the rendered CSS markup into the HTML markup which gets sent to the client. To get the CSS markup at any time, just use the `renderToString`-method.
```javascript
import { createRenderer } from 'fela/server'
const renderer = createRenderer()
const rule = props => ({
  fontSize: '12px',
  color: props.color
})
renderer.renderRule(rule, { color: 'blue' })
console.log(renderer.renderToString())
// .c0{font-size:12px}.c0-wrn5fh{color:blue}
```
## Example
The following code shows a simple server example using [express](https://github.com/expressjs/express) and [React](https://github.com/facebook/react). Assuming `app.js` is our root React component and we pass the renderer as a prop to use it.
```javascript
import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createRenderer } from 'fela/server'
import App from './app.js'
const server = express()
// Our initial html template
const appHTML = `
<!DOCTYPE html>
<html>
<head>
  <style id="stylesheet">
    <!-- {{css}} -->
  </style>
  <title>Fela - Server Rendering</title>
</head>
<body>
  <div id="app">
    <!-- {{app}} -->
  </div>
</body>
</html>
`
server.get('/', (req, res) => {
  const renderer = createRenderer()
  const htmlMarkup = renderToString(
    <App renderer={renderer} />
  )

  const cssMarkup = renderer.renderToString()
  // inject the rendered html and css markup into the basic app html
  res.write(appHTML.replace('<!-- {{app}} -->', htmlMarkup).replace('<!-- {{css}} -->', cssMarkup))
  res.end()
})
// provide the content via localhost:8080
server.listen(8080, 'localhost')
```
