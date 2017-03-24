import mapValueToMediaQuery from '../mapValueToMediaQuery'

describe('Mapping values to media queries', () => {
  it('should generate valid media queries', () => {
    const rule = props => ({
      color: 'blue',
      ...mapValueToMediaQuery(props.sizes, value => ({ fontSize: `${value}px` }))
    })

    const style = rule({
      sizes: {
        '@media (min-width: 300px)': 12,
        '@media (min-width: 480px)': 14
      }
    })
    expect(style).toEqual({
      color: 'blue',
      '@media (min-width: 300px)': { fontSize: '12px' },
      '@media (min-width: 480px)': { fontSize: '14px' }
    })
  })

  it('should generate valid media queries using the shortcut property', () => {
    const rule = props => ({
      color: 'blue',
      ...mapValueToMediaQuery(props.colors, 'color')
    })

    const style = rule({
      colors: {
        '@media (min-width: 300px)': 'red',
        '@media (min-width: 480px)': 'green'
      }
    })
    expect(style).toEqual({
      color: 'blue',
      '@media (min-width: 300px)': { color: 'red' },
      '@media (min-width: 480px)': { color: 'green' }
    })
  })
})
