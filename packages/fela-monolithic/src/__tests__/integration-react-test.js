import { createRenderer } from 'fela'
import React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import { renderToString } from 'fela-tools'
import { createComponent, Provider } from 'react-fela'
import monolithic from '../index'

const options = {
  enhancers: [monolithic()],
}

describe('Monolithic enhancer React integration', () => {
  it('should render a single class', () => {
    const renderer = createRenderer(options)
    const Component = createComponent(() => ({
      color: 'red',
    }))

    ReactTestRenderer.create(
      <Provider renderer={renderer}>
        <Component />
      </Provider>
    )

    ReactTestRenderer.create(
      <Provider renderer={renderer}>
        <Component />
      </Provider>
    )

    expect(renderToString(renderer)).toMatchSnapshot()
  })
})
