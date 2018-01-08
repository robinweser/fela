import { createRenderer } from 'fela'
import { renderToString } from 'fela-tools'

import embedded from '../index'

describe('Embedded plugin', () => {
  it('should render inline keyframes & fonts', () => {
    const rule = () => ({
      color: 'red',
      animationName: {
        '0%': {
          color: 'red',
        },
        '100%': {
          color: 'blue',
        },
      },
      fontFace: {
        fontFamily: 'Arial',
        src: ['foo.svg', 'bar.ttf'],
        fontWeight: 500,
      },
    })

    const renderer = createRenderer({
      plugins: [embedded()],
    })
    renderer.renderRule(rule)

    expect(renderToString(renderer)).toMatchSnapshot()
  })

  it('should render inline multiple keyframes & fonts', () => {
    const rule = () => ({
      color: 'red',
      animationName: [
        {
          '0%': {
            color: 'red',
          },
          '100%': {
            color: 'blue',
          },
        },
        {
          '0%': {
            backgroundColor: 'red',
          },
          '100%': {
            backgroundColor: 'blue',
          },
        },
      ],
      fontFace: [
        {
          fontFamily: 'Arial',
          src: ['foo.svg', 'bar.ttf'],
          fontWeight: 500,
        },
        {
          fontFamily: 'Lato Light',
          src: ['baz.svg', 'asd.ttf'],
          fontWeight: 400,
        },
      ],
    })

    const renderer = createRenderer({
      plugins: [embedded()],
    })
    renderer.renderRule(rule)

    expect(renderToString(renderer)).toMatchSnapshot()
  })

  it('should render nested inline keyframes & fonts', () => {
    const rule = () => ({
      color: 'red',
      ':hover': {
        animationName: {
          '0%': {
            color: 'red',
          },
          '100%': {
            color: 'blue',
          },
        },
        fontFace: {
          fontFamily: 'Arial',
          src: ['foo.svg', 'bar.ttf'],
          fontWeight: 500,
        },
      },
    })

    const renderer = createRenderer({
      plugins: [embedded()],
    })
    renderer.renderRule(rule)

    expect(renderToString(renderer)).toMatchSnapshot()
  })

  it('should render inline fonts with same fontFamily', () => {
    const rule = () => ({
      color: 'red',
      fontFace: [
        {
          fontFamily: 'Arial',
          src: ['arial-regular.svg', 'arial-regular.ttf'],
          fontWeight: 400,
        },
        {
          fontFamily: 'Arial',
          src: ['arial-bold.svg', 'arial-bold.ttf'],
          fontWeight: 700,
        },
      ],
    })

    const renderer = createRenderer({
      plugins: [embedded()],
    })
    renderer.renderRule(rule)

    expect(renderToString(renderer)).toMatchSnapshot()
  })

  it('should render base64 fonts', () => {
    const rule = () => ({
      fontFace: {
        fontFamily: 'foo',
        src: [
          'data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAHwwABMAAAAA4I',
        ],
        fontWeight: 500,
      },
    })
    const renderer = createRenderer({
      plugins: [embedded()],
    })
    renderer.renderRule(rule)
    expect(renderToString(renderer)).toMatchSnapshot()
  })
})
