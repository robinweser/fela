import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import { renderToString } from 'react-dom/server'
import fs from 'fs'

import App from './app.js'
import { Renderer } from '../../modules/felaServer'
import prefixer from '../../modules/plugins/prefixer'
import fallbackValue from '../../modules/plugins/fallbackValue'
import beautifier from '../../modules/middleware/beautifier'
import logger from '../../modules/middleware/logger'
import applyMiddleware from '../../modules/helpers/applyMiddleware'

const app = express()

app.get('/', (req, res) => {
  const plugins = [ prefixer(), fallbackValue() ]
  const renderer = new Renderer({ plugins: plugins })

  const middleware = [ beautifier(), logger({ beautify: false }) ]
  const enhancedRenderer = applyMiddleware(renderer, middleware)

  const indexHTML = fs.readFileSync(__dirname + '/index.html').toString()
  const appHtml = renderToString(
    <App renderer={enhancedRenderer} />
  )
  const appCSS = enhancedRenderer.renderToString()

  res.write(indexHTML.replace('<!-- {{app}} -->', appHtml).replace('<!-- {{css}} -->', appCSS))
  res.end()
})

app.listen(8000, 'localhost', () => {
  console.log('Access the universal app at http://%s:%d', 'localhost', 8000)
})
