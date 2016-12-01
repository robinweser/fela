import createRenderer from '../modules/createRenderer'
import render from '../modules/render'
import DOMNode from './_mocks/DOMNode'

describe('Rendering into a DOM node', () => {
  it('should subscribe to changes', () => {
    const rule = props => ({ color: 'red' })
    const node = DOMNode()
    const renderer = createRenderer()

    process.env.NODE_ENV = 'production'

    render(renderer, node)
    const className = renderer.renderRule(rule)

    expect(node.sheet.cssRules).to.eql([ '.c1{color:red}' ])
    expect(renderer.listeners.length).to.eql(1)
  })

  it('should only update the DOM if it does not match the CSS', () => {
    const rule = props => ({ color: 'red' })

    const node = DOMNode()

    node.textContent = 'foo'

    const renderer = createRenderer()
    const className = renderer.renderRule(rule)

    render(renderer, node)

    expect(node.textContent).to.eql('.c1{color:red}')
  })

  it('should set the data-fela-stylesheet attribute', () => {
    const node = DOMNode()

    const renderer = createRenderer()
    render(renderer, node)

    expect(node.hasAttribute('data-fela-stylesheet')).to.eql(true)
  })

  it('should throw if an invalid mountNode is passed', () => {
    expect(function() {
      render(createRenderer(), { })
    }).to.throw('You need to specify a valid element node (nodeType = 1) to render into.')
  })
})
