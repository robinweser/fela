import createRenderer from '../../modules/createRenderer'
import theming from '../../modules/enhancers/theming'

describe('Theming Enhancer', () => {
  describe('Adding theming to the renderer', () => {
    it('should add an updateTheme method', () => {
      const renderer = createRenderer({
        enhancers: [ theming({ }) ]
      })

      expect(renderer.updateTheme).to.be.a.function
    })

    it('should add the theme to the renderer properties', () => {
      const renderer = createRenderer({
        enhancers: [ theming({ foo: 'bar' }) ]
      })

      expect(renderer.theme).to.eql({ foo: 'bar' })
    })
  })


  describe('Resolving style', () => {
    it('should additionally pass the theme', () => {
      const renderer = createRenderer({
        enhancers: [ theming({ color: 'red' }) ]
      })

      const style = (props, theme) => ({
        color: theme.color,
        fontSize: props.size,
        background: 'blue'
      })

      expect(renderer._resolveStyle(style, { size: 14 })).to.eql({
        fontSize: 14,
        color: 'red',
        background: 'blue'
      })
    })
  })
})
