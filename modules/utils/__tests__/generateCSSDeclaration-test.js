import generateCSSDeclaration from '../generateCSSDeclaration'

describe('Generating css declarations', () => {
  it('should return a valid css declaration', () => {
    expect(generateCSSDeclaration('width', '300px')).toEqual('width:300px')
    expect(generateCSSDeclaration('WebkitFlex', '1')).toEqual('-webkit-flex:1')
    expect(generateCSSDeclaration('msTransitionDuration', '3s')).toEqual('-ms-transition-duration:3s')
  })
})
