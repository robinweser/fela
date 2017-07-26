import { createRenderer } from 'fela'
import embedded from '../index'

describe('Embedded plugin', () => {
  it('should render inline keyframes & fonts', () => {
    const rule = () => ({
      color: 'red',
      animationName: {
        '0%': { color: 'red' },
        '100%': { color: 'blue' }
      },
      fontFace: {
        fontFamily: 'Arial',
        src: ['foo.svg', 'bar.ttf'],
        fontWeight: 500
      }
    })

    const renderer = createRenderer({ plugins: [embedded()] })
    renderer.renderRule(rule)

    expect(renderer.rules).toEqual(
      '.a{color:red}.b{animation-name:k1}.c{font-family:"Arial"}'
    )
    expect(renderer.keyframes).toEqual(
      '@-webkit-keyframes k1{0%{color:red}100%{color:blue}}@-moz-keyframes k1{0%{color:red}100%{color:blue}}@keyframes k1{0%{color:red}100%{color:blue}}'
    )
    expect(renderer.fontFaces).toEqual(
      "@font-face{font-weight:500;src:url('foo.svg') format('svg'),url('bar.ttf') format('truetype');font-family:\"Arial\"}"
    )
  })

  it('should render inline multiple keyframes & fonts', () => {
    const rule = () => ({
      color: 'red',
      animationName: [
        {
          '0%': { color: 'red' },
          '100%': { color: 'blue' }
        },
        {
          '0%': { backgroundColor: 'red' },
          '100%': { backgroundColor: 'blue' }
        }
      ],
      fontFace: [
        {
          fontFamily: 'Arial',
          src: ['foo.svg', 'bar.ttf'],
          fontWeight: 500
        },
        {
          fontFamily: 'Lato Light',
          src: ['baz.svg', 'asd.ttf'],
          fontWeight: 400
        }
      ]
    })

    const renderer = createRenderer({ plugins: [embedded()] })
    renderer.renderRule(rule)

    expect(renderer.rules).toEqual(
      '.a{color:red}.b{animation-name:k1,k2}.c{font-family:"Arial","Lato Light"}'
    )
    expect(renderer.keyframes).toEqual(
      '@-webkit-keyframes k1{0%{color:red}100%{color:blue}}@-moz-keyframes k1{0%{color:red}100%{color:blue}}@keyframes k1{0%{color:red}100%{color:blue}}@-webkit-keyframes k2{0%{background-color:red}100%{background-color:blue}}@-moz-keyframes k2{0%{background-color:red}100%{background-color:blue}}@keyframes k2{0%{background-color:red}100%{background-color:blue}}'
    )
    expect(renderer.fontFaces).toEqual(
      "@font-face{font-weight:500;src:url('foo.svg') format('svg'),url('bar.ttf') format('truetype');font-family:\"Arial\"}@font-face{font-weight:400;src:url('baz.svg') format('svg'),url('asd.ttf') format('truetype');font-family:\"Lato Light\"}"
    )
  })

  it('should render nested inline keyframes & fonts', () => {
    const rule = () => ({
      color: 'red',
      ':hover': {
        animationName: {
          '0%': { color: 'red' },
          '100%': { color: 'blue' }
        },
        fontFace: {
          fontFamily: 'Arial',
          src: ['foo.svg', 'bar.ttf'],
          fontWeight: 500
        }
      }
    })

    const renderer = createRenderer({ plugins: [embedded()] })
    renderer.renderRule(rule)

    expect(renderer.rules).toEqual(
      '.a{color:red}.b:hover{animation-name:k1}.c:hover{font-family:"Arial"}'
    )
    expect(renderer.keyframes).toEqual(
      '@-webkit-keyframes k1{0%{color:red}100%{color:blue}}@-moz-keyframes k1{0%{color:red}100%{color:blue}}@keyframes k1{0%{color:red}100%{color:blue}}'
    )
    expect(renderer.fontFaces).toEqual(
      "@font-face{font-weight:500;src:url('foo.svg') format('svg'),url('bar.ttf') format('truetype');font-family:\"Arial\"}"
    )
  })

  it('should render base64 fonts', () => {
    const rule = () => ({
      fontFace: {
        fontFamily: 'foo',
        src: [
          'data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAHwwABMAAAAA4I'
        ],
        fontWeight: 500
      }
    })
    const renderer = createRenderer({ plugins: [embedded()] })
    renderer.renderRule(rule)
    expect(renderer.rules).toEqual('.a{font-family:"foo"}')
    expect(renderer.fontFaces).toEqual(
      '@font-face{font-weight:500;src:url(data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAHwwABMAAAAA4I) format(\'woff\');font-family:"foo"}'
    )
  })
})
