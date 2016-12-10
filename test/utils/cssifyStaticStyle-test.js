import cssifyStaticStyle from '../../modules/utils/cssifyStaticStyle'

describe('Cssifying static css declarations', () => {
  it('should return the minified style string', () => {
    expect(cssifyStaticStyle('.foo{color:red}')).to.eql('.foo{color:red}')
    expect(cssifyStaticStyle(`
      .foo {
        color: red
      }
      `)).to.eql('.foo {color: red}')
  })

  it('should cssify the static style', () => {
    expect(cssifyStaticStyle({
      color: 'red',
      WebkitTransitionDuration: 3
    }, [ ])).to.eql('color:red;-webkit-transition-duration:3')
  })
})
