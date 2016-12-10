import assign from '../../modules/utils/assign'

describe('Assigning objects', () => {
  it('should merge properties', () => {
    expect(assign(
      { color: 'red' },
      { fontSize: 12 },
      { lineHeight: 1 })
    ).to.eql({ color: 'red', fontSize: 12, lineHeight: 1 })
  })

  it('should overwrite properties from right to left', () => {
    expect(assign(
      { fontSize: 12 },
      { fontSize: 16 },
      { fontSize: 11 })
    ).to.eql({ fontSize: 11 })
  })

  it('should merge nested objects', () => {
    expect(assign(
      { fontSize: 12, ob2: { color: 'red' }, ob3: { color: 'red' } },
      { fontSize: 16, ob2: { fontSize: 12 } },
      { fontSize: 11, ob3: { color: 'blue' } })
    ).to.eql({
      fontSize: 11,
      ob2: {
        color: 'red',
        fontSize: 12
      },
      ob3: {
        color: 'blue'
      }
    })
  })

  it('should not overwrite objects other than the first one', () => {
    const ob1 = { color: 'red' }
    const ob2 = { fontSize: 12 }

    const newOb = assign({ }, ob1, ob2)

    expect(newOb).to.eql({ color: 'red', fontSize: 12 })

    newOb.foo = 'bar'
    expect(ob1).to.eql({ color: 'red' })
    expect(ob2).to.eql({ fontSize: 12 })
  })

  it('should use the first object as base', () => {
    const ob1 = { color: 'red' }
    const ob2 = { fontSize: 12 }

    const newOb = assign(ob1, ob2)

    expect(newOb).to.eql({ color: 'red', fontSize: 12 })
    expect(ob1).to.eql(newOb)

    newOb.foo = 'bar'
    expect(ob1).to.eql({
      color: 'red',
      fontSize: 12,
      foo: 'bar'
    })
  })
})
