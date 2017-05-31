import LVHA from '../index'

describe('LVHA plugin', () => {
  it('should sort pseudo classes correctly', () => {
    const setting = {
      ':hover': {},
      ':focus': {},
      ':link': {},
      ':first-child': {},
      ':active': {},
      ':visited': {}
    }

    expect(LVHA()(setting)).toEqual({
      ':link': {},
      ':visited': {},
      ':hover': {},
      ':focus': {},
      ':active': {},
      ':first-child': {}
    })
  })
})
