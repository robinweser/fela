import extend from '../../modules/plugins/extend'

describe('Extend plugin', () => {
  it('should extend style objects', () => {
    const extension = { backgroundColor: 'blue' }
    const base = { color: 'blue', extend: extension }

    expect(extend()(base)).to.eql({
      color: 'blue',
      backgroundColor: 'blue'
    })
  })

  it('should extend nested style objects', () => {
    const extension = { backgroundColor: 'blue' }
    const base = {
      color: 'blue',
      ':hover': {
        color: 'red',
        extend: extension
      }
    }

    expect(extend()(base)).to.eql({
      color: 'blue',
      ':hover': {
        color: 'red',
        backgroundColor: 'blue'
      }
    })
  })

  it('should extend conditional style object', () => {
    const extension = { backgroundColor: 'blue' }
    const base = {
      color: 'blue',
      extend: {
        condition: true,
        style: extension
      }
    }

    expect(extend()(base)).to.eql({
      color: 'blue',
      backgroundColor: 'blue'
    })
  })

  it('should not extend conditional style object', () => {
    const extension = { backgroundColor: 'blue' }
    const base = {
      color: 'blue',
      extend: {
        condition: false,
        style: extension
      }
    }

    expect(extend()(base)).to.eql({ color: 'blue' })
  })

  it('should extend multiple style objects', () => {
    const extension = { backgroundColor: 'blue' }
    const otherExtension = { fontSize: '12px' }

    const base = {
      color: 'blue',
      extend: [ extension, otherExtension ]
    }

    expect(extend()(base)).to.eql({
      color: 'blue',
      backgroundColor: 'blue',
      fontSize: '12px'
    })
  })

  it('should extend multiple style objects and conditional style objects', () => {
    const extension = { backgroundColor: 'blue' }
    const otherExtension = { fontSize: '12px' }

    const base = {
      color: 'blue',
      extend: [ extension, {
        condition: true,
        style: otherExtension
      } ]
    }

    expect(extend()(base)).to.eql({
      color: 'blue',
      backgroundColor: 'blue',
      fontSize: '12px'
    })
  })

  it('should extend multiple style objects but not conditional style objects', () => {
    const extension = { backgroundColor: 'blue' }
    const otherExtension = { fontSize: '12px' }

    const base = {
      color: 'blue',
      extend: [ extension, {
        condition: false,
        style: otherExtension
      } ]
    }

    expect(extend()(base)).to.eql({
      color: 'blue',
      backgroundColor: 'blue'
    })
  })
})
