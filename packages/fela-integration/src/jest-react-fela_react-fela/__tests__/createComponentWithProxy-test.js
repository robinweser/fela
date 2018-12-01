import 'raf/polyfill'
import React from 'react'

import { createSnapshot } from 'jest-react-fela'
import { createComponentWithProxy } from 'react-fela'

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
