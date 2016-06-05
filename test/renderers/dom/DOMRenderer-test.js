import Renderer from '../../../modules/renderers/dom/DOMRenderer'
import DOMNode from '../../_mocks/DOMNode'

describe('DOMRenderer Tests', () => {
  describe('Rendering', () => {
    it('should use its stylesheets render handler', () => {
      const selector = props => ({ color: 'red' })

      const renderer = new Renderer(DOMNode())
      renderer.stylesheet.handleRender = sinon.spy()
      const className = renderer.render(selector, { })
      expect(renderer.stylesheet.handleRender).to.have.been.calledOnce
    })

    it('should return its stylesheets render handler results', () => {
      const selector = props => ({ color: 'red' })

      const renderer = new Renderer(DOMNode())
      const className = renderer.render(selector)
      expect(className).to.eql('c0')
    })
  })

  describe('Rendering a selector', () => {
    it('should render a selector into a DOM node', () => {
      const selector = props => ({ color: 'red' })

      const node = DOMNode()

      const renderer = new Renderer(node)
      const className = renderer.render(selector, { })

      expect(node.textContent).to.eql('.c0{color:red}')
      expect(className).to.eql('c0')
    })

    it('should concat multiple styles', () => {
      const selector = props => ({ color: 'red', bar: props.foo })

      const node = DOMNode()
      const renderer = new Renderer(node)

      renderer.render(selector, { })
      renderer.render(selector, { foo: 'foo' })

      expect(node.textContent).to.eql('.c0{color:red}.c0--kzgdz4{bar:foo}')
    })

    it('should render media query styles', () => {
      const selector = props => ({
        color: 'red',
        bar: props.foo,
        '@media (min-height: 300px)': {
          color: 'blue'
        }
      })

      const node = DOMNode()
      const renderer = new Renderer(node)

      renderer.render(selector, { })
      renderer.render(selector, { foo: 'foo' })

      expect(node.textContent).to.eql('.c0{color:red}.c0--kzgdz4{bar:foo}@media (min-height: 300px){.c0{color:blue}}')
    })

    it('should throw if no element node was passed', () => {
      expect((function() {
        new Renderer({ })
      })).to.throw('You need to specify a valid element node (nodeType = 1) to render into.')
    })

    it('should add a fela stylesheet flag to the node', () => {
      const node = DOMNode()

      const renderer = new Renderer(node)
      expect(node.hasAttribute('data-fela-stylesheet')).to.exist
    })
  })

  describe('Clearing the renderer', () => {
    it('should clear all caches', () => {
      const selector = props => ({ color: 'red' })

      const node = DOMNode()
      const renderer = new Renderer(node)

      renderer.render(selector, { })
      renderer.render(selector, { foo: 'bar' })

      renderer.clear()

      expect(Object.keys(renderer.stylesheet.rendered).length).to.eql(0)
    })

    it('should clear the DOM node', () => {
      const selector = props => ({ color: 'red' })

      const node = DOMNode()
      const renderer = new Renderer(node)

      renderer.render(selector, { })
      renderer.render(selector, { foo: 'bar' })

      renderer.clear()

      expect(node.textContent).to.eql('')
    })
  })
})
