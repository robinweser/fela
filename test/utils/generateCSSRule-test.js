import generateCSSRule from '../../modules/utils/generateCSSRule'

describe('Generating css rules', () => {
  it('should return a valid css rule', () => {
    expect(generateCSSRule('.foo', 'color:red')).to.eql('.foo{color:red}')
  })
})
