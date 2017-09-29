import { html as beautify } from 'js-beautify'
import { createRenderer } from 'fela'

import render from '../render'
import rehydrateCache from '../rehydration/rehydrateCache'
import renderToMarkup from '../../server/renderToMarkup'

describe('render', () => {
  it('should create style nodes and render CSS rules', () => {
    const renderer = createRenderer()
    renderer.renderRule(() => ({
      backgroundColor: 'red',
      color: 'blue'
    }))
    renderer.renderKeyframe(() => ({
      '0%': {
        color: 'yellow'
      },
      '100%': {
        color: 'orange'
      }
    }))
    renderer.renderFont('Lato', ['../Lato.ttf'], {
      fontWeight: 300
    })
    render(renderer)
    expect(
      beautify(document.documentElement.outerHTML, {
        indent_size: 2
      })
    ).toMatchSnapshot()
  })

  it('should not overwrite rehydrated styles', () => {
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

    const clientRenderer = createRenderer({
      filterClassName: cls => cls !== 'a'
    })

    rehydrateCache(clientRenderer)

    clientRenderer.renderRule(() => ({
      backgroundColor: 'red',
      ':hover': {
        color: 'red'
      },
      color: 'blue'
    }))

    render(clientRenderer)

    expect(
      beautify(document.documentElement.outerHTML, {
        indent_size: 2
      })
    ).toMatchSnapshot()
  })
})
