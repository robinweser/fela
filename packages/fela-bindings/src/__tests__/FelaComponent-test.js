import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { html, css } from 'js-beautify'

import { renderToString } from 'fela-tools'
import { createRenderer } from 'fela'

import FelaThemeFactory from '../FelaThemeFactory'
import FelaComponentFactory from '../FelaComponentFactory'
import createTheme from '../createTheme'
import { THEME_CHANNEL } from '../themeChannel'

const FelaTheme = FelaThemeFactory(Component, {
  [THEME_CHANNEL]: PropTypes.object,
})

const FelaComponent = FelaComponentFactory(
  Component,
  createElement,
  FelaTheme,
  {
    [THEME_CHANNEL]: PropTypes.object,
    renderer: PropTypes.object,
  }
)
describe('Using the FelaComponent component', () => {
  it('correctly render a fela rule', () => {
    const rule = ({ color }) => ({
      fontSize: '12px',
      color,
    })

    const renderer = createRenderer()

    const wrapper = mount(
      <FelaComponent
        rule={rule}
        color="red"
        render={({ className }) => (
          <div className={className}>I am red and written in 12px.</div>
        )}
      />,
      {
        context: {
          renderer,
        },
      }
    )

    expect([css(renderToString(renderer)), toJson(wrapper)]).toMatchSnapshot()
  })

  it('correctly pass the theme', () => {
    const rule = ({ color, theme }) => ({
      fontSize: theme.fontSize,
      color,
    })

    const themeContext = createTheme({
      fontSize: '15px',
    })

    const renderer = createRenderer()

    const wrapper = mount(
      <FelaComponent
        rule={rule}
        color="red"
        render={({ className, theme }) => (
          <div className={className}>
            I am red and written in {theme.fontSize}.
          </div>
        )}
      />,
      {
        context: {
          [THEME_CHANNEL]: themeContext,
          renderer,
        },
      }
    )

    expect([css(renderToString(renderer)), toJson(wrapper)]).toMatchSnapshot()
  })

  it('correctly combine extending rules', () => {
    const rule = ({ color }) => ({
      fontSize: '12px',
      color,
    })

    const extend = ({ fontSize }) => ({
      fontSize,
      backgroundColor: 'blue',
    })

    const renderer = createRenderer()

    const wrapper = mount(
      <FelaComponent
        rule={rule}
        extend={extend}
        color="red"
        fontSize="15px"
        render={({ className }) => (
          <div className={className}>I am red on blue and written in 15px.</div>
        )}
      />,
      {
        context: {
          renderer,
        },
      }
    )

    expect([css(renderToString(renderer)), toJson(wrapper)]).toMatchSnapshot()
  })
})
