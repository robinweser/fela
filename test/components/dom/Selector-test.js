import Selector from '../../../modules/components/dom/Selector'

describe('Selector Tests', () => {
  describe('Rendering styles', () => {
    it('should return an object containing rendered data', () => {
      const selector = new Selector(props => ({ color: 'red' }))
      const rendered = selector.render()

      expect(rendered).to.eql({
        styles: {
          color: 'red'
        },
        mediaStyles: new Map()
      })
    })

    it('should resolve media specific styles', () => {
      const selector = new Selector(props => ({
        fontSize: props.fontSize + 'px'
      }), {
        'min-height: 200px': props => ({
          fontSize: props.fontSize * 2 + 'px'
        })
      })

      const rendered = selector.render({ fontSize: 12 })

      expect(rendered.styles).to.eql({ fontSize: '12px' })
      expect(rendered.mediaStyles.has('min-height: 200px')).to.eql(true)
      expect(rendered.mediaStyles.get('min-height: 200px')).to.eql({
        fontSize: '24px'
      })
    })
  })
})
