import minifyCSSString from '../../modules/utils/minifyCSSString'

describe('Minifying CSS strings', () => {
  it('should return a minified CSS string', () => {
    expect(minifyCSSString('.foo{color:bar}')).to.eql('.foo{color:bar}')
    expect(minifyCSSString(`
   .foo {
      color: bar
   }

   .baz {
     font-size: 12px
   }
      `)).to.eql('.foo {color: bar}.baz {font-size: 12px}')
  })
})
