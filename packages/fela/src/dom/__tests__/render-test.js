import createRenderer from '../../createRenderer'
import render from '../render'

import DOMNode from './mocks/DOMNode'

describe('Rendering into a DOM node', () => {
  it('should subscribe to changes', () => {
    const rule = () => ({ color: 'red' })
    const node = DOMNode()
    const renderer = createRenderer()

    process.env.NODE_ENV = 'production'

    render(renderer, node)
    renderer.renderRule(rule)

    expect(node.sheet.cssRules).toEqual(['.a{color:red}'])
    expect(renderer.listeners.length).toEqual(1)
  })

  it('should only update the DOM if it does not match the CSS', () => {
    const rule = () => ({ color: 'red' })

    const node = DOMNode()

    node.textContent = 'foo'

    const renderer = createRenderer()
    renderer.renderRule(rule)

    render(renderer, node)

    expect(node.textContent).toEqual('.a{color:red}')
  })

  it('should set the data-fela-stylesheet attribute', () => {
    const node = DOMNode()

    const renderer = createRenderer()
    render(renderer, node)

    expect(node.hasAttribute('data-fela-stylesheet')).toEqual(true)
  })

  it('should throw if an invalid mountNode is passed', () => {
    expect(() => {
      render(createRenderer(), {})
    }).toThrow(
      'You need to specify a valid element node (nodeType = 1) to render into.'
    )
  })
})
