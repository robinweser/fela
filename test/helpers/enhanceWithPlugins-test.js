import enhanceWithPlugins from '../../modules/helpers/enhanceWithPlugins'
import Selector from '../../modules/components/dom/Selector'

describe('Enhancing a Selector with plugins', () => {
  it('should invoke plugins into the render call', () => {
    const selector = new Selector(props => ({ color: 'red' }))
    // dumb test plugin that adds the property `foo` to the styles
    const plugin = ({ styles }) => styles.foo = 'bar'

    const enhancedSelector = enhanceWithPlugins(selector, [ plugin ])
    const rendered = enhancedSelector.render()
    expect(rendered.styles).to.eql({
      color: 'red',
      foo: 'bar'
    })
  })
})