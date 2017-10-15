import { RULE_TYPE } from 'fela-utils'

import { createRenderer } from 'fela'

import rehydrate from '../rehydrate'
import renderToMarkup from '../../../server/renderToMarkup'

beforeEach(() => {
  const head = document.head
  while (head.firstChild) {
    head.removeChild(head.firstChild)
  }
})

describe('Rehydrating from DOM nodes', () => {
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

    console.log(document.head.innerHTML)
    const clientRenderer = {
      cache: {}
    }

    rehydrate(clientRenderer)

    expect([
      clientRenderer.uniqueRuleIdentifier,
      JSON.stringify(clientRenderer.cache, null, 2)
    ]).toMatchSnapshot()
  })
})
