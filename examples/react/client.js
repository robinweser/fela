import React from 'react'
import { render } from 'react-dom'
import { Renderer } from '../../modules/fela'
import prefixer from '../../modules/plugins/prefixer'
import fallbackValue from '../../modules/plugins/fallbackValue'
import beautifier from '../../modules/middleware/beautifier'
import logger from '../../modules/middleware/logger'
import applyMiddleware from '../../modules/helper/applyMiddleware'

import App from './app'

const renderer = new Renderer(document.getElementById('stylesheet'), {
  keyframePrefixes: [],
  plugins: [ prefixer(), fallbackValue() ]
})

const enhancedRenderer = applyMiddleware(renderer, [
  beautifier(), logger({ beautify: true })
])

render(<App renderer={enhancedRenderer} />, document.getElementById('app'))
