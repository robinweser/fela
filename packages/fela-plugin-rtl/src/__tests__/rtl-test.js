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

  it('should respect the default direction', () => {
    const style = {
      paddingLeft: 20,
      ':hover': {
        marginRight: '25px',
      },
    }

    expect(rtl('ltr')(style)).toEqual(style)
  })

  it('should check the theme.direction property', () => {
    const style = {
      paddingLeft: 20,
      ':hover': {
        marginRight: '25px',
      },
    }

    expect(
      rtl()(style, undefined, undefined, { theme: { direction: 'ltr' } })
    ).toEqual(style)
  })

  it('should use theme.direction over default direction', () => {
    const style = {
      paddingLeft: 20,
      ':hover': {
        marginRight: '25px',
      },
    }

    expect(
      rtl('ltr')(style, undefined, undefined, { theme: { direction: 'rtl' } })
    ).toEqual({
      paddingRight: 20,
      ':hover': {
        marginLeft: '25px',
      },
    })
  })
})
