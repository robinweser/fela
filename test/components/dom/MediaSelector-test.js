import MediaSelector from '../../../modules/components/dom/MediaSelector'

describe('MediaSelector Tests', () => {
  describe('Rendering styles', () => {
    it('should return an object containing rendered data', () => {
      const selector = new MediaSelector(props => ({ color: 'red' }))
      const rendered = selector.render()

      expect(rendered).to.eql({ color: 'red' })
    })

    it('should resolve media specific styles', () => {
      const selector = new MediaSelector(props => ({
        fontSize: props.fontSize + 'px'
      }), {
        'min-height: 200px': props => ({
          fontSize: props.fontSize * 2 + 'px'
        })
      })

      expect(selector.render({ fontSize: 12 })).to.eql({
        fontSize: '12px'
      })
      expect(selector.renderMedia({ fontSize: 12 }, 'min-height: 200px')).to.eql({
        fontSize: '24px'
      })
    })
  })
})
