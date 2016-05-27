import Renderer from '../../../modules/renderers/dom/DOMRenderer'
import Selector from '../../../modules/components/shared/Selector'
import DOMNode from '../../_mocks/DOMNode'

describe('DOMRenderer Tests', () => {
  describe('Rendering a selector', () => {
    it('should render a selector into a DOM node', () => {
      const selector = new Selector(props => ({ color: 'red' }))

      const node = DOMNode(1, 'STYLE')

      const renderer = new Renderer(node)
      const className = renderer.render(selector, { })

      expect(node.textContent).to.eql('.c0{color:red}')
      expect(className).to.eql('c0')
    })

    it('should concat multiple styles', () => {
      const selector = new Selector(props => ({
        color: 'red',
        bar: props.foo
      }))

      const node = DOMNode(1, 'STYLE')
      const renderer = new Renderer(node)

      renderer.render(selector, { })
      renderer.render(selector, { foo: 'foo' })

      expect(node.textContent).to.eql('.c0{color:red}.c0--kzgdz4{bar:foo}')
    })

    it('should throw if no element node was passed', () => {
      expect((function() {
        new Renderer({ })
      })).to.throw('You need to specify a valid element node (nodeType = 1) to render into.')
    })

    it('should add a fela stylesheet flag to the node', () => {
      const node = DOMNode(1, 'STYLE')

      const renderer = new Renderer(node)
      expect(node.hasAttribute('data-fela-stylesheet')).to.exist
    })
  })

  describe('Clearing the renderer', () => {
    it('should clear all caches', () => {
      const selector = new Selector(props => ({ color: 'red' }))

      const node = DOMNode(1, 'STYLE')
      const renderer = new Renderer(node)

      renderer.render(selector, { })
      renderer.render(selector, { foo: 'bar' })

      renderer.clear()

      expect(renderer.stylesheet.cache.size).to.eql(0)
    })

    it('should clear the DOM node', () => {
      const selector = new Selector(props => ({ color: 'red' }))

      const node = DOMNode(1, 'STYLE')
      const renderer = new Renderer(node)

      renderer.render(selector, { })
      renderer.render(selector, { foo: 'bar' })

      renderer.clear()

      expect(node.textContent).to.eql('')
    })
  })
})
