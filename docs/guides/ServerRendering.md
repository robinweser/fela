# Server Rendering
As [already mentioned](../introduction/Benefits.md), Fela supports server-side rendering from the very beginning.
All you need to to is call `renderToString` once you are finished rendering styles and you will get the final CSS markup.<br>
Basically that's it. No magic. No extra configuration.

Usually you will render all styles on the server and inject the rendered CSS markup into the HTML markup which gets sent to the client.
## Example
The following code shows a simple server example using [express](https://github.com/expressjs/express) and [React](https://github.com/facebook/react). Assuming `app.js` is our root React component and we pass the renderer as a prop to use it.
```javascript
import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createRenderer } from 'fela'
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
