import createMergeArrayStyle from '../createMergeArrayStyle'

describe('Merging array values', () => {
  it('should merge properties', () => {
    const mergeStyle = createMergeArrayStyle([])

    expect(
      mergeStyle({ color: 'red' }, { fontSize: 12 }, { lineHeight: 1 })
    ).toEqual({
      color: 'red',
      fontSize: 12,
      lineHeight: 1
    })
  })

  it('should overwrite properties from right to left', () => {
    const mergeStyle = createMergeArrayStyle([])

    expect(
      mergeStyle({ fontSize: 12 }, { fontSize: 16 }, { fontSize: 11 })
    ).toEqual({ fontSize: 11 })
  })

  it('should merge nested objects', () => {
    const mergeStyle = createMergeArrayStyle([])

    expect(
      mergeStyle(
        {
          fontSize: 12,
          ob2: { color: 'red' },
          ob3: { color: 'red' }
        },
        {
          fontSize: 16,
          ob2: { fontSize: 12 }
        },
        {
          fontSize: 11,
          ob3: { color: 'blue' }
        }
      )
    ).toEqual({
      fontSize: 11,
      ob2: {
        color: 'red',
        fontSize: 12
      },
      ob3: { color: 'blue' }
    })
  })

  it('should not overwrite objects other than the first one', () => {
    const mergeStyle = createMergeArrayStyle([])

    const ob1 = { color: 'red' }
    const ob2 = { fontSize: 12 }

    const newOb = mergeStyle({}, ob1, ob2)

    expect(newOb).toEqual({
      color: 'red',
      fontSize: 12
    })

    newOb.foo = 'bar'
    expect(ob1).toEqual({ color: 'red' })
    expect(ob2).toEqual({ fontSize: 12 })
  })

  it('should use the first object as base', () => {
    const mergeStyle = createMergeArrayStyle([])

    const ob1 = { color: 'red' }
    const ob2 = { fontSize: 12 }

    const newOb = mergeStyle(ob1, ob2)

    expect(newOb).toEqual({
      color: 'red',
      fontSize: 12
    })
    expect(ob1).toEqual(newOb)

    newOb.foo = 'bar'
    expect(ob1).toEqual({
      color: 'red',
      fontSize: 12,
      foo: 'bar'
    })
  })

  it('should overwrite previous values when both values are array', () => {
    const mergeStyle = createMergeArrayStyle([])

    const ob1 = { fontSize: ['10px', '10rem'] }
    const ob2 = { fontSize: ['10px', '20vw'] }

    const newOb = mergeStyle({}, ob1, ob2)

    expect(newOb).toEqual({ fontSize: ['10px', '20vw'] })
  })

  it('should overwrite previous values when only the last value is an array', () => {
    const mergeStyle = createMergeArrayStyle([])

    const ob1 = { fontSize: 10 }
    const ob2 = { fontSize: ['10px', '20vw'] }

    const newOb = mergeStyle({}, ob1, ob2)

    expect(newOb).toEqual({ fontSize: ['10px', '20vw'] })
  })

  it('should overwrite previous values when only the first value is an array', () => {
    const mergeStyle = createMergeArrayStyle([])

    const ob1 = { fontSize: ['10px', '10rem'] }
    const ob2 = { fontSize: 20 }

    const newOb = mergeStyle({}, ob1, ob2)

    expect(newOb).toEqual({ fontSize: 20 })
  })

  it('should merge extend arrays', () => {
    const mergeStyle = createMergeArrayStyle(['extend'])

    const ob1 = {
      extend: {
        foo: 1,
        bar: 2
      }
    }
    const ob2 = {
      extend: {
        baz: 3
      }
    }

    const ob3 = {
      extend: [
        {
          faz: 1
        },
        {
          asd: 24
        }
      ]
    }

    const ob4 = {
      extend: [
        {
          buz: 1
        },
        {
          bla: 3
        }
      ]
    }

    expect(mergeStyle({}, ob1, ob2)).toEqual({
      extend: [{ foo: 1, bar: 2 }, { baz: 3 }]
    })

    expect(mergeStyle({}, ob1, ob2, ob3)).toEqual({
      extend: [{ foo: 1, bar: 2 }, { baz: 3 }, { faz: 1 }, { asd: 24 }]
    })

    expect(mergeStyle({}, ob3, ob4)).toEqual({
      extend: [{ faz: 1 }, { asd: 24 }, { buz: 1 }, { bla: 3 }]
    })
  })
})
