import cssifyMediaQueryRules from '../cssifyMediaQueryRules'

describe('Cssifying media query rules', () => {
  it('should generate a valid CSS string', () => {
    expect(cssifyMediaQueryRules('(min-height: 300px)', 'color:red')).toEqual(
      '@media (min-height: 300px){color:red}'
    )
  })
})
