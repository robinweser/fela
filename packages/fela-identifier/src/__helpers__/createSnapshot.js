import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { css } from 'js-beautify'

import RendererProviderFactory from '../../../fela-bindings/src/RendererProviderFactory'
import ThemeProviderFactory from '../../../fela-bindings/src/ThemeProviderFactory'
import { THEME_CHANNEL } from '../../../fela-bindings/src/themeChannel'

import renderToString from '../../../fela-tools/src/renderToString'
import createRenderer from '../../../fela/src/createRenderer'

const RendererProvider = RendererProviderFactory(
  Component,
  children => children,
  {
    childContextTypes: { renderer: PropTypes.object },
  }
)

const BaseThemeProvider = ThemeProviderFactory(
  Component,
  children => children,
  {
    propTypes: {
      theme: PropTypes.object.isRequired,
      overwrite: PropTypes.bool,
    },
    childContextTypes: {
      [THEME_CHANNEL]: PropTypes.object,
    },
    contextTypes: {
      [THEME_CHANNEL]: PropTypes.object,
    },
    defaultProps: {
      overwrite: false,
    },
  }
)

export default function createSnapshot(
  component,
  theme = {},
  renderer = createRenderer(),
  Provider = RendererProvider,
  ThemeProvider = BaseThemeProvider
) {
  const div = document.createElement('div')

  render(
    <Provider renderer={renderer}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </Provider>,
    div
  )

  return {
    html: div.innerHTML,
    css: css(renderToString(renderer)),
  }
}
