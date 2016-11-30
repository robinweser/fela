import diffStyle from '../../modules/utils/diffStyle'

describe('Diffing style objects', () => {
  it('should only return new/dynamic values', () => {

    const base = { color: 'blue', fontSize: '12px' }

    const style = {
      color: 'blue',
      fontSize: '12px',
      lineHeight: 1.2
    }

    expect(diffStyle(style, base)).to.eql({
      lineHeight: 1.2
    })
  })

  it('should return modified values', () => {

    const base = { color: 'blue', fontSize: '12px' }
    const style = { color: 'red', fontSize: '12px' }

    expect(diffStyle(style, base)).to.eql({ color: 'red' })
  })

  it('should ignore additional base properties', () => {

    const base = { color: 'blue', fontSize: '12px', lineHeight: 1.2 }
    const style = { color: 'red', fontSize: '12px' }

    expect(diffStyle(style, base)).to.eql({ color: 'red' })
  })

  it('should also diff nested objects', () => {
    const base = {
      color: 'blue',
      fontSize: '12px',
      ':hover': {
        color: 'red',
        lineHeight: 1.2
      }
    }
    const style = {
      color: 'red',
      fontSize: '12px',
      ':hover': {
        color: 'red',
        fontSize: '12px',
        lineHeight: 1.5
      }
    }

    expect(diffStyle(style, base)).to.eql({
      color: 'red',
      ':hover': {
        fontSize: '12px',
        lineHeight: 1.5
      }
    })
  })

  it('should remove empty nested objects', () => {

    const base = {
      color: 'blue',
      fontSize: '12px',
      ':hover': {
        color: 'red',
        lineHeight: 1.2
      }
    }
    const style = {
      color: 'red',
      fontSize: '12px',
      ':hover': {
        color: 'red',
        lineHeight: 1.2
      }
    }

    expect(diffStyle(style, base)).to.eql({ color: 'red' })
  })
})
