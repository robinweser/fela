import minifyCSSString from '../minifyCSSString'

describe('Minifying CSS strings', () => {
  it('should return a minified CSS string', () => {
    expect(minifyCSSString('.foo{color:bar}')).toEqual('.foo{color:bar}')
    expect(
      minifyCSSString(
        `
   .foo {
      color: bar
   }

   .baz {
     font-size: 12px
   }
      `
      )
    ).toEqual('.foo {color: bar}.baz {font-size: 12px}')
  })
})
