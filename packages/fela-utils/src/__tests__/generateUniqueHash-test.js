import generateUniqueHash from '../generateUniqueHash'

describe('Generating a unique hash', () => {
  it('should works with objects', () => {
    const reference = {
      color: 'red',
    }

    expect(generateUniqueHash(reference)).toMatchSnapshot()
  })

  it('should not cause a collision between results', () => {
    const reference1 = {
      ':after': {
        content: '"go"',
      },
    }

    const reference2 = {
      ':after': {
        content: '"Fn"',
      },
    }

    expect(generateUniqueHash(reference1)).not.toBe(
      generateUniqueHash(reference2)
    )
  })
})
