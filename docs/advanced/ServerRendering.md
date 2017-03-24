# Server Rendering
As [already mentioned](../introduction/Benefits.md), Fela supports server-side rendering out of the box.
All you need to to is call `renderToMarkup` once you are finished rendering styles and you will get the final HTML markup for the `<style>` elements.<br>
That's it. No magic. No extra configuration.

Usually you will render all styles on the server and inject the rendered CSS markup into the HTML markup which gets sent to the client.

## Example
The following code shows a simple server example using [express](https://github.com/expressjs/express) and [React](https://github.com/facebook/react).
```javascript
import React from 'react'
import { renderToString } from 'react-dom/server'

import { createRenderer } from 'fela'
import { renderToMarkup } from 'fela-dom/server'

import express from 'express'

const rule = props => ({
  color: props.color,
  fontSize: '15px'
})

renderer.renderStatic({
  margin: 0,
  padding: 0,
}, 'html, body')

// simplified demo app
const App = ({ renderer }) => (
  <div className={renderer.renderRule(rule, { color: 'blue' })}>
    Hello World
  </div>
)

// Our initial html template
const appHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Fela - Server Rendering</title>
  {{style}}
</head>
<body>
  <div id="app">
    {{app}}
  </div>
</body>
</html>
`

const server = express()

server.get('/', (req, res) => {
  const renderer = createRenderer()

  const htmlMarkup = renderToString(
    <App renderer={renderer} />
  )

  const styleMarkup = renderToMarkup(renderer)
  // inject the rendered html and css markup into the basic app html
  res.write(appHTML.replace('{{app}}', htmlMarkup).replace('{{style}}', styleMarkup))
  res.end()
})
// provide the content via localhost:8080
server.listen(8080, 'localhost')
```
#### Output *(localhost:8080)*
```HTML
<!DOCTYPE html>
<html>
<head>
  <title>Fela - Server Rendering</title>
  <style type="text/css" data-fela-type="STATIC">
    html, body{margin:0;padding:0}
  </style>
  <style type="text/css" data-fela-type="RULE">
    .a{color:blue}.b{font-size:15px}
  </style>
</head>
<body>
  <div id="app">
    <div class="a b">
      Hello World
    </div>
  </div>
</body>
</html>
```

<br>

---

### Related
* [API reference - `Renderer.renderToString`](../api/fela/Renderer.md#rendertostring)
