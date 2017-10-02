import { RULE_TYPE } from 'fela-utils'

import { createRenderer } from 'fela'

import rehydrateCache from '../rehydrateCache'
import renderToMarkup from '../../../server/renderToMarkup'

beforeEach(() => {
  const head = document.head
  while (head.firstChild) {
    head.removeChild(head.firstChild)
  }
})

describe('Rehydrating the cache', () => {
  it('should rehydrate the renderer cache', () => {
    const serverRenderer = createRenderer({
      filterClassName: cls => cls !== 'a'
    })

    serverRenderer.renderRule(() => ({
      color: 'yellow',
      ':hover': {
        color: 'red'
      },
      '@media (max-width: 800px)': {
        color: 'blue'
      }
    }))

    document.head.innerHTML = renderToMarkup(serverRenderer)

    const clientRenderer = {
      cache: {},
      enableRehydration: true
    }

    rehydrateCache(clientRenderer)

    expect([
      clientRenderer.uniqueRuleIdentifier,
      JSON.stringify(clientRenderer.cache, null, 2)
    ]).toMatchSnapshot()
  })

  it('should not rehydrate', () => {
    const serverRenderer = createRenderer({
      filterClassName: cls => cls !== 'a'
    })

    serverRenderer.renderRule(() => ({
      color: 'yellow',
      ':hover': {
        color: 'red'
      },
      '@media (max-width: 800px)': {
        color: 'blue'
      }
    }))

    document.head.innerHTML = renderToMarkup(serverRenderer)

    const clientRenderer = {
      cache: {},
      enableRehydration: false
    }

    rehydrateCache(clientRenderer)

    expect([
      clientRenderer.uniqueRuleIdentifier,
      JSON.stringify(clientRenderer.cache, null, 2)
    ]).toMatchSnapshot()
  })
})
