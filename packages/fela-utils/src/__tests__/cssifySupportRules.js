import cssifySupportRules from '../cssifySupportRules'

describe('Cssifying @supports rules', () => {
  it('should output a single CSS string', () => {
    expect(
      cssifySupportRules({
        '(display: flex)': '.a{color:red}.b{color:blue}',
        '(display: grid)': '.c{color:blue}',
      })
    ).toEqual(
      '@supports (display: flex){.a{color:red}.b{color:blue}}@supports (display: grid){.c{color:blue}}'
    )
  })
})
