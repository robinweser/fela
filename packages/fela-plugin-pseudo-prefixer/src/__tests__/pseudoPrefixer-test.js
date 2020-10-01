import pseudoPrefixer from '../index'

describe('Pseudo prefixer plugin', () => {
  it('should add pseudo selector prefixes', () => {
    const style = {
      width: 20,
      '::placeholder': {
        color: 'red',
      },
    }

    expect(
      pseudoPrefixer('::placeholder', [
        '::-webkit-input-placeholder',
        '::-moz-placeholder',
        ':-ms-input-placeholder',
        ':-moz-placeholder',
        '::placeholder',
      ])(style)
    ).toEqual({
      width: 20,
      '::-webkit-input-placeholder': {
        color: 'red',
      },
      '::-moz-placeholder': {
        color: 'red',
      },
      ':-ms-input-placeholder': {
        color: 'red',
      },
      ':-moz-placeholder': {
        color: 'red',
      },
      '::placeholder': {
        color: 'red',
      },
    })
  })
})
