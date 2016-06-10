import prefixer from '../../modules/plugins/prefixer'

describe('Prefixer plugin', () => {
  it('should prefix styles', () => {
    const style = { display: 'flex', justifyContent: 'center' }

    expect(prefixer()(style)).to.eql({
      display: [ '-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex' ],
      WebkitJustifyContent: 'center',
      WebkitBoxPack: 'center',
      msFlexPack: 'center',
      justifyContent: 'center'
    })
  })
})
