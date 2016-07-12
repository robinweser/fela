import express from 'express'
import proxy from 'express-http-proxy'
import Inferno from 'inferno'
import { renderToString } from 'inferno-server'
import { Provider } from 'inferno-fela'
import fs from 'fs'

import App from './app.js'
import createRenderer from './renderer'

const app = express()

app.use('/bundle.js', proxy('localhost:8080', {
  forwardPath: () => '/bundle.js'
}))

app.get('/', (req, res) => {
  const renderer = createRenderer()

  const indexHTML = fs.readFileSync(__dirname + '/index.html').toString()
  const appHtml = renderToString(
    <Provider renderer={renderer}>
      <App />
    </Provider>
  )
  const appCSS = renderer.renderToString()
  const fontCSS = renderer.fontRenderer.renderToString()

  res.write(indexHTML.replace('<!-- {{app}} -->', appHtml).replace('<!-- {{css}} -->', appCSS).replace('<!-- {{fonts}} -->', fontCSS))
  res.end()
})

app.listen(8000, 'localhost', () => {
  console.log('Access the universal app at http://%s:%d', 'localhost', 8000)
})
