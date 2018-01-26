import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import FelaThemeFactory from '../FelaThemeFactory'
import createTheme from '../createTheme'
import { THEME_CHANNEL } from '../themeChannel'

const FelaTheme = FelaThemeFactory(Component, {
  [THEME_CHANNEL]: PropTypes.object,
})

describe('Using the FelaTheme component', () => {
  it('correctly pass the theme down', () => {
    const themeContext = createTheme({
      color: 'red',
    })

    const wrapper = mount(
      <FelaTheme render={theme => <div>The color is {theme.color}.</div>} />,
      {
        context: {
          [THEME_CHANNEL]: themeContext,
        },
      }
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
