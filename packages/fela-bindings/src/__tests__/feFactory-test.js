import 'raf/polyfill'
import React, { createElement, Component } from 'react'
import PropTypes from 'prop-types'

import FelaThemeFactory from '../FelaThemeFactory'
import FelaComponentFactory from '../FelaComponentFactory'
import { THEME_CHANNEL } from '../themeChannel'

import feFactory from '../feFactory'

import createSnapshot from '../__helpers__/createSnapshot'

const FelaTheme = FelaThemeFactory(Component, {
  [THEME_CHANNEL]: PropTypes.object,
})

const FelaComponent = FelaComponentFactory(createElement, FelaTheme, {
  [THEME_CHANNEL]: PropTypes.object,
  renderer: PropTypes.object,
})

const fe = feFactory(createElement, FelaComponent)

describe('Using fe', () => {
  it('should render inline style as CSS', () => {
    const Comp = () =>
      fe(
        'div',
        {
          css: {
            color: 'red',
            ':hover': {
              color: 'blue',
            },
          },
        },
        'Hello'
      )

    expect(createSnapshot(<Comp />)).toMatchSnapshot()
  })

  it('should merge class names', () => {
    const Comp = () =>
      fe(
        'div',
        {
          className: 'Component-button Component',
          css: {
            color: 'red',
            ':hover': {
              color: 'blue',
            },
          },
        },
        'Hello'
      )

    expect(createSnapshot(<Comp />)).toMatchSnapshot()
  })
})
