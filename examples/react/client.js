import React from 'react'
import { render } from 'react-dom'
import Fela, { createRenderer, enhance } from '../../modules'
import prefixer from '../../modules/plugins/prefixer'
import fallbackValue from '../../modules/plugins/fallbackValue'
import beautifier from '../../modules/enhancers/beautifier'
import logger from '../../modules/enhancers/logger'
import perf from '../../modules/enhancers/perf'

import App from './app'

const createEnhancedRenderer = enhance(
  beautifier(),
  logger(),
  perf()
)(createRenderer)

const enhancedRenderer = createEnhancedRenderer({
  keyframePrefixes: [],
  plugins: [ prefixer(), fallbackValue() ]
})

enhancedRenderer.renderStatic({
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0
}, 'html, body,#app')

enhancedRenderer.renderStatic({ display: 'flex' }, 'div')

Fela.render(enhancedRenderer, document.getElementById('stylesheet'))
render(<App renderer={enhancedRenderer} />, document.getElementById('app'))
