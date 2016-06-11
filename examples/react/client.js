import React from 'react'
import { render } from 'react-dom'
import { createRenderer } from '../../modules'
import prefixer from '../../modules/plugins/prefixer'
import fallbackValue from '../../modules/plugins/fallbackValue'
import beautifier from '../../modules/enhancers/beautifier'
import logger from '../../modules/enhancers/logger'
import perf from '../../modules/enhancers/perf'
import enhance from '../../modules/enhance'

import App from './app'

const renderer = createRenderer(document.getElementById('stylesheet'), {
  keyframePrefixes: [],
  plugins: [ prefixer(), fallbackValue() ]
})

const enhancedRenderer = enhance(beautifier(), logger(), perf())(renderer)

enhancedRenderer.renderStatic({
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0
}, 'html, body,#app')

enhancedRenderer.renderStatic({ display: 'flex' }, 'div')


render(<App renderer={enhancedRenderer} />, document.getElementById('app'))
