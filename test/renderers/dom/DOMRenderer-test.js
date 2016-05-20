import { render, clear } from '../../../modules/renderers/dom/DOMRenderer'
import Selector from '../../_mocks/Selector'

describe('DOMRenderer Tests', () => {
  it('should render a selector into a DOM node', () => {
    const selector = new Selector(props => ({ color: 'red' }))

    const node = { textContent: '', nodeType: 1, nodeName: 'STYLE' }
    const className = render(node, selector, { })

    expect(node.textContent).to.eql('.c0-s{color:red}')
    expect(className).to.eql('c0-s')
  })

  it('should concat multiple styles', () => {
    const selector = new Selector(props => ({ color: 'red' }))

    const node = { textContent: '', nodeType: 1, nodeName: 'STYLE' }
    render(node, selector, { })
    render(node, selector, { foo: 'bar' })

    expect(node.textContent).to.eql('.c0-s{color:red}.c0--kzgh9v{color:red}')
  })

  it('should throw if no element node was passed', () => {
    const selector = new Selector(props => ({ color: 'red' }))

    console.error = sinon.spy()
    render({ }, selector, { foo: 'bar' })

    expect(console.error).to.have.been.calledOnce
  })
})
