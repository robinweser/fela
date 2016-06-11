import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import { renderToString } from 'react-dom/server'
import fs from 'fs'

import App from './app.js'
import { createRenderer } from '../../modules/server'
import prefixer from '../../modules/plugins/prefixer'
import fallbackValue from '../../modules/plugins/fallbackValue'
import beautifier from '../../modules/enhance/beautifier'
import logger from '../../modules/enhance/logger'
import enhance from '../../modules/enhance'

const app = express()

app.get('/', (req, res) => {
  const plugins = [ prefixer(), fallbackValue() ]
  const renderer = createRenderer({ plugins: plugins })

  const enhancers = [ beautifier(), logger({ beautify: false }) ]
  const enhancedRenderer = enhance(enhancers)(renderer)

  enhancedRenderer.renderStatic({
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0
  }, 'html, body,#app')

  enhancedRenderer.renderStatic({ display: 'flex' }, 'div')
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
