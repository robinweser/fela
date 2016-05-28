import Renderer from '../../../modules/renderers/dom/ServerRenderer'

describe('ServerRenderer Tests', () => {
  describe('Rendering a Selector', () => {
    it('should render a Selector into the StyleSheet', () => {
      const selector = props => ({ color: 'red' })

      const renderer = new Renderer()
      const className = renderer.render(selector, { })
      expect(className).to.eql('c0')
    })
  })

  describe('Rendering to string', () => {
    it('should return concated multiple styles ', () => {
      const selector = props => ({ color: 'red' })

      const renderer = new Renderer()

      renderer.render(selector, { })
      renderer.render(selector, { foo: 'bar' })

      expect(renderer.renderToString()).to.eql('.c0{color:red}')
    })
  })

  describe('Clearing the renderer', () => {
    it('should clear all caches', () => {
      const selector = props => ({ color: 'red' })

      const renderer = new Renderer()

      renderer.render(selector, { })
      renderer.render(selector, { foo: 'bar' })

      renderer.clear()

      expect(renderer.stylesheet.cache.size).to.eql(0)
      expect(renderer.renderToString()).to.eql('')
    })
  })
})
