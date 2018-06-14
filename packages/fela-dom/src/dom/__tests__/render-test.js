import { html as beautify } from 'js-beautify'
import { createRenderer } from 'fela'

import render from '../render'
import rehydrate from '../rehydration/rehydrate'
import renderToMarkup from '../../server/renderToMarkup'

beforeEach(() => {
  const head = document.head
  while (head.firstChild) {
    head.removeChild(head.firstChild)
  }
})

afterEach(() => {
  process.env.NODE_ENV = 'test'
})

describe('render', () => {
  it('should create style nodes and render CSS rules', () => {
    const renderer = createRenderer()
    renderer.renderRule(() => ({
      backgroundColor: 'red',
      color: 'blue',
    }))
    renderer.renderKeyframe(() => ({
      '0%': {
        color: 'yellow',
      },
      '100%': {
        color: 'orange',
      },
    }))
    renderer.renderFont('Lato', ['../Lato.ttf'], {
      fontWeight: 300,
    })
    render(renderer)
    expect(
      beautify(document.documentElement.outerHTML, {
        indent_size: 2,
      })
    ).toMatchSnapshot()
  })

  it('should not render multiple times', () => {
    const renderer = createRenderer()

    render(renderer)
    render(renderer)

    renderer.renderRule(() => ({
      backgroundColor: 'red',
      color: 'blue',
    }))

    expect(
      beautify(document.documentElement.outerHTML, {
        indent_size: 2,
      })
    ).toMatchSnapshot()
  })

  it('should not overwrite rehydrated styles', () => {
    const serverRenderer = createRenderer({
      filterClassName: cls => cls !== 'a',
    })

    serverRenderer.renderRule(() => ({
      color: 'yellow',
      ':hover': {
        color: 'red',
      },
      '@media (max-width: 800px)': {
        color: 'blue',
      },
    }))

    document.head.innerHTML = renderToMarkup(serverRenderer)

    const clientRenderer = createRenderer({
      filterClassName: cls => cls !== 'a',
    })

    rehydrate(clientRenderer)

    clientRenderer.renderRule(() => ({
      backgroundColor: 'red',
      ':hover': {
        color: 'red',
      },
      color: 'blue',
    }))

    render(clientRenderer)

    expect(
      beautify(document.documentElement.outerHTML, {
        indent_size: 2,
      })
    ).toMatchSnapshot()
  })

  it('should correctly sort rules', () => {
    process.env.NODE_ENV = 'production'

    const renderer = createRenderer()
    render(renderer)

    renderer.renderRule(() => ({
      color: 'blue',
      ':focus-within': {
        color: 'black',
      },
      ':hover': {
        color: 'red',
      },
      ':active': {
        color: 'yellow',
      },
    }))

    renderer.renderRule(() => ({
      color: 'red',
      ':hover': {
        color: 'blue',
      },
      ':active': {
        color: 'yellow',
      },
    }))

    expect(document.styleSheets[0].cssRules).toMatchSnapshot()
  })
})
