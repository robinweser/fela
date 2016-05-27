import LVHA from '../../modules/plugins/LVHA'
import pluginInterface from '../_mocks/pluginInterface'

describe('LVHA plugin', () => {
  it('should sort pseudo classes correctly', () => {
    const setting = pluginInterface({
      ':hover': {},
      ':focus': {},
      ':link': {},
      ':active': {},
      ':visited': {}
    }, [ LVHA() ])

    expect(LVHA()(setting)).to.eql({
      ':link': {},
      ':visited': {},
      ':hover': {},
      ':focus': {},
      ':active': {}
    })
  })
})
