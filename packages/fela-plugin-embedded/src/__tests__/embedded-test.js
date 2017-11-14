import { createRenderer } from 'fela'
import embedded from '../index'

import renderToString from '../../../fela-tools/src/renderToString'

describe('Embedded plugin', () => {
  it('should render inline keyframes & fonts', () => {
    const rule = () => ({
      color: 'red',
      animationName: {
        '0%': {
          color: 'red'
        },
        '100%': {
          color: 'blue'
        }
      },
      fontFace: {
        fontFamily: 'Arial',
        src: ['foo.svg', 'bar.ttf'],
        fontWeight: 500
      }
    })

    const renderer = createRenderer({
      plugins: [embedded()]
    })
    renderer.renderRule(rule)

    expect(renderToString(renderer)).toEqual(
      "@font-face{font-weight:500;src:url('foo.svg') format('svg'),url('bar.ttf') format('truetype');font-family:\"Arial\"}" +
        '@-webkit-keyframes k1{0%{color:red}100%{color:blue}}@-moz-keyframes k1{0%{color:red}100%{color:blue}}@keyframes k1{0%{color:red}100%{color:blue}}' +
        '.a{color:red}.b{animation-name:k1}.c{font-family:"Arial"}'
    )
  })

  it('should render inline multiple keyframes & fonts', () => {
    const rule = () => ({
      color: 'red',
      animationName: [
        {
          '0%': {
            color: 'red'
          },
          '100%': {
            color: 'blue'
          }
        },
        {
          '0%': {
            backgroundColor: 'red'
          },
          '100%': {
            backgroundColor: 'blue'
          }
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

    const renderer = createRenderer({
      plugins: [embedded()]
    })
    renderer.renderRule(rule)

    expect(renderToString(renderer)).toEqual(
      "@font-face{font-weight:500;src:url('foo.svg') format('svg'),url('bar.ttf') format('truetype');font-family:\"Arial\"}@font-face{font-weight:400;src:url('baz.svg') format('svg'),url('asd.ttf') format('truetype');font-family:\"Lato Light\"}" +
        '@-webkit-keyframes k1{0%{color:red}100%{color:blue}}@-moz-keyframes k1{0%{color:red}100%{color:blue}}@keyframes k1{0%{color:red}100%{color:blue}}@-webkit-keyframes k2{0%{background-color:red}100%{background-color:blue}}@-moz-keyframes k2{0%{background-color:red}100%{background-color:blue}}@keyframes k2{0%{background-color:red}100%{background-color:blue}}' +
        '.a{color:red}.b{animation-name:k1,k2}.c{font-family:"Arial","Lato Light"}'
    )
  })

  it('should render nested inline keyframes & fonts', () => {
    const rule = () => ({
      color: 'red',
      ':hover': {
        animationName: {
          '0%': {
            color: 'red'
          },
          '100%': {
            color: 'blue'
          }
        },
        fontFace: {
          fontFamily: 'Arial',
          src: ['foo.svg', 'bar.ttf'],
          fontWeight: 500
        }
      }
    })

    const renderer = createRenderer({
      plugins: [embedded()]
    })
    renderer.renderRule(rule)

    expect(renderToString(renderer)).toEqual(
      "@font-face{font-weight:500;src:url('foo.svg') format('svg'),url('bar.ttf') format('truetype');font-family:\"Arial\"}" +
        '@-webkit-keyframes k1{0%{color:red}100%{color:blue}}@-moz-keyframes k1{0%{color:red}100%{color:blue}}@keyframes k1{0%{color:red}100%{color:blue}}' +
        '.a{color:red}.b:hover{animation-name:k1}.c:hover{font-family:"Arial"}'
    )
  })

  it('should render inline fonts with same fontFamily', () => {
    const rule = () => ({
      color: 'red',
      fontFace: [
        {
          fontFamily: 'Arial',
          src: ['arial-regular.svg', 'arial-regular.ttf'],
          fontWeight: 400
        },
        {
          fontFamily: 'Arial',
          src: ['arial-bold.svg', 'arial-bold.ttf'],
          fontWeight: 700
        }
      ]
    })

    const renderer = createRenderer({
      plugins: [embedded()]
    })
    renderer.renderRule(rule)

    expect(renderToString(renderer)).toBe(
      "@font-face{font-weight:400;src:url('arial-regular.svg') format('svg'),url('arial-regular.ttf') format('truetype');font-family:\"Arial\"}@font-face{font-weight:700;src:url('arial-bold.svg') format('svg'),url('arial-bold.ttf') format('truetype');font-family:\"Arial\"}.a{color:red}.b{font-family:\"Arial\"}"
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
    const renderer = createRenderer({
      plugins: [embedded()]
    })
    renderer.renderRule(rule)
    expect(renderToString(renderer)).toEqual(
      '@font-face{font-weight:500;src:url(data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAHwwABMAAAAA4I) format(\'woff\');font-family:"foo"}' +
        '.a{font-family:"foo"}'
    )
  })
})
