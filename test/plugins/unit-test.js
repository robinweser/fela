import unit from '../../modules/plugins/unit'

describe('Unit plugin', () => {
  it('should add units to number values', () => {
    const style = {
      width: 46,
      height: '34',
      lineHeight: 3.2,
      WebkitFlex: 1,
      WebkitBorderRadius: 2,
      margin: [ 23, '45', '3px' ],
      opacity: [ 23, '5' ]
    }

    expect(unit('px')(style)).to.eql({
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
    const style = { width: 46, ':hover': { height: 34 } }

    expect(unit('px')(style)).to.eql({
      width: '46px',
      ':hover': {
        height: '34px'
      }
    })
  })

  it('should default to px', () => {
    const style = { width: 46 }
    expect(unit()(style)).to.eql({ width: '46px' })
  })

  it('should accept units other than px', () => {
    const style = { width: 46 }
    expect(unit('em')(style)).to.eql({ width: '46em' })
  })

  it('should add property specific units', () => {
    const style = {
      width: 46,
      height: 50,
      margin: 10,
      fontSize: 15
    }
    expect(unit('px', { margin: '%', fontSize: 'pt' })(style)).to.eql({
      width: '46px',
      height: '50px',
      margin: '10%',
      fontSize: '15pt'
    })
  })
})
