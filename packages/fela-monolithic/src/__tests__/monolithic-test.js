import { createRenderer } from 'fela'
import monolithic from '../index'

import renderToString from '../../../fela-tools/src/renderToString'

const options = {
  enhancers: [monolithic()]
}

describe('Monolithic enhancer', () => {
  it('should add a cache entry', () => {
    const rule = () => ({
      color: 'red'
    })
    const renderer = createRenderer(options)

    const className = renderer.renderRule(rule)

    expect(renderer.cache.hasOwnProperty(`.${className}`)).toEqual(true)
  })

  it('should reuse classNames', () => {
    const rule = props => ({
      color: props.color,
      fontSize: '23px'
    })
    const renderer = createRenderer(options)

    const className1 = renderer.renderRule(rule, {
      color: 'red'
    })
    const className2 = renderer.renderRule(rule, {
      color: 'red'
    })

    expect(className1).toEqual(className2)
  })

  it('should return an empty string if the style is empty', () => {
    const rule = () => ({})
    const renderer = createRenderer(options)

    const className = renderer.renderRule(rule)

    expect(className).toEqual('')
  })

  it('should remove undefined values', () => {
    const rule = props => ({
      color: props.color,
      fontSize: '15px'
    })
    const renderer = createRenderer(options)

    const className = renderer.renderRule(rule)

    expect(renderToString(renderer)).toEqual(`.${className}{font-size:15px}`)
  })

  it('should allow nested props', () => {
    const rule = props => ({
      color: props.theme.color,
      fontSize: 15
    })
    const renderer = createRenderer(options)

    const className = renderer.renderRule(rule, {
      theme: {
        color: 'red'
      }
    })

    expect(renderToString(renderer)).toEqual(
      `.${className}{color:red;font-size:15}`
    )
  })

  it('should render pseudo classes', () => {
    const rule = () => ({
      color: 'red',
      ':hover': {
        color: 'blue'
      }
    })

    const renderer = createRenderer(options)
    const className = renderer.renderRule(rule)

    expect(renderToString(renderer)).toEqual(
      `.${className}:hover{color:blue}.${className}{color:red}`
    )
  })

  it('should prefix classNames', () => {
    const rule = () => ({
      color: 'red'
    })

    const renderer = createRenderer({
      selectorPrefix: 'fela_'
    })
    const className = renderer.renderRule(rule)

    expect(renderToString(renderer)).toEqual(`.${className}{color:red}`)
    expect(className).toContain('fela_')
  })

  it('should render attribute selectors', () => {
    const rule = () => ({
      color: 'red',
      '[bool=true]': {
        color: 'blue'
      }
    })
    const renderer = createRenderer(options)

    const className = renderer.renderRule(rule)

    expect(renderToString(renderer)).toEqual(
      `.${className}[bool=true]{color:blue}.${className}{color:red}`
    )
  })

  it('should render child selectors', () => {
    const rule = () => ({
      color: 'red',
      '>div': {
        color: 'blue'
      }
    })
    const renderer = createRenderer(options)

    const className = renderer.renderRule(rule)

    expect(renderToString(renderer)).toEqual(
      `.${className}>div{color:blue}.${className}{color:red}`
    )
  })

  it('should render any nested selector with the &-prefix', () => {
    const rule = () => ({
      color: 'red',
      '&~#foo': {
        color: 'blue'
      },
      '& .bar': {
        color: 'green'
      }
    })
    const renderer = createRenderer(options)

    const className = renderer.renderRule(rule)

    expect(renderToString(renderer)).toEqual(
      `.${className}~#foo{color:blue}.${className} .bar{color:green}.${className}{color:red}`
    )
  })

  it('should render media queries', () => {
    const rule = () => ({
      color: 'red',
      '@media (min-height:300px)': {
        color: 'blue'
      }
    })

    const renderer = createRenderer(options)
    const className = renderer.renderRule(rule)

    expect(renderToString(renderer)).toEqual(
      `.${className}{color:red}@media (min-height:300px){.${className}{color:blue}}`
    )
  })

  it('should use custom className if defined', () => {
    const rule = () => ({
      className: 'custom',
      color: 'red'
    })

    const renderer = createRenderer(options)
    renderer.renderRule(rule)

    expect(renderToString(renderer)).toEqual('.custom{color:red}')
  })

  it('should generate pretty selectors', () => {
    const colorRed = () => ({
      color: 'red'
    })

    const renderer = createRenderer({
      enhancers: [
        monolithic({
          prettySelectors: true
        })
      ]
    })
    renderer.renderRule(colorRed)

    expect(renderToString(renderer)).toEqual('.colorRed_137u7ef{color:red}')
  })

  it('should generate pretty selectors using ruleName if defined', () => {
    const colorRed = () => ({
      color: 'red'
    })

    colorRed.ruleName = 'redColor'

    const renderer = createRenderer({
      enhancers: [
        monolithic({
          prettySelectors: true
        })
      ]
    })
    renderer.renderRule(colorRed)

    expect(renderToString(renderer)).toContain('redColor')
  })
})
