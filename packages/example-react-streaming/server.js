import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { Provider } from 'react-fela'
import fs from 'fs'
import App from './app'
import createRenderer from './renderer'

const app = express()

app.use(
  '/bundle.js',
  proxy('localhost:8080', { forwardPath: () => '/bundle.js' })
)

app.get('/', (req, res) => {
  const renderer = createRenderer()
  const indexHTML = fs.readFileSync(`${__dirname}/index.html`).toString()
  const parts = indexHTML.split('{{app}}')

  res.write(parts[0])

  const stream = renderToNodeStream(
    <Provider renderer={renderer}>
      <App />
    </Provider>
  )

  stream.pipe(res, { end: false })
  stream.on('end', () => {
    res.write(parts[1])
    res.end()
  })
})

app.listen(8000, 'localhost', () => {
  console.log('Access the universal app at http://%s:%d', 'localhost', 8000)
})
