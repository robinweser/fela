import Renderer from '../../../modules/renderers/dom/DOMRenderer'
import Selector from '../../_mocks/Selector'
import DOMNode from '../../_mocks/DOMNode'

describe('DOMRenderer Tests', () => {
  it('should render a selector into a DOM node', () => {
    const selector = new Selector(props => ({ color: 'red' }))

    const node = DOMNode(1, 'STYLE')

    const renderer = new Renderer(node)
    const className = renderer.render(selector, { })

    expect(node.textContent).to.eql('.c0-s{color:red}')
    expect(className).to.eql('c0-s')
  })

  it('should concat multiple styles', () => {
    const selector = new Selector(props => ({ color: 'red' }))

    const node = DOMNode(1, 'STYLE')
    const renderer = new Renderer(node)

    renderer.render(selector, { })
    renderer.render(selector, { foo: 'bar' })

    expect(node.textContent).to.eql('.c0-s{color:red}.c0--kzgh9v{color:red}')
  })

  it('should throw if no element node was passed', () => {
    const selector = new Selector(props => ({ color: 'red' }))

    console.error = sinon.spy()
    const renderer = new Renderer({ })
    expect(console.error).to.have.been.calledOnce
  })
})
