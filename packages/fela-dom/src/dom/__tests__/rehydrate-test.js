import rehydrate from '../rehydrate'

import renderToMarkup from '../../server/renderToMarkup'
import createRenderer from '../../../../fela/src/createRenderer'
import webPreset from '../../../../fela-preset-web/src/index'

import sortObject from '../__helpers__/sortObject'

beforeEach(() => {
  const head = document.head
  while (head.firstChild) {
    head.removeChild(head.firstChild)
  }
})

describe('Rehydrating from DOM nodes', () => {
  it('should rehydrate the renderer cache', () => {
    const serverRenderer = createRenderer({
      filterClassName: cls => cls !== 'a',
      plugins: [...webPreset],
    })

    serverRenderer.renderRule(() => ({
      color: 'yellow',
      backgroundColor: 'red',
      flex: 1,
      '& #id > .foo ~ bar': {
        backgroundColor: 'red',
      },
      '[alt="Hello"]': {
        fontSize: 12,
      },
      '@supports (display: grid)': {
        color: 'blue',
        '&.foo.bar': {
          color: 'red',
        },
      },
      ':hover': {
        color: 'red',
        '> h1': {
          color: 'green',
        },
      },
    }))

    document.head.innerHTML = renderToMarkup(serverRenderer)

    const clientRenderer = createRenderer({
      filterClassName: cls => cls !== 'a',
      plugins: [...webPreset],
    })

    rehydrate(clientRenderer)

    expect([
      clientRenderer.uniqueRuleIdentifier,
      clientRenderer.cache,
    ]).toMatchSnapshot()

    expect(sortObject(clientRenderer.cache)).toEqual(
      sortObject(serverRenderer.cache)
    )
  })

  it('should continue in rehydratation with correct rehydratation index', () => {
    const serverRenderer = createRenderer({
      plugins: [...webPreset],
    })

    serverRenderer.renderRule(() => ({
      color: 'yellow',
      backgroundColor: 'red',
    }))

    expect(serverRenderer.uniqueRuleIdentifier).toBe(2)

    document.head.innerHTML = renderToMarkup(serverRenderer)

    const clientRenderer = createRenderer({
      plugins: [...webPreset],
    })

    rehydrate(clientRenderer)

    expect(clientRenderer.uniqueRuleIdentifier).toBe(2)

    // simulates e.g. page transition with new component rule
    rehydrate(clientRenderer)

    clientRenderer.renderRule(() => ({
      color: 'black',
    }))

    expect(clientRenderer.uniqueRuleIdentifier).toBe(3)

    // simulates e.g. page transition with new component rule
    rehydrate(clientRenderer)

    clientRenderer.renderRule(() => ({
      color: 'purple',
    }))

    expect(clientRenderer.uniqueRuleIdentifier).toBe(4)
  })
})
