import Selector from '../../../modules/components/shared/Selector'

describe('Selector Tests', () => {
  describe('Rendering styles', () => {
    it('should return an object containing rendered data', () => {
      const selector = new Selector(props => ({ color: 'red' }))
      const rendered = selector.render()

      expect(rendered).to.eql({ color: 'red' })
    })
  })
})
