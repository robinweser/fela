import LVHA from '../../modules/plugins/LVHA'

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

    expect(LVHA()(setting)).to.eql({
      ':link': {},
      ':visited': {},
      ':hover': {},
      ':focus': {},
      ':active': {},
      ':first-child': {}
    })
  })
})
