import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import { renderToString } from 'react-dom/server'
import fs from 'fs'

import App from './app.js'
import { Renderer } from '../../modules/felaServer'
import prefixer from '../../modules/plugins/prefixer'
import fallbackValue from '../../modules/plugins/fallbackValue'
import beautifier from '../../modules/devtools/beautifier'
import logger from '../../modules/devtools/logger'
import applyDevTools from '../../modules/helper/applyDevTools'

const indexHTML = fs.readFileSync(__dirname + '/index.html').toString()
const app = express()
const host = 'localhost'
const port = 8000

app.get('/', (req, res) => {
  const renderer = new Renderer({
    keyframePrefixes: [],
    plugins: [ prefixer(), fallbackValue() ]
  })

  const enhancedRenderer = applyDevTools(renderer, [
    beautifier(), logger({ beautify: false })
  ])

  const appHtml = renderToString(
    <App renderer={enhancedRenderer} />
  )

  const appCSS = enhancedRenderer.renderToString()

  res.write(indexHTML.replace('<!-- {{app}} -->', appHtml).replace('<!-- {{css}} -->', appCSS))
  res.end()
})

app.listen(port, host, () => {
  console.log('Access the universal app at http://%s:%d', host, port)
})
