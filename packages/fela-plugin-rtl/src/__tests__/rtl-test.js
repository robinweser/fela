import rtl from '../index'

describe('RTL plugin', () => {
  it('should transform styles', () => {
    const style = {
      paddingLeft: 20,
      ':hover': {
        marginRight: '25px',
      },
    }

    expect(rtl()(style)).toEqual({
      paddingRight: 20,
      ':hover': {
        marginLeft: '25px',
      },
    })
  })
})
