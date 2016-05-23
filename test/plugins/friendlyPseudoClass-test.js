import friendlyPseudoClass from '../../modules/plugins/friendlyPseudoClass'
import pluginInterface from '../_mocks/pluginInterface'

describe('Friendly pseudo class plugin', () => {
  it('should replace friendly with valid pseudo classes', () => {
    const setting = pluginInterface({
      width: 20,
      onHover: {
        color: 'red'
      }
    }, [ friendlyPseudoClass() ])

    expect(friendlyPseudoClass()(setting)).to.eql({
      width: 20,
      ':hover': {
        color: 'red'
      }
    })
  })


  it('should resolve nested pseudo class objects', () => {
    const setting = pluginInterface({
      width: 20,
      onHover: {
        width: 30,
        onFocus: {
          color: 'red'
        }
      }
    }, [ friendlyPseudoClass() ])

    expect(friendlyPseudoClass()(setting)).to.eql({
      width: 20,
      ':hover': {
        width: 30,
        ':focus': {
          color: 'red'
        }
      }
    })
  })
})
