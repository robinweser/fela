import 'raf/polyfill'
import React, { createElement, Component as BaseComponent } from 'react'
import PropTypes from 'prop-types'

import { createRenderer } from 'fela'
import { createSnapshot } from 'jest-react-fela'
import monolithic from 'fela-monolithic'

import createComponentFactory from '../createComponentFactory'
import withThemeFactory from '../withThemeFactory'
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
      fontSize: '16px',
    })

    const component = createComponent(rule)

    expect(component).toBeInstanceOf(Function)
  })

  it('should render fela rules depending on the passed props', () => {
    const rule = props => ({
      color: props.color,
      fontSize: '16px',
    })

    const Component = createComponent(rule)

    expect(createSnapshot(<Component color="black" />)).toMatchSnapshot()
  })

  it('should include defaultProps if provided', () => {
    const rule = props => ({
      color: props.color,
      fontSize: '16px',
    })

    const Comp = ({ color, className }) => (
      <div className={className}>{color}</div>
    )

    Comp.defaultProps = {
      color: 'red',
    }

    const Component = createComponent(rule, Comp)

    expect(createSnapshot(<Component />)).toMatchSnapshot()
  })

  it('should use the theme for static rendering by default', () => {
    const rule = props => ({
      color: props.theme.color,
      fontSize: '16px',
    })

    const Component = createComponent(rule)

    expect(createSnapshot(<Component />, { color: 'red' })).toMatchSnapshot()
  })

  it('should allow nested theme objects', () => {
    const rule = props => ({
      color: props.theme.header.color,
      fontSize: '16px',
    })

    const Component = createComponent(rule)

    expect(
      createSnapshot(<Component />, { header: { color: 'black' } })
    ).toMatchSnapshot()
  })

  it('should not pass props to the element', () => {
    const rule = props => ({
      color: props.color,
      fontSize: '16px',
    })

    const Component = createComponent(rule, 'div', ['onClick'])

    expect(
      createSnapshot(<Component data-foo="bar" data-bar="baz" />)
    ).toMatchSnapshot()
  })

  it('should pass all props to the element', () => {
    const rule = props => ({
      color: props.color,
      fontSize: '16px',
    })

    const Component = createComponent(rule, 'div', Object.keys)

    expect(
      createSnapshot(<Component data-foo="bar" data-bar="baz" />)
    ).toMatchSnapshot()
  })

  it('should pass special props to the component', () => {
    const rule = props => ({
      color: props.as === 'i' ? props.color : 'red',
      fontSize: '16px',
    })

    const Component = createComponent(rule)

    expect(createSnapshot(<Component />)).toMatchSnapshot()
    expect(createSnapshot(<Component as="i" />)).toMatchSnapshot()
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

    expect(
      createSnapshot(<Component color="blue" testProp={{ tabIndex: -1 }} />)
    ).toMatchSnapshot()
    expect(createSnapshot(<Component color="blue" />)).toMatchSnapshot()
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

    expect(createSnapshot(<ComposedComp />)).toMatchSnapshot()
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

    expect(createSnapshot(<ComposedComp as="i" />)).toMatchSnapshot()
  })

  it('should extend the rule properties with an object', () => {
    const rule = () => ({
      color: 'blue',
      fontSize: '16px',
    })

    const Comp = createComponent(rule)

    expect(
      createSnapshot(
        <Comp extend={{ fontSize: '14px', backgroundColor: 'red' }} />
      )
    ).toMatchSnapshot()
  })

  it('should extend the rule properties with a function', () => {
    const rule = () => ({
      color: 'blue',
      fontSize: '16px',
    })

    const Comp = createComponent(rule)

    const extendRule = props => ({
      fontSize: '14px',
      backgroundColor: props.bgColor,
    })

    expect(
      createSnapshot(<Comp extend={extendRule} bgColor="red" />)
    ).toMatchSnapshot()
  })

  it('should compose passThrough props', () => {
    const Component = createComponent(() => ({}), 'div', Object.keys)
    const ComposedComponent = createComponent(() => ({}), Component, [
      'data-foo',
    ])

    expect(
      createSnapshot(<ComposedComponent data-foo="bar" color="red" />)
    ).toMatchSnapshot()
  })

  it('should only use the rule name as displayName', () => {
    const Button = () => ({
      color: 'red',
      fontSize: '16px',
    })

    const component = createComponent(Button)

    expect(component.displayName).toEqual('Button')
  })

  it('should use a dev-friendly className with monolithic renderer', () => {
    const Button = () => ({
      fontSize: '16px',
    })

    const Component = createComponent(Button)

    expect(
      createSnapshot(
        <Component />,
        {},
        createRenderer({
          enhancers: [
            monolithic({
              prettySelectors: true,
            }),
          ],
        })
      )
    ).toMatchSnapshot()
  })

  it('should use a dev-friendly className and the selectorPrefix', () => {
    const Button = () => ({
      fontSize: '16px',
    })

    const Component = createComponent(Button)

    expect(
      createSnapshot(
        <Component />,
        {},
        createRenderer({
          selectorPrefix: 'fela-',
          enhancers: [
            monolithic({
              prettySelectors: true,
            }),
          ],
        })
      )
    ).toMatchSnapshot()
  })

  it('should only use the rule name as displayName', () => {
    const Button = () => ({
      color: 'red',
      fontSize: '16px',
    })
    const Component = createComponent(Button)

    expect(createSnapshot(<Component />)).toMatchSnapshot()
  })

  it('should replace unallowed symbols in className with underscore', () => {
    const rule = () => ({
      fontSize: '16px',
    })

    const Parent = () => <div>Hello World</div>
    Parent.displayName = 'connect(Component)'
    const Component = createComponent(rule, Parent)

    expect(
      createSnapshot(
        <Component />,
        {},
        createRenderer({
          enhancers: [
            monolithic({
              prettySelectors: true,
            }),
          ],
        })
      )
    ).toMatchSnapshot()
  })

  it('should replace rare unallowed symbols in className with underscore', () => {
    const rule = () => ({
      fontSize: '16px',
    })

    const Parent = () => <div>Hello World</div>
    Parent.displayName = '1!@#$%^&*{}/=\\'
    const Component = createComponent(rule, Parent)

    expect(
      createSnapshot(
        <Component />,
        {},
        createRenderer({
          enhancers: [
            monolithic({
              prettySelectors: true,
            }),
          ],
        })
      )
    ).toMatchSnapshot()
  })
})

describe('Creating Components with a Proxy for props from Fela rules', () => {
  it('should not pass props used in rules to the element', () => {
    const rule = props => ({
      color: props.color,
      fontSize: '16px',
    })
    const Component = createComponentWithProxy(rule, 'div')

    expect(createSnapshot(<Component data-foo="bar" color />)).toMatchSnapshot()
  })

  it('should pass props used in rules specified in passThroughProps to the element', () => {
    const rule = props => ({
      color: props['data-color'],
      fontSize: '16px',
    })
    const Component = createComponentWithProxy(rule, 'div', ['data-color'])

    expect(
      createSnapshot(<Component data-foo="bar" data-color="blue" />)
    ).toMatchSnapshot()
  })

  it('should pass props except innerRef', () => {
    const rule = props => ({
      color: props.color,
      fontSize: '16px',
    })
    const Component = createComponentWithProxy(rule, 'div')

    expect(
      createSnapshot(<Component color="black" innerRef={() => 'test'} />)
    ).toMatchSnapshot()
  })
})
