import 'raf/polyfill'
import React, { createElement, Component, Children } from 'react'
import PropTypes from 'prop-types'

import ThemeProviderFactory from '../ThemeProviderFactory'
import FelaThemeFactory from '../FelaThemeFactory'
import { THEME_CHANNEL } from '../themeChannel'

import createSnapshot from '../__helpers__/createSnapshot'

const FelaTheme = FelaThemeFactory(Component, {
  [THEME_CHANNEL]: PropTypes.object,
})

const ThemeProvider = ThemeProviderFactory(Component, children => children, {
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
})

describe('Using the ThemeProvider', () => {
  it('should pass the theme to rule props', () => {
    const snapshot = createSnapshot(
      <ThemeProvider theme={{ color: 'red' }}>
        <FelaTheme>{theme => <div>{JSON.stringify(theme)}</div>}</FelaTheme>
      </ThemeProvider>
    )

    expect(snapshot).toMatchSnapshot()
  })
})
