import cssifyMediaQueryRules from '../../modules/utils/cssifyMediaQueryRules'

describe('Cssifying media query rules', () => {
  it('should generate a valid CSS string', () => {
    expect(cssifyMediaQueryRules('(min-height: 300px)', 'color:red')).to.eql('@media (min-height: 300px){color:red}')
  })
})
