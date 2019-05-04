import 'raf/polyfill'
import React from 'react'

import { createRenderer } from 'fela'
import { createSnapshot } from 'jest-react-fela'
import monolithic from 'fela-monolithic'
import { createComponent, createComponentWithProxy } from 'react-fela'

describe('Creating Components from Fela rules using fela-monolithic', () => {
  it('should use a dev-friendly className', () => {
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
