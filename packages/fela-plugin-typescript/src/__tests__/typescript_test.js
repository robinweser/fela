import typescript from '../index'

describe('Typescript plugin', () => {
  it('should push up all properties from nested property', () => {
    const style = {
      color: 'red',
      width: 5,
      nested: {
        ':last-child': {
          padding: 10,
          height: 5,
        },
      },
    }

    expect(typescript()(style)).toEqual({
      color: 'red',
      width: 5,
      ':last-child': {
        padding: 10,
        height: 5,
      },
    })
  })

  it('should handle style recursively', () => {
    const style = {
      color: 'red',

      nested: {
        ':hover': {
          width: 5,

          nested: {
            ':last-child': {
              padding: 10,

              nested: {
                '> div': {
                  height: 5,
                },
              },
            },
          },
        },
      },
    }

    expect(typescript()(style)).toEqual({
      color: 'red',
      ':hover': {
        width: 5,
        ':last-child': {
          padding: 10,
          '> div': {
            height: 5,
          },
        },
      },
    })
  })
})
