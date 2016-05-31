import cssifyCache from '../../../../modules/renderers/dom/utils/cssifyCache'
import Renderer from '../../../../modules/renderers/dom/ServerRenderer'

describe('Cssifying a stylesheets cache', () => {
  it('should render valid CSS', () => {
    const selector = props => ({
      color: props.color,
      fontSize: '12px'
    })

    const renderer = new Renderer()
    const staticClassName = renderer.render(selector)
    const dynamicClassName = renderer.render(selector, {
      color: 'red'
    })

    const css = cssifyCache(renderer.stylesheet.cache)

    expect(css).to.eql('.' + staticClassName + '{font-size:12px}.' + dynamicClassName.replace(staticClassName, '').trim() + '{color:red}')
  })

  it('should not render empty selectors', () => {
    const selector = props => ({ fontSize: '12px' })

    const renderer = new Renderer()
    const staticClassName = renderer.render(selector)
    const dynamicClassName = renderer.render(selector, {
      color: 'red'
    })

    const css = cssifyCache(renderer.stylesheet.cache)

    expect(css).to.eql('.' + staticClassName + '{font-size:12px}')
  })
})