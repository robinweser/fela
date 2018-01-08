import { createRenderer } from 'fela'
import webPreset from 'fela-preset-web'

import rehydrate from '../rehydrate'
import renderToMarkup from '../../../server/renderToMarkup'

const sortObject = obj =>
  Object.keys(obj)
    .sort()
    .reduce((newObj, key) => {
      newObj[key] = obj[key]
      return newObj
    }, {})

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
})
