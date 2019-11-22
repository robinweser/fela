import { createRenderer } from 'fela'
import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

import { renderToString } from 'fela-tools'
import { createComponent, connect, RendererProvider } from 'react-fela'
import monolithic from 'fela-monolithic'

describe('Monolithic enhancer React integration', () => {
  it('should render a single class', () => {
    const renderer = createRenderer({
      enhancers: [monolithic()],
    })
    const Component = createComponent(() => ({
      color: 'red',
    }))

    ReactTestRenderer.create(
      <RendererProvider renderer={renderer}>
        <Component />
      </RendererProvider>
    )

    ReactTestRenderer.create(
      <RendererProvider renderer={renderer}>
        <Component />
      </RendererProvider>
    )

    expect(renderToString(renderer)).toMatchSnapshot()
  })

  it('should generate pretty selectors for createComponent', () => {
    const renderer = createRenderer({
      enhancers: [
        monolithic({
          prettySelectors: true,
        }),
      ],
    })
    const BaseComponent = ({ className }) => <div className={className} />
    const Component = createComponent(
      () => ({
        color: 'red',
      }),
      BaseComponent
    )

    ReactTestRenderer.create(
      <RendererProvider renderer={renderer}>
        <Component />
      </RendererProvider>
    )

    expect(renderToString(renderer)).toMatchSnapshot()
  })

  it('should generate pretty selectors for connect', () => {
    const renderer = createRenderer({
      enhancers: [
        monolithic({
          prettySelectors: true,
        }),
      ],
    })
    const BaseComponent = ({ styles }) => (
      <div>
        <div className={styles.header} />
        <div className={styles.body} />
        <div className={styles.footer} />
      </div>
    )
    const Component = connect(() => ({
      header: { color: 'red' },
      body: { color: 'green' },
      footer: { color: 'blue' },
    }))(BaseComponent)

    ReactTestRenderer.create(
      <RendererProvider renderer={renderer}>
        <Component />
      </RendererProvider>
    )

    expect(renderToString(renderer)).toMatchSnapshot()
  })
})
