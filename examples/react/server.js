import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import { renderToString } from 'react-dom/server'
import fs from 'fs'

import App from './app.js'
import { enhance, createRenderer } from '../../modules'
import prefixer from '../../modules/plugins/prefixer'
import fallbackValue from '../../modules/plugins/fallbackValue'
import beautifier from '../../modules/enhancers/beautifier'

const app = express()

app.get('/', (req, res) => {
  const plugins = [ prefixer(), fallbackValue() ]

  const createEnhancedRenderer = enhance(
    beautifier()
  )(createRenderer)

  const renderer = createEnhancedRenderer({ plugins: plugins })

  renderer.renderStatic({
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0
  }, 'html, body,#app')

  renderer.renderStatic({ display: 'flex' }, 'div')
  const indexHTML = fs.readFileSync(__dirname + '/index.html').toString()
  const appHtml = renderToString(
    <App renderer={renderer} />
  )
  const appCSS = renderer.renderToString()

  res.write(indexHTML.replace('<!-- {{app}} -->', appHtml).replace('<!-- {{css}} -->', appCSS))
  res.end()
})

app.listen(8000, 'localhost', () => {
  console.log('Access the universal app at http://%s:%d', 'localhost', 8000)
})
