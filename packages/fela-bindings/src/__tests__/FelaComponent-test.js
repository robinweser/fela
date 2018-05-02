import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { css } from 'js-beautify'

import { renderToString } from 'fela-tools'
import { createRenderer } from 'fela'

import FelaThemeFactory from '../FelaThemeFactory'
import FelaComponentFactory from '../FelaComponentFactory'
import createTheme from '../createTheme'
import { THEME_CHANNEL } from '../themeChannel'

const FelaTheme = FelaThemeFactory(Component, {
  [THEME_CHANNEL]: PropTypes.object,
})

const FelaComponent = FelaComponentFactory(createElement, FelaTheme, {
  [THEME_CHANNEL]: PropTypes.object,
  renderer: PropTypes.object,
})

describe('Using the FelaComponent component', () => {
  it('correctly render a fela rule', () => {
    const renderer = createRenderer()

    const wrapper = mount(
      <FelaComponent
        style={{
          fontSize: '12px',
          color: 'red',
        }}
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

  it('correctly concat "customClass" with className', () => {
    const renderer = createRenderer()

    const wrapper = mount(
      <FelaComponent
        customClass="custom-class"
        style={{
          color: 'red',
        }}
        render={({ className }) => (
          <div className={className}>I am red and have a custom class.</div>
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

  it('correctly pass the theme to the "style" prop', () => {
    const themeContext = createTheme({
      fontSize: '15px',
    })

    const renderer = createRenderer()

    const wrapper = mount(
      <FelaComponent
        style={theme => ({
          fontSize: theme.fontSize,
          color: 'red',
        })}
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

  it('correctly pass the theme and other props to the "rule" prop', () => {
    const themeContext = createTheme({
      fontSize: '15px',
    })

    const renderer = createRenderer()

    const wrapper = mount(
      <FelaComponent
        bgc="blue"
        rule={({ theme, bgc }) => ({
          fontSize: theme.fontSize,
          backgroundColor: bgc || 'red',
        })}
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

  it('should default to a div', () => {
    const renderer = createRenderer()

    const wrapper = mount(
      <FelaComponent
        style={{
          fontSize: '12px',
          color: 'red',
        }}
      />,
      {
        context: {
          renderer,
        },
      }
    )

    expect([css(renderToString(renderer)), toJson(wrapper)]).toMatchSnapshot()
  })

  it('should render children in default mode', () => {
    const renderer = createRenderer()

    const wrapper = mount(
      <FelaComponent
        style={{
          fontSize: '12px',
          color: 'red',
        }}>
        <span>Hello World</span>
      </FelaComponent>,
      {
        context: {
          renderer,
        },
      }
    )

    expect([css(renderToString(renderer)), toJson(wrapper)]).toMatchSnapshot()
  })

  it('should accept a string primitive as render target', () => {
    const renderer = createRenderer()

    const wrapper = mount(
      <FelaComponent
        style={{
          fontSize: '12px',
          color: 'red',
        }}
        render="span"
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
