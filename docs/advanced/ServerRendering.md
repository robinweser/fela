# Server Rendering
As [already mentioned](../introduction/Benefits.md), Fela supports server-side rendering out of the box.
All you need to to is call `renderToString` once you are finished rendering styles and you will get the final CSS markup.<br>
That's it. No magic. No extra configuration.

Usually you will render all styles on the server and inject the rendered CSS markup into the HTML markup which gets sent to the client.
## Example
The following code shows a simple server example using [express](https://github.com/expressjs/express) and [React](https://github.com/facebook/react).
```javascript
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createRenderer } from 'fela'

import express from 'express'

const rule = props => ({
    color: props.color,
    fontSize: '15px'
})

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

const server = express()

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
#### Output *(localhost:8080)*
```HTML
<!DOCTYPE html>
<html>
<head>
  <style id="stylesheet">
    .c0{font-size:15px}.c0-foo{color:blue}
  </style>
  <title>Fela - Server Rendering</title>
</head>
<body>
  <div id="app">
    <div class="c0 c0-foo">
      Hello World
    </div>
  </div>
</body>
</html>
```

<br>

---

### Related
* [API reference - `Renderer.renderToString`](../api/Renderer.md#rendertostring)
