import React from 'react'
import { render } from 'react-dom'
import { Renderer } from '../../modules/fela'
import prefixer from '../../modules/plugins/prefixer'
import fallbackValue from '../../modules/plugins/fallbackValue'
import beautifier from '../../modules/middleware/beautifier'
import logger from '../../modules/middleware/logger'
import perf from '../../modules/middleware/perf'
import applyMiddleware from '../../modules/helpers/applyMiddleware'

import App from './app'

const renderer = new Renderer(document.getElementById('stylesheet'), {
  keyframePrefixes: [],
  plugins: [ prefixer(), fallbackValue() ]
})

const enhancedRenderer = applyMiddleware([ beautifier(), logger(), perf() ])(renderer)

enhancedRenderer.render({
  'html,body,#app': {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0
  },
  div: {
    display: 'flex'
  }
})

render(<App renderer={enhancedRenderer} />, document.getElementById('app'))
