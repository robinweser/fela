import generateRule from '../generateRule'

describe('Generating rules', () => {
  it('should generate a plain css rule', () => {
    expect(generateRule('.b', 'color:red')).toEqual('.b{color:red}')
  })

  it('should generate a @supports css rule', () => {
    expect(generateRule('.b', 'color:red', '(display:flex)')).toEqual(
      '@supports (display:flex){.b{color:red}}'
    )
  })
})
