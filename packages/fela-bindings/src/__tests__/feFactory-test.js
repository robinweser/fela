import React, { createElement, Component } from 'react'
import PropTypes from 'prop-types'

import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { css } from 'js-beautify'

import { createRenderer } from 'fela'
import { renderToString } from 'fela-tools'

import FelaThemeFactory from '../FelaThemeFactory'
import FelaComponentFactory from '../FelaComponentFactory'
import RendererProviderFactory from '../RendererProviderFactory'
import { THEME_CHANNEL } from '../themeChannel'

import feFactory from '../feFactory'

const FelaTheme = FelaThemeFactory(Component, {
  [THEME_CHANNEL]: PropTypes.object,
})

const FelaComponent = FelaComponentFactory(createElement, FelaTheme, {
  [THEME_CHANNEL]: PropTypes.object,
  renderer: PropTypes.object,
})

const RendererProvider = RendererProviderFactory(
  Component,
  children => children,
  {
    childContextTypes: { renderer: PropTypes.object },
  }
)

const fe = feFactory(createElement, FelaComponent)

describe('Using fe', () => {
  it('should render inline style as CSS', () => {
    const renderer = createRenderer()

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

    const wrapper = mount(
      <RendererProvider renderer={renderer}>
        <Comp />
      </RendererProvider>
    )

    expect([css(renderToString(renderer)), toJson(wrapper)]).toMatchSnapshot()
  })

  it('should merge class names', () => {
    const renderer = createRenderer()

    const Comp = () =>
      fe(
        'div',
        {
          className: 'foo-bar baz',
          css: {
            color: 'red',
            ':hover': {
              color: 'blue',
            },
          },
        },
        'Hello'
      )

    const wrapper = mount(
      <RendererProvider renderer={renderer}>
        <Comp />
      </RendererProvider>
    )

    expect([css(renderToString(renderer)), toJson(wrapper)]).toMatchSnapshot()
  })
})
