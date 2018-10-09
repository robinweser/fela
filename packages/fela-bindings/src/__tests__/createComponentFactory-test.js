import React, { createElement, Component as BaseComponent } from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { html as beautify } from 'js-beautify'

import { renderToString } from 'fela-tools'
import { createRenderer } from 'fela'
import monolithic from 'fela-monolithic'

import createComponentFactory from '../createComponentFactory'
import withThemeFactory from '../withThemeFactory'
import createTheme from '../createTheme'
import { THEME_CHANNEL } from '../themeChannel'

const withTheme = withThemeFactory(BaseComponent, createElement, {
  [THEME_CHANNEL]: PropTypes.object,
})

const createComponent = createComponentFactory(createElement, withTheme, {
  renderer: PropTypes.object,
})

const createComponentWithExtraPassThrough = createComponentFactory(
  createElement,
  withTheme,
  { renderer: PropTypes.object },
  false,
  ['testProp']
)

const createComponentWithProxy = createComponentFactory(
  createElement,
  withTheme,
  {
    renderer: PropTypes.object,
  },
  true
)

describe('Creating Components from Fela rules', () => {
  it('should return a Component', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16,
    })

    const component = createComponent(rule)

    expect(component).toBeInstanceOf(Function)
  })

  it('should render fela rules depending on the passed props', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16,
    })

    const renderer = createRenderer()
    const Component = createComponent(rule)

    const wrapper = mount(<Component color="black" />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should include defaultProps if provided', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16,
    })

    const Comp = ({ color, className }) => (
      <div className={className}>{color}</div>
    )

    Comp.defaultProps = {
      color: 'red',
    }

    const Component = createComponent(rule, Comp)
    const renderer = createRenderer()

    const wrapper = mount(<Component />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should use the theme for static rendering by default', () => {
    const rule = props => ({
      color: props.theme.color,
      fontSize: 16,
    })

    const Component = createComponent(rule)
    const renderer = createRenderer()
    const theme = createTheme({
      color: 'red',
    })

    const wrapper = mount(<Component />, {
      context: {
        renderer,
        [THEME_CHANNEL]: theme,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should allow nested theme objects', () => {
    const rule = props => ({
      color: props.theme.header.color,
      fontSize: 16,
    })

    const Component = createComponent(rule)
    const renderer = createRenderer()
    const theme = createTheme({
      header: {
        color: 'black',
      },
    })

    const wrapper = mount(<Component />, {
      context: {
        renderer,
        [THEME_CHANNEL]: theme,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should not pass props to the element', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16,
    })

    const Component = createComponent(rule, 'div', ['onClick'])
    const renderer = createRenderer()

    const wrapper = mount(<Component onClick={false} onHover color />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should pass all props to the element', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16,
    })

    const Component = createComponent(rule, 'div', Object.keys)
    const renderer = createRenderer()

    const wrapper = mount(<Component onClick={false} data-foo />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should pass special props to the component', () => {
    const rule = props => ({
      color: props.as === 'i' ? props.color : 'red',
      fontSize: 16,
    })

    const Component = createComponent(rule)
    const renderer = createRenderer()

    const wrapper = mount(<Component color="blue" as="i" />, {
      context: {
        renderer,
      },
    })

    const wrapper2 = mount(<Component color="blue" />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
      toJson(wrapper2),
    ]).toMatchSnapshot()
  })

  it('should pass extended special props to the component', () => {
    const rule = props => ({
      color: props.as === 'i' ? props.color : 'red',
      fontSize: 16,
    })

    const UnderlyingComp = ({ testProp }) => (
      <div>{testProp ? 'testProp exists' : 'testProp does not exist'}</div>
    )
    const Component = createComponentWithExtraPassThrough(rule, UnderlyingComp)

    const renderer = createRenderer()

    const wrapper = mount(
      <Component color="blue" testProp={{ tabIndex: '-1' }} />,
      {
        context: {
          renderer,
        },
      }
    )

    const wrapper2 = mount(<Component color="blue" />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
      toJson(wrapper2),
    ]).toMatchSnapshot()
  })

  it('should only use passed props to render Fela rules', () => {
    const rule = props => ({
      color: props['data-foo'] && props.color,
      fontSize: '16px',
    })

    const Component = createComponent(rule, 'div', ['data-foo'])
    const renderer = createRenderer()

    const wrapper = mount(<Component data-foo color="black" />, {
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
    const rule = () => ({
      color: 'blue',
      fontSize: '16px',
    })

    const anotherRule = () => ({
      color: 'red',
      lineHeight: 1.2,
    })

    const Comp = createComponent(rule)
    const ComposedComp = createComponent(anotherRule, Comp)
    const renderer = createRenderer()

    const wrapper = mount(<ComposedComp />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should pass style, as, id, className and innerRef to composed components', () => {
    const rule = () => ({
      color: 'blue',
      fontSize: '16px',
    })

    const anotherRule = props => ({
      color: props.color,
      lineHeight: 1.2,
    })

    const Comp = createComponent(rule)
    const ComposedComp = createComponent(anotherRule, Comp)

    ComposedComp.defaultProps = {
      color: 'green',
    }

    const renderer = createRenderer()

    const wrapper = mount(<ComposedComp as="i" />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should extend the rule properties with an object', () => {
    const rule = () => ({
      color: 'blue',
      fontSize: '16px',
    })

    const Comp = createComponent(rule)
    const renderer = createRenderer()

    const bgColor = 'red'

    const wrapper = mount(
      <Comp
        extend={{
          fontSize: '14px',
          backgroundColor: bgColor,
        }}
      />,
      {
        context: {
          renderer,
        },
      }
    )

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should extend the rule properties with a function', () => {
    const rule = () => ({
      color: 'blue',
      fontSize: '16px',
    })

    const Comp = createComponent(rule)
    const renderer = createRenderer()

    const extendRule = props => ({
      fontSize: '14px',
      backgroundColor: props.bgColor,
    })

    const wrapper = mount(<Comp extend={extendRule} bgColor="red" />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should compose passThrough props', () => {
    const Component = createComponent(() => ({}), 'div', Object.keys)
    const ComposedComponent = createComponent(() => ({}), Component, [
      'onClick',
    ])

    const renderer = createRenderer()

    const wrapper = mount(
      <ComposedComponent onClick={() => true} color="red" />,
      {
        context: {
          renderer,
        },
      }
    )

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should only use the rule name as displayName', () => {
    const Button = () => ({
      color: 'red',
      fontSize: 16,
    })
    const component = createComponent(Button)

    expect(component.displayName).toEqual('Button')
  })

  it('should use a dev-friendly className with monolithic renderer', () => {
    const Button = () => ({
      fontSize: 16,
    })

    const Component = createComponent(Button)

    const renderer = createRenderer({
      enhancers: [
        monolithic({
          prettySelectors: true,
        }),
      ],
    })

    const wrapper = mount(<Component />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should use a dev-friendly className and the selectorPrefix', () => {
    const Button = () => ({
      fontSize: 16,
    })

    const Component = createComponent(Button)

    const renderer = createRenderer({
      enhancers: [
        monolithic({
          prettySelectors: true,
        }),
      ],
      selectorPrefix: 'Fela-',
    })

    const wrapper = mount(<Component />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should only use the rule name as displayName', () => {
    const Button = () => ({
      color: 'red',
      fontSize: 16,
    })
    const Component = createComponent(Button)
    const renderer = createRenderer()

    const wrapper = mount(<Component as="button" />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })
})

describe('Creating Components with a Proxy for props from Fela rules', () => {
  it('should not leak passed through props', () => {
    const BorderlessButton = createComponentWithProxy(
      ({ color }) => ({
        border: 'none',
        backgroundColor: color,
      }),
      'button'
    )

    const ColoredButton = createComponent(
      ({ color }) => ({
        color,
      }),
      BorderlessButton
    )

    const renderer = createRenderer()

    const wrapper = mount(<ColoredButton color="red" />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should not leak unused through props', () => {
    const BorderlessButton = createComponentWithProxy(
      () => ({
        border: 'none',
      }),
      'button'
    )

    const ColoredButton = createComponent(
      ({ color }) => ({
        color,
      }),
      BorderlessButton
    )

    const renderer = createRenderer()

    const wrapper = mount(<ColoredButton color="red" />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should return a Component', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16,
    })
    const component = createComponentWithProxy(rule)

    expect(component).toBeInstanceOf(Function)
  })

  it('should render fela rules depending on the passed props', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16,
    })

    const Component = createComponentWithProxy(rule)

    const renderer = createRenderer()

    const wrapper = mount(<Component color="black" />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should use the theme for static rendering by default', () => {
    const rule = props => ({
      color: props.theme.color,
      fontSize: 16,
    })
    const Component = createComponentWithProxy(rule)
    const renderer = createRenderer()
    const theme = createTheme({
      color: 'black',
    })

    const wrapper = mount(<Component />, {
      context: {
        renderer,
        [THEME_CHANNEL]: theme,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should allow nested theme objects', () => {
    const rule = props => ({
      color: props.theme.header.color,
      fontSize: 16,
    })
    const Component = createComponentWithProxy(rule)
    const renderer = createRenderer()
    const theme = createTheme({
      header: {
        color: 'black',
      },
    })

    const wrapper = mount(<Component />, {
      context: {
        renderer,
        [THEME_CHANNEL]: theme,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should not pass props used in rules to the element', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16,
    })
    const Component = createComponentWithProxy(rule, 'div')

    const renderer = createRenderer()

    const wrapper = mount(<Component onClick={false} data-foo color />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should pass props used in rules specified in passThroughProps to the element', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16,
    })
    const Component = createComponentWithProxy(rule, 'div', ['color'])

    const renderer = createRenderer()

    const wrapper = mount(<Component onClick={false} data-foo color />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should pass all props to the element', () => {
    const rule = props => ({
      color: props.color,
      fontSize: 16,
    })

    const Component = createComponentWithProxy(rule, 'div', Object.keys)

    const renderer = createRenderer()

    const wrapper = mount(<Component onClick={false} data-foo />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should only use passed props to render Fela rules', () => {
    const rule = props => ({
      color: props['data-foo'] && props.color,
      fontSize: '16px',
    })

    const Component = createComponentWithProxy(rule, 'div', ['data-foo'])
    const renderer = createRenderer()

    const wrapper = mount(<Component data-foo color="black" />, {
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
    const rule = () => ({
      color: 'blue',
      fontSize: '16px',
    })

    const anotherRule = () => ({
      color: 'red',
      lineHeight: 1.2,
    })

    const Comp = createComponentWithProxy(rule)
    const ComposedComp = createComponentWithProxy(anotherRule, Comp)

    const renderer = createRenderer()

    const wrapper = mount(<ComposedComp />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should compose passThrough props', () => {
    const Comp = createComponentWithProxy(() => ({}), 'div', Object.keys)
    const ComposedComp = createComponentWithProxy(() => ({}), Comp, ['onClick'])

    const renderer = createRenderer()

    const onClick = () => true
    const wrapper = mount(<ComposedComp onClick={onClick} color="red" />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should only use the rule name as displayName', () => {
    const Button = () => ({
      color: 'red',
      fontSize: 16,
    })
    const component = createComponentWithProxy(Button)

    expect(component.displayName).toEqual('Button')
  })

  it('should use a dev-friendly className with monolithic renderer', () => {
    const Button = () => ({
      fontSize: 16,
    })

    const Component = createComponentWithProxy(Button)

    const renderer = createRenderer({
      enhancers: [
        monolithic({
          prettySelectors: true,
        }),
      ],
    })

    const wrapper = mount(<Component />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should use a dev-friendly className and the selectorPrefix', () => {
    const Button = () => ({
      fontSize: 16,
    })

    const Component = createComponentWithProxy(Button)

    const renderer = createRenderer({
      enhancers: [
        monolithic({
          prettySelectors: true,
        }),
      ],
      selectorPrefix: 'Fela-',
    })

    const wrapper = mount(<Component />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should only use the rule name as displayName', () => {
    const Button = () => ({
      color: 'red',
      fontSize: 16,
    })
    const Component = createComponentWithProxy(Button)
    const renderer = createRenderer()

    const wrapper = mount(<Component as="button" />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should replace unallowed symbols in className with underscore', () => {
    const rule = () => ({
      fontSize: 16,
    })

    const Parent = () => React.createElement('div')
    Parent.displayName = 'connect(Component)'
    const Component = createComponent(rule, Parent)

    const renderer = createRenderer({
      enhancers: [
        monolithic({
          prettySelectors: true,
        }),
      ],
    })

    const wrapper = mount(<Component />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should replace rare unallowed symbols in className with underscore', () => {
    const rule = () => ({
      fontSize: 16,
    })

    const Parent = () => React.createElement('div')
    Parent.displayName = '1!@#$%^&*{}/=\\'
    const Component = createComponent(rule, Parent)

    const renderer = createRenderer({
      enhancers: [
        monolithic({
          prettySelectors: true,
        }),
      ],
    })

    const wrapper = mount(<Component />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })

  it('should pass props except innerRef', () => {
    const rule = props => ({
      color: props.color,
      fontSize: '16px',
    })
    const Component = createComponentWithProxy(rule, 'div')

    const renderer = createRenderer()

    const wrapper = mount(<Component color="black" innerRef={() => 'test'} />, {
      context: {
        renderer,
      },
    })

    expect([
      beautify(`<style>${renderToString(renderer)}</style>`),
      toJson(wrapper),
    ]).toMatchSnapshot()
  })
})
