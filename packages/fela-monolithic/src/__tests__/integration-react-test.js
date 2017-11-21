import { createRenderer } from 'fela'
import React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import monolithic from '../index'

import renderToString from '../../../fela-tools/src/renderToString'
import { createComponent, Provider } from '../../../react-fela/src/index'

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
