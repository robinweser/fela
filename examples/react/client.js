import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-fela'
import { createRenderer } from 'fela'
import prefixer from 'fela-plugin-prefixer'
import fallbackValue from 'fela-plugin-fallback-value'
import unit from 'fela-plugin-unit'

import App from './app'

const plugins = [ prefixer(), fallbackValue(), unit() ]
const renderer = createRenderer({ plugins: plugins })

renderer.renderStatic({
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0
}, 'html,body,#app')

renderer.renderStatic({ display: 'flex' }, 'div')

const mountNode = document.getElementById('stylesheet')
mountNode.textContent = ''

render(
  <Provider renderer={renderer} mountNode={mountNode}>
    <App />
  </Provider>,
  document.getElementById('app')
)
