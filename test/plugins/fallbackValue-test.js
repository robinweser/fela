import fallbackValue from '../../modules/plugins/fallbackValue'
import pluginInterface from '../_mocks/pluginInterface'

describe('Fallback value plugin', () => {
  it('should resolve fallback value arrays to strings', () => {
    const setting = pluginInterface({
      width: [ '-webkit-calc(20px)', 'calc(20px)' ]
    }, [ fallbackValue() ])

    expect(fallbackValue()(setting)).to.eql({
      width: '-webkit-calc(20px);width:calc(20px)'
    })
  })

  it('should convert properties to dash case within value', () => {
    const setting = pluginInterface({
      marginLeft: [ '-webkit-calc(20px)', 'calc(20px)' ]
    }, [ fallbackValue() ])

    expect(fallbackValue()(setting)).to.eql({
      marginLeft: '-webkit-calc(20px);margin-left:calc(20px)'
    })
  })

  it('should resolve nested style objects', () => {
    const setting = pluginInterface({
      marginLeft: [ '-webkit-calc(20px)', 'calc(20px)' ],
      ':hover': {
        width: [ '-webkit-calc(20px)', 'calc(20px)' ]
      }
    }, [ fallbackValue() ])

    expect(fallbackValue()(setting)).to.eql({
      marginLeft: '-webkit-calc(20px);margin-left:calc(20px)',
      ':hover': {
        width: '-webkit-calc(20px);width:calc(20px)'
      }
    })
  })
})
