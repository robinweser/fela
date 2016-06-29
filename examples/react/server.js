import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-fela'
import Fela, { createRenderer } from 'fela'
import prefixer from 'fela-plugin-prefixer'
import fallbackValue from 'fela-plugin-fallback-value'
import unit from 'fela-plugin-unit'
import fs from 'fs'

import App from './app.js'

const app = express()

app.use('/bundle.js', proxy('localhost:8080', {
  forwardPath: () => '/bundle.js'
}))

app.get('/', (req, res) => {
  const plugins = [ prefixer(), fallbackValue(), unit() ]
  const renderer = createRenderer({ plugins: plugins })

  renderer.renderStatic({
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0
  }, 'html,body,#app')

  renderer.renderStatic({ display: 'flex' }, 'div')
  const indexHTML = fs.readFileSync(__dirname + '/index.html').toString()
  const appHtml = renderToString(
    <Provider renderer={renderer}>
      <App />
    </Provider>
  )
  const appCSS = renderer.renderToString()

  res.write(indexHTML.replace('<!-- {{app}} -->', appHtml).replace('<!-- {{css}} -->', appCSS))
  res.end()
})

app.listen(8000, 'localhost', () => {
  console.log('Access the universal app at http://%s:%d', 'localhost', 8000)
})
