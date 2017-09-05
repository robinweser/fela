import express from 'express'
import proxy from 'express-http-proxy'
import { h } from 'preact'
import render from 'preact-render-to-string'
import { Provider } from 'preact-fela'
import { renderToMarkup } from 'fela-dom'
import fs from 'fs'
import App from './app.js'
import createRenderer from './renderer'

const app = express()

app.use('/bundle.js', proxy('localhost:8080', { forwardPath: () => '/bundle.js' }))

app.get('/', (req, res) => {
  const renderer = createRenderer()

  const indexHTML = fs.readFileSync(`${__dirname}/index.html`).toString()
  const appHtml = render(
    <Provider renderer={renderer}>
      <App />
    </Provider>
  )
  const appCSS = renderToMarkup(renderer)

  res.write(indexHTML.replace('<!-- {{app}} -->', appHtml).replace('<!-- {{css}} -->', appCSS))
  res.end()
})

app.listen(8000, 'localhost', () => {
  console.log('Access the universal app at http://%s:%d', 'localhost', 8000)
})
