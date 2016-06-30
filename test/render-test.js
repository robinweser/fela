import createRenderer from '../modules/createRenderer'
import render from '../modules/render'
import DOMNode from './_mocks/DOMNode'

describe('Rendering into a DOM node', () => {
  it('should subscribe to changes', () => {
    const rule = props => ({ color: 'red' })

    const node = DOMNode()

    const renderer = createRenderer(node)
    render(renderer, node)

    const className = renderer.renderRule(rule)


    expect(node.textContent).to.eql('.c0{color:red}')
  })

  it('should clear the DOM node', () => {
    const rule = props => ({ color: 'red' })

    const node = DOMNode()

    const renderer = createRenderer(node)
    render(renderer, node)

    const className = renderer.renderRule(rule)
    renderer.clear()

    expect(node.textContent).to.eql('')
  })

  it('should only update the DOM if it does not match the CSS', () => {
    const rule = props => ({ color: 'red' })

    const node = DOMNode()

    node.textContent = 'foo'

    const renderer = createRenderer(node)
    const className = renderer.renderRule(rule)

    render(renderer, node)

    expect(node.textContent).to.eql('.c0{color:red}')
  })

  it('should set the data-fela-stylesheet attribute', () => {
    const node = DOMNode()

    const renderer = createRenderer(node)
    render(renderer, node)

    expect(node.hasAttribute('data-fela-stylesheet')).to.eql(true)
  })

  it('should throw if an invalid mountNode is passed', () => {
    expect(function() {
      render(createRenderer(), { })
    }).to.throw('You need to specify a valid element node (nodeType = 1) to render into.')
  })
})
