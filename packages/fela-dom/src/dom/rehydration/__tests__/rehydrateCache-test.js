import { createRenderer } from 'fela'
import { renderToString } from 'fela-tools'
import webPreset from 'fela-preset-web'

import rehydrateCache from '../rehydrateCache'

const sortObject = obj =>
  Object.keys(obj)
    .sort()
    .reduce((newObj, key) => {
      newObj[key] = obj[key]
      return newObj
    }, {})

describe('Rehydrating the cache', () => {
  it('should work as expected', () => {
    const serverRenderer = createRenderer({
      plugins: [...webPreset],
      filterClassName: cls => cls !== 'a'
    })

    serverRenderer.renderRule(() => ({
      color: 'yellow',
      backgroundColor: 'red',
      flex: 1,
      '& #id > .foo ~ bar': {
        backgroundColor: 'red'
      },
      '[alt="Hello"]': {
        fontSize: 12
      },
      '@supports (display: grid)': {
        color: 'blue',
        '&.foo.bar': {
          color: 'red'
        }
      },
      ':hover': {
        color: 'red',
        '> h1': {
          color: 'green'
        }
      }
    }))

    const css = renderToString(serverRenderer)
    const cache = rehydrateCache(css)

    expect(JSON.stringify(sortObject(cache), null, 2)).toEqual(
      JSON.stringify(sortObject(serverRenderer.cache), null, 2)
    )
  })
})
