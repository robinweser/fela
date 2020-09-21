import themeValue from '../index'

const theme = {
  colors: {
    foreground: {
      primary: 'red',
      secondary: 'blue',
    },
    background: {
      primary: 'black',
      secondary: 'white',
    },
  },
  fonts: {
    text: 'Helvetica Neue, Arial, sans-serif',
    heading: 'Impact, serif',
  },
}

describe('Theme value plugin', () => {
  it('should resolve theme values', () => {
    const themeMapping = {
      color: t => t.colors,
      backgroundColor: t => t.colors,
      fontFamily: t => t.fonts,
    }

    const style = {
      color: 'foreground.primary',
      backgroundColor: 'background.secondary',
      fontFamily: 'heading',
    }

    expect(
      themeValue(themeMapping)(style, undefined, undefined, { theme })
    ).toEqual({
      color: 'red',
      backgroundColor: 'white',
      fontFamily: 'Impact, serif',
    })
  })

  it('should fallback to strings if no value is found', () => {
    const themeMapping = {
      color: t => t.colors,
      backgroundColor: t => t.colors,
      fontFamily: t => t.fonts,
    }

    const style = {
      color: 'yellow',
      backgroundColor: 'background.secondary',
      fontFamily: 'Arial',
    }

    expect(
      themeValue(themeMapping)(style, undefined, undefined, { theme })
    ).toEqual({
      color: 'yellow',
      backgroundColor: 'white',
      fontFamily: 'Arial',
    })
  })
})
