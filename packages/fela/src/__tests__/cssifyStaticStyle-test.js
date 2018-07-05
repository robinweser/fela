import cssifyStaticStyle from '../cssifyStaticStyle'

import createRenderer from '../createRenderer'

describe('Cssifying static css declarations', () => {
  it('should return the minified style string', () => {
    expect(cssifyStaticStyle('.foo{color:red}')).toEqual('.foo{color:red}')
    expect(
      cssifyStaticStyle(
        `
      .foo {
        color: red
      }
      `
      )
    ).toEqual('.foo {color: red}')
  })

  it('should cssify the static style', () => {
    expect(
      cssifyStaticStyle(
        {
          color: 'red',
          WebkitTransitionDuration: 3,
        },
        createRenderer()
      )
    ).toEqual('color:red;-webkit-transition-duration:3')
  })
})
