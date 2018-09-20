import 'raf/polyfill'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FelaThemeFactory from '../FelaThemeFactory'
import { THEME_CHANNEL } from '../themeChannel'

import createSnapshot from '../__helpers__/createSnapshot'

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
