import { html as beautify } from 'js-beautify'
import { createRenderer } from 'fela'
import renderToElement from '../renderToElement'

describe('renderToElement', () => {
  it('should do initial and subscription render into node', () => {
    const renderer = createRenderer()
    const node = document.createElement('style')
    node.type = 'text/css'
    document.head.appendChild(node)

    // testing initial reender
    renderer.renderRule(() => ({
      backgroundColor: 'red',
      color: 'blue'
    }))
    renderToElement(renderer, node)
    expect(
      beautify(document.documentElement.outerHTML, {
        indent_size: 2
      })
    ).toMatchSnapshot()

    // testing subscription change
    renderer.renderKeyframe(() => ({
      '0%': {
        color: 'yellow'
      },
      '100%': {
        color: 'orange'
      }
    }))
    expect(
      beautify(document.documentElement.outerHTML, {
        indent_size: 2
      })
    ).toMatchSnapshot()
  })

  it('should throw if an invalid DOM element is used', () => {
    const renderer = createRenderer()

    expect(() => renderToElement(renderer, {})).toThrow(
      'You need to specify a valid element node (mountNode.nodeType = 1) to render into.'
    )
  })
})
