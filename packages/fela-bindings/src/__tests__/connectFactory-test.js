import React, { createElement, Component } from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { html as beautify } from 'js-beautify'

import { renderToString } from 'fela-tools'
import { createRenderer } from 'fela'

import connectFactory from '../connectFactory'
import withThemeFactory from '../withThemeFactory'
import createTheme from '../createTheme'
import { THEME_CHANNEL } from '../themeChannel'

const withTheme = withThemeFactory(Component, createElement, {
  [THEME_CHANNEL]: PropTypes.object,
})

const connect = connectFactory(Component, createElement, withTheme, {
  renderer: PropTypes.object,
})

describe('Connect Factory for bindings', () => {
  it('should process rules and create classNames', () => {
    const rules = {
      rule1: () => ({
        padding: 1,
      }),
      rule2: props => ({
        color: props.color,
      }),
    }

    const MyComponent = connect(rules)(({ styles }) => (
      <div>
        <span className={styles.rule1} />
        <span className={styles.rule2} />
      </div>
    ))

    MyComponent.defaultProps = {
      color: 'red',
    }

    const renderer = createRenderer()
    const wrapper = mount(<MyComponent />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should not pass through "theme" prop when used without "ThemeProvider"', () => {
    const rules = {
      rule1: () => ({
        padding: 1,
      }),
      rule2: props => ({
        color: props.color,
      }),
    }

    const MyComponentDefaultProps = {
      color: 'red',
    }

    const MyComponent = connect(
      rules
    )(({ styles, rules: injectedRules, ...props }) => (
      <div {...props}>
        <span className={styles.rule1} />
        <span className={styles.rule2} />
      </div>
    ))

    MyComponent.defaultProps = MyComponentDefaultProps

    const renderer = createRenderer()
    const wrapper = mount(<MyComponent />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should process rules and create classNames with rules as function', () => {
    const rules = jest.fn(props => ({
      rule1: {
        padding: 1,
      },
      rule2: {
        color: props.color,
      },
    }))

    const MyComponent = connect(rules)(({ styles }) => (
      <div>
        <span className={styles.rule1} />
        <span className={styles.rule2} />
      </div>
    ))

    MyComponent.defaultProps = {
      color: 'red',
    }

    const renderer = createRenderer()
    const wrapper = mount(<MyComponent />, {
      context: {
        renderer,
      },
    })

    expect(rules).toHaveBeenCalledWith(
      {
        color: 'red',
        theme: {},
      },
      renderer
    )
    expect(rules).toHaveBeenCalledTimes(1)
    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should extend the rule properties', () => {
    const rules = props => ({
      rule1: {
        padding: 1,
      },
      rule2: {
        color: props.color,
      },
    })

    const MyComponent = connect(rules)(({ styles }) => (
      <div>
        <span className={styles.rule1} />
        <span className={styles.rule2} />
      </div>
    ))

    MyComponent.defaultProps = {
      color: 'red',
    }

    const renderer = createRenderer()
    const extend = {
      rule1: {
        padding: 2,
      },
      rule2: {
        fontSize: 16,
      },
    }

    const wrapper = mount(<MyComponent extend={extend} />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should compose styles', () => {
    const rules = props => ({
      rule1: {
        padding: 1,
      },
      rule2: {
        color: props.color,
      },
    })

    const anotherRules = {
      rule1: () => ({
        padding: 2,
      }),
      rule2: () => ({
        fontSize: 16,
      }),
    }

    const MyComponent = connect(anotherRules)(
      connect(rules)(({ styles }) => (
        <div>
          <span className={styles.rule1} />
          <span className={styles.rule2} />
        </div>
      ))
    )

    MyComponent.defaultProps = {
      color: 'red',
    }

    const renderer = createRenderer()
    const wrapper = mount(<MyComponent />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should component receive rules prop with all combined rules', () => {
    const rules = props => ({
      rule1: {
        padding: 1,
      },
      rule2: {
        color: props.color,
      },
    })

    const anotherRules = {
      rule1: () => ({
        padding: 2,
      }),
      rule2: () => ({
        fontSize: 16,
      }),
    }

    const MyComponent = connect(rules)(({ styles }) => (
      <div>
        <span className={styles.rule1} />
        <span className={styles.rule2} />
      </div>
    ))

    const ProxyWrapper = connect(anotherRules)(({ rules: injectedRules }) => (
      <div>
        <MyComponent color="red" extend={injectedRules} />
      </div>
    ))

    const renderer = createRenderer()
    const wrapper = mount(<ProxyWrapper />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should provide rules prop for connected component which is an object with rules in the values of fields', () => {
    const myTheme = {
      padding: 1,
    }

    const rules = props => ({
      rule1: ({ theme }) => ({
        padding: theme.padding,
      }),
      rule2: {
        color: props.color,
      },
    })

    expect.assertions(5)
    const MyComponent = connect(rules)(({ rules: injectedRules }) => {
      expect(injectedRules.rule1).toBeInstanceOf(Function)
      expect(injectedRules.rule2).toBeInstanceOf(Function)

      expect(injectedRules.rule1()).toEqual({ padding: 1 })
      expect(injectedRules.rule1({ theme: { padding: 2 } })).toEqual({
        padding: 2,
      })

      expect(injectedRules.rule2()).toEqual({ color: 'red' })

      return null
    })

    const renderer = createRenderer()
    mount(<MyComponent color="red" />, {
      context: {
        renderer,
        [THEME_CHANNEL]: createTheme(myTheme),
      },
    })
  })

  it('should implement pure component wrapper', () => {
    const renderMock = jest.fn(() => null)

    const MyComponent = connect({})(renderMock)

    const wrapper = mount(<MyComponent />, {
      context: {
        renderer: createRenderer(),
      },
    })

    wrapper.update()
    wrapper.update()

    expect(renderMock).toHaveBeenCalledTimes(1)
  })

  it('should accept the parameter disabling pure component behavior', () => {
    const renderMock = jest.fn(() => null)

    const MyComponent = connect({}, { pure: false })(renderMock)

    const wrapper = mount(<MyComponent />, {
      context: {
        renderer: createRenderer(),
      },
    })

    wrapper.update()
    wrapper.update()

    expect(renderMock).toHaveBeenCalledTimes(3)
  })
})
