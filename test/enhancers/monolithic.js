import createRenderer from '../../modules/createRenderer'
import monolithic from '../../modules/enhancers/monolithic'

const options = { enhancers: [ monolithic() ] }

describe('Monolithic enhancer', () => {
  it('should add a cache entry', () => {
    const rule = props => ({ color: 'red' })
    const renderer = createRenderer(options)

    const className = renderer.renderRule(rule)

    expect(renderer.cache.hasOwnProperty(className)).to.eql(true)
  })

  it('should reuse classNames', () => {
    const rule = props => ({ color: props.color, fontSize: '23px' })
    const renderer = createRenderer(options)

    const className1 = renderer.renderRule(rule, { color: 'red' })
    const className2 = renderer.renderRule(rule, { color: 'red' })

    expect(className1).to.eql(className2)
  })

  it('should return an empty string if the style is empty', () => {
    const rule = props => ({ })
    const renderer = createRenderer(options)

    const className = renderer.renderRule(rule)

    expect(className).to.eql('')
  })

  it('should remove undefined values', () => {
    const rule = props => ({ color: props.color, fontSize: '15px' })
    const renderer = createRenderer(options)

    const className = renderer.renderRule(rule)

    expect(renderer.rules).to.eql(`.${className}{font-size:15px}`)
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

    expect(renderer.rules).to.eql(`.${className}{color:red;font-size:15}`)
  })

  it('should render pseudo classes', () => {
    const rule = props => ({
      color: 'red',
      ':hover': {
        color: 'blue'
      }
    })

    const renderer = createRenderer(options)
    const className = renderer.renderRule(rule)

    expect(renderer.rules).to.eql(`.${className}{color:red}.${className}:hover{color:blue}`)
  })

  it('should prefix classNames', () => {
    const rule = props => ({ color: 'red' })

    const renderer = createRenderer({ selectorPrefix: 'fela_' })
    const className = renderer.renderRule(rule)

    expect(renderer.rules).to.eql(`.${className}{color:red}`)
    expect(className).to.contain('fela_')
  })

  it('should render attribute selectors', () => {
    const rule = props => ({
      color: 'red',
      '[bool=true]': {
        color: 'blue'
      }
    })
    const renderer = createRenderer(options)

    const className = renderer.renderRule(rule)

    expect(renderer.rules).to.eql(`.${className}{color:red}.${className}[bool=true]{color:blue}`)
  })

  it('should render child selectors', () => {
    const rule = props => ({
      color: 'red',
      '>div': {
        color: 'blue'
      }
    })
    const renderer = createRenderer(options)

    const className = renderer.renderRule(rule)

    expect(renderer.rules).to.eql(`.${className}{color:red}.${className}>div{color:blue}`)

  })

  it('should render any nested selector with the &-prefix', () => {
    const rule = props => ({
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

    expect(renderer.rules).to.eql(`.${className}{color:red}.${className}~#foo{color:blue}.${className} .bar{color:green}`)
  })

  it('should render media queries', () => {
    const rule = props => ({
      color: 'red',
      '@media (min-height:300px)': {
        color: 'blue'
      }
    })

    const renderer = createRenderer(options)
    const className = renderer.renderRule(rule)

    expect(renderer.rules).to.eql(`.${className}{color:red}`)
    expect(renderer.mediaRules['(min-height:300px)']).to.eql(`.${className}{color:blue}`)
  })
})
