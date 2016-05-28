import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import { renderToString } from 'react-dom/server'
import fs from 'fs'

import App from './app.js'
import { Renderer } from '../../modules/felaServer'
import prefixer from '../../modules/plugins/prefixer'
import fallbackValue from '../../modules/plugins/fallbackValue'

const indexHTML = fs.readFileSync(__dirname + '/index.html').toString()
const app = express()
const host = 'localhost'
const port = 8000

app.get('/', (req, res) => {
  const renderer = new Renderer({
    plugins: [ prefixer(), fallbackValue() ]
  })

  const appHtml = renderToString(
    <App renderer={renderer} />
  )

  const appCSS = renderer.renderToString()

  res.write(indexHTML.replace('<!-- {{app}} -->', appHtml).replace('<!-- {{css}} -->', appCSS))
  res.end()
})

app.listen(port, host, () => {
  console.log('Access the universal app at http://%s:%d', host, port)
})
