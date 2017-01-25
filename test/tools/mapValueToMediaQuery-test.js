import mapValueToMediaQuery from '../../modules/tools/mapValueToMediaQuery'

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
    expect(
      style
    ).to.eql({
      color: 'blue',
      '@media (min-width: 300px)': { fontSize: '12px' },
      '@media (min-width: 480px)': { fontSize: '14px' }
    })
  })
})
