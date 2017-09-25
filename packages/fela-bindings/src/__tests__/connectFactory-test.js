import React, { createElement, Component } from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { html as beautify } from 'js-beautify'

import { renderToString } from 'fela-tools'
import { createRenderer } from 'fela'

import connectFactory from '../connectFactory'
import withThemeFactory from '../withThemeFactory'

const withTheme = withThemeFactory(Component, createElement, {
  theme: PropTypes.object
})

const connect = connectFactory(Component, createElement, withTheme, {
  renderer: PropTypes.object
})

describe('Connect Factory for bindings', () => {
  it('should process rules and create classNames', () => {
    const rules = {
      rule1: () => ({
        padding: 1
      }),
      rule2: props => ({
        color: props.color
      })
    }

    const MyComponent = connect(rules)(({ styles }) => (
      <div>
        <span className={styles.rule1} />
        <span className={styles.rule2} />
      </div>
    ))

    MyComponent.defaultProps = {
      color: 'red'
    }

    const renderer = createRenderer()
    const wrapper = mount(<MyComponent />, {
      context: {
        renderer
      }
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper)
    ]).toMatchSnapshot()
  })

  it('should not pass through "theme" prop when used without "ThemeProvider"', () => {
    const rules = {
      rule1: () => ({
        padding: 1
      }),
      rule2: props => ({
        color: props.color
      })
    }

    const MyComponentDefaultProps = {
      color: 'red'
    }

    const MyComponent = connect(rules)(({ styles, ...props }) => (
      <div {...props}>
        <span className={styles.rule1} />
        <span className={styles.rule2} />
      </div>
    ))

    MyComponent.defaultProps = MyComponentDefaultProps

    const renderer = createRenderer()
    const wrapper = mount(<MyComponent />, {
      context: {
        renderer
      }
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper)
    ]).toMatchSnapshot()
  })
})
