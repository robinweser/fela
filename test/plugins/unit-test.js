import unit from '../../modules/plugins/unit'
import pluginInterface from '../_mocks/pluginInterface'

describe('Unit plugin', () => {
  it('should add units to number values', () => {
    const setting = pluginInterface({
      width: 46,
      height: '34',
      lineHeight: 3.2,
      WebkitFlex: 1,
      WebkitBorderRadius: 2,
      margin: [ 23, '45', '3px' ],
      opacity: [ 23, '5' ]
    })

    expect(unit('px')(setting)).to.eql({
      width: '46px',
      height: '34px',
      lineHeight: 3.2,
      WebkitFlex: 1,
      WebkitBorderRadius: '2px',
      margin: [ '23px', '45px', '3px' ],
      opacity: [ 23, '5' ]
    })
  })

  it('should add units to nested style objects', () => {
    const setting = pluginInterface({
      width: 46,
      ':hover': {
        height: 34
      }
    }, [ unit('px') ])

    expect(unit('px')(setting)).to.eql({
      width: '46px',
      ':hover': {
        height: '34px'
      }
    })
  })

  it('should default to px', () => {
    const setting = pluginInterface({ width: 46 })
    expect(unit()(setting)).to.eql({ width: '46px' })
  })

  it('should accept units other than px', () => {
    const setting = pluginInterface({ width: 46 })
    expect(unit('em')(setting)).to.eql({ width: '46em' })
  })
})
