import 'raf/polyfill'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { createSnapshot } from 'jest-react-fela'

import FelaThemeFactory from '../FelaThemeFactory'
import { THEME_CHANNEL } from '../themeChannel'

const FelaTheme = FelaThemeFactory(Component, {
  [THEME_CHANNEL]: PropTypes.object,
})

describe('Using the FelaTheme component', () => {
  it('correctly pass the theme down', () => {
    expect(
      createSnapshot(
        <FelaTheme>
          {theme => <div>The color is {theme.color}.</div>}
        </FelaTheme>,
        { color: 'red' }
      )
    ).toMatchSnapshot()
  })
})
