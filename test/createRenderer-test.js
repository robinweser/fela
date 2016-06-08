import createRenderer from '../modules/createRenderer'
import DOMNode from './_mocks/DOMNode'

describe('Using the DOM Renderer', () => {
  it('should update the DOM Node on render', () => {
    const rule = props => ({ color: 'red' })

    const node = DOMNode()

    const renderer = createRenderer(node)
    const className = renderer.renderRule(rule)
    expect(node.textContent).to.eql('.c0{color:red}')
  })

  it('should clear the DOM node', () => {
    const rule = props => ({ color: 'red' })

    const node = DOMNode()

    const renderer = createRenderer(node)
    const className = renderer.renderRule(rule)
    renderer.clear()

    expect(node.textContent).to.eql('')
  })

  it('should set the data-fela-stylesheet attribute', () => {
    const node = DOMNode()

    const renderer = createRenderer(node)

    expect(node.hasAttribute('data-fela-stylesheet')).to.eql(true)
  })

  it('should throw if an invalid mountNode is passed', () => {
    expect(function() {
      createRenderer({ })
    }).to.throw('You need to specify a valid element node (nodeType = 1) to render into.')
  })
})
