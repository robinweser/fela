import 'raf/polyfill'
import React from 'react'

import { createRenderer } from 'fela'
import { createSnapshot } from 'jest-react-fela'
import { createComponent } from 'react-fela'

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

  it('should render fela rules with plain objects', () => {
    const style = {
      color: 'red',
      fontSize: '16px',
    }

    const Component = createComponent(style)

    expect(createSnapshot(<Component />)).toMatchSnapshot()
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
})
