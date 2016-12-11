import generateCSSDeclaration from '../../modules/utils/generateCSSDeclaration'

describe('Generating css declarations', () => {
  it('should return a valid css declaration', () => {
    expect(generateCSSDeclaration('width', '300px')).to.eql('width:300px')
    expect(generateCSSDeclaration('WebkitFlex', '1')).to.eql('-webkit-flex:1')
    expect(generateCSSDeclaration('msTransitionDuration', '3s')).to.eql('-ms-transition-duration:3s')
  })
})
