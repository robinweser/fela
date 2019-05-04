import 'raf/polyfill'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { createSnapshot } from 'jest-react-fela'
import { ThemeProvider, FelaTheme } from 'react-fela'

describe('Using the ThemeProvider', () => {
  it('should pass the theme to rule props', () => {
    const snapshot = createSnapshot(
      <ThemeProvider theme={{ color: 'red' }}>
        <FelaTheme>{theme => <div>{JSON.stringify(theme)}</div>}</FelaTheme>
      </ThemeProvider>
    )

    expect(snapshot).toMatchSnapshot()
  })

  it('should merge theme objects', () => {
    const snapshot = createSnapshot(
      <ThemeProvider theme={{ color: 'red' }}>
        <ThemeProvider theme={{ backgroundColor: 'blue' }}>
          <FelaTheme>{theme => <div>{JSON.stringify(theme)}</div>}</FelaTheme>
        </ThemeProvider>
      </ThemeProvider>
    )

    expect(snapshot).toMatchSnapshot()
  })

  it('should overwrite theme objects', () => {
    const snapshot = createSnapshot(
      <ThemeProvider theme={{ color: 'red' }}>
        <ThemeProvider overwrite theme={{ backgroundColor: 'blue' }}>
          <FelaTheme>{theme => <div>{JSON.stringify(theme)}</div>}</FelaTheme>
        </ThemeProvider>
      </ThemeProvider>
    )

    expect(snapshot).toMatchSnapshot()
  })
})
