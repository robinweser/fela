import prefixer from '../../modules/plugins/prefixer'
import pluginInterface from '../_mocks/pluginInterface'

describe('Prefixer plugin', () => {
  it('should prefix styles', () => {
    const setting = pluginInterface({
      display: 'flex',
      justifyContent: 'center'
    })

    expect(prefixer()(setting)).to.eql({
      display: [ '-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex' ],
      WebkitJustifyContent: 'center',
      WebkitBoxPack: 'center',
      msFlexPack: 'center',
      justifyContent: 'center'
    })
  })
})
