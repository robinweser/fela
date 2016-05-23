import enhanceWithPlugins from '../../modules/helpers/enhanceWithPlugins'
import DOMRenderer from '../../modules/renderers/dom/DOMRenderer'
import DOMNode from '../_mocks/DOMNode'
import Selector from '../_mocks/Selector'

describe('Enhancing a Renderer with plugins', () => {
  it('should invoke plugins into the render call', () => {
    const selector = new Selector(props => ({ color: 'red' }))
    // dumb test plugin that adds the property `foo` to the styles
    const plugin = ({ styles }) => styles.foo = 'bar'

    const node = DOMNode(1, 'STYLE')

    const renderer = new DOMRenderer(node)
    const enhancedRenderer = enhanceWithPlugins(renderer, [ plugin ])

    enhancedRenderer.render(selector)

    expect(enhancedRenderer.stylesheet.cache.get(selector).get('s')).to.eql({
      color: 'red',
      foo: 'bar'
    })
  })
})
