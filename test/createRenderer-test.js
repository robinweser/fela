import createRenderer from '../modules/createRenderer'

describe('Renderer', () => {
  describe('Instantiating a new Renderer', () => {
    it('should add caches for all styles', () => {
      const renderer = createRenderer()

      expect(renderer.rules).to.eql('')
      expect(renderer.mediaRules).to.eql({ })
      expect(renderer.keyframes).to.eql('')
      expect(renderer.fontFaces).to.eql('')
      expect(renderer.statics).to.eql('')
    })

    it('should apply enhancers directly', () => {
      const enhancer = renderer => {
        renderer.foo = 'bar'
        return renderer
      }
      const renderer = createRenderer({ enhancers: [ enhancer ] })

      expect(renderer.foo).to.eql('bar')
    })
  })


  describe('Clearing a Renderer', () => {
    it('should reset all caches', () => {
      const renderer = createRenderer()
      const rule = props => ({ color: 'red' })

      renderer.renderRule(rule)
      renderer.clear()

      expect(renderer.rules).to.eql('')
      expect(renderer.mediaRules).to.eql({ })
      expect(renderer.keyframes).to.eql('')
      expect(renderer.fontFaces).to.eql('')
      expect(renderer.statics).to.eql('')
      expect(renderer.ids).to.eql([ ])
    })
  })


  describe('Rendering rules', () => {
    it('should add a cache entry', () => {
      const rule = props => ({ color: 'red' })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule)

      expect(renderer.rendered.hasOwnProperty(className)).to.eql(true)
    })

    it('should add a media cache entry for each media', () => {
      const rule = props => ({
        color: 'red',
        '@media screen': {
          color: 'blue'
        },
        '@media min-height: 300px': {
          color: 'yellow'
        }
      })

      const anotherRule = props => ({
        color: 'blue',
        '@media min-height: 300px': {
          color: 'red'
        }
      })

      const renderer = createRenderer()

      const className1 = renderer.renderRule(rule)
      const className2 = renderer.renderRule(anotherRule)

      expect(renderer.mediaRules.hasOwnProperty('screen')).to.eql(true)
      expect(renderer.mediaRules.hasOwnProperty('min-height: 300px')).to.eql(true)
      expect(renderer.rendered.hasOwnProperty(className1)).to.eql(true)
      expect(renderer.rendered.hasOwnProperty(className2)).to.eql(true)
    })

    it('should reuse cached variations', () => {
      const rule = props => ({ color: props.color, fontSize: '23px' })
      const renderer = createRenderer()

      renderer.renderRule(rule, { color: 'red' })
      renderer.renderRule(rule, { color: 'red' })
      renderer.renderRule(rule, { color: 'blue' })

      expect(Object.keys(renderer.rendered).length).to.eql(3)
    })

    it('should reuse static style', () => {
      const rule = props => ({ fontSize: '23px' })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule, { color: 'red' })
      const className2 = renderer.renderRule(rule, { color: 'red' })
      const className3 = renderer.renderRule(rule, { color: 'blue' })

      expect(className).to.eql(className2)
      expect(className).to.eql(className3)
      expect(renderer.rules).to.eql('.c0{font-size:23px}')
      expect(Object.keys(renderer.rendered).length).to.eql(3)
    })

    it('should only additionally render static styles if not directly rendering those', () => {
      const rule = props => ({ fontSize: '23px' })
      const renderer = createRenderer()
      const spy = sinon.spy()

      const existingRenderRule = renderer.renderRule.bind(this)
      renderer.renderRule = (rule, props) => {
        spy()
        return existingRenderRule(rule, props)
      }

      renderer.renderRule(rule)

      expect(spy).to.have.been.calledOnce
    })

    it('should generate an incrementing reference id', () => {
      const rule = props => ({ color: 'red' })
      const rule2 = props => ({ color: 'blue' })
      const renderer = createRenderer()

      renderer.renderRule(rule)
      renderer.renderRule(rule2)

      expect(renderer.ids.indexOf(rule)).to.be.greaterThan(-1)
      expect(renderer.ids.indexOf(rule2)).to.be.greaterThan(-1)
      expect(renderer.ids.indexOf(rule2)).to.be.greaterThan(renderer.ids.indexOf(rule))
    })

    it('should always return the same className prefix', () => {
      const rule = props => ({ color: 'red', foo: props.foo })
      const renderer = createRenderer()

      const staticClassName = renderer.renderRule(rule)
      const dynamicClassName = renderer.renderRule(rule, {
        foo: 'bar'
      })
      expect(staticClassName).to.not.eql(dynamicClassName)
      expect(staticClassName.substr(0, 2)).to.eql(dynamicClassName.substr(0, 2))
    })

    it('should keep base styles as an object for diffing', () => {
      const rule = props => ({ color: 'red' })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule)

      expect(renderer.base[renderer.ids.indexOf(rule)]).to.eql({
        color: 'red'
      })
    })

    it('should render pseudo classes', () => {
      const rule = props => ({
        color: 'red',
        ':hover': {
          color: 'blue'
        }
      })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule)

      expect(renderer.rules).to.eql('.c0:hover{color:blue}.c0{color:red}')
    })

    it('should render media queries', () => {
      const rule = props => ({
        color: 'red',
        '@media (min-height:300px)': {
          color: 'blue'
        }
      })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule)

      expect(renderer.rules).to.eql('.c0{color:red}')
      expect(renderer.mediaRules['(min-height:300px)']).to.eql('.c0{color:blue}')
    })
  })


  describe('Rendering keyframes', () => {
    it('should add a cache entry', () => {
      const keyframe = props => ({
        from: {
          color: 'red'
        },
        to: {
          color: 'blue'
        }
      })

      const renderer = createRenderer()

      const animationName = renderer.renderKeyframe(keyframe)

      expect(renderer.rendered.hasOwnProperty(animationName)).to.eql(true)
    })

    it('should return a valid animation name', () => {
      const keyframe = props => ({
        from: {
          color: 'red'
        },
        to: {
          color: 'blue'
        }
      })
      const renderer = createRenderer()

      const animationName = renderer.renderKeyframe(keyframe)

      expect(animationName).to.eql('k0')
    })

    it('should render dynamic keyframe variations', () => {
      const keyframe = props => ({
        from: {
          color: props.color
        },
        to: {
          color: 'blue'
        }
      })
      const renderer = createRenderer()

      const animationName = renderer.renderKeyframe(keyframe, {
        color: 'red'
      })

      expect(animationName).to.eql('k0--aedinm')
      expect(renderer.keyframes).to.eql('@-webkit-keyframes k0--aedinm{from{color:red}to{color:blue}}@-moz-keyframes k0--aedinm{from{color:red}to{color:blue}}@keyframes k0--aedinm{from{color:red}to{color:blue}}')
    })
  })


  describe('Rendering static styles', () => {
    it('should cache the style and return the rendered markup', () => {
      const renderer = createRenderer()

      const staticStyle = '*{color:red;margin:0}'
      renderer.renderStatic(staticStyle)

      expect(renderer.rendered.hasOwnProperty(staticStyle)).to.eql(true)
      expect(renderer.statics).to.eql(staticStyle)
    })

    it('should render a flat object of static selectors', () => {
      const renderer = createRenderer()

      const staticStyle = { margin: 0, fontSize: '12px' }

      renderer.renderStatic(staticStyle, 'html,body')
      expect(renderer.rendered.hasOwnProperty('html,bodyfontSize12pxmargin0')).to.eql(true)
      expect(renderer.statics).to.eql('html,body{margin:0;font-size:12px}')
    })

    it('should allow multiple static styles for a single selector', () => {
      const renderer = createRenderer()

      renderer.renderStatic({ margin: 0, fontSize: '12px' }, 'html,body')
      renderer.renderStatic({ color: 'red' }, 'html,body')
      expect(renderer.rendered.hasOwnProperty('html,bodyfontSize12pxmargin0')).to.eql(true)
      expect(renderer.rendered.hasOwnProperty('html,bodycolorred')).to.eql(true)
      expect(renderer.statics).to.eql('html,body{margin:0;font-size:12px}html,body{color:red}')
    })
  })


  describe('Rendering Fonts', () => {
    it('should cache the font-face', () => {
      const renderer = createRenderer()

      const family = renderer.renderFont('Arial', [ '../fonts/Arial.ttf', '../fonts/Arial.woff' ], {
        fontWeight: 300
      })

      expect(renderer.rendered.hasOwnProperty(family)).to.eql(true)
    })

    it('should return the font family', () => {
      const renderer = createRenderer()

      const family = renderer.renderFont('Arial', [ '../fonts/Arial.ttf', '../fonts/Arial.woff' ], {
        fontWeight: 300
      })

      expect(family).to.eql('Arial')
    })
  })


  describe('Generating the props reference', () => {
    it('should always return the same className with the same props', () => {
      const renderer = createRenderer()

      const className1 = renderer._generatePropsReference('foobar')
      const className2 = renderer._generatePropsReference('foobar')
      expect(className1).to.eql(className2)
    })

    it('should sort props before', () => {
      const renderer = createRenderer()

      const className1 = renderer._generatePropsReference({
        foo: 'bar',
        fontSize: 12
      })
      const className2 = renderer._generatePropsReference({
        fontSize: 12,
        foo: 'bar'
      })
      expect(className1).to.eql(className2)
    })
  })


  describe('Subscribing to the Renderer', () => {
    it('should call the callback each time it emits changes', () => {
      const rule = props => ({
        color: 'red',
        '@media (min-height: 300px)': {
          color: 'blue'
        }
      })

      const renderer = createRenderer()
      const subscriber = sinon.spy()
      renderer.subscribe(subscriber)
      const staticClassName = renderer.renderRule(rule)

      expect(subscriber).to.have.been.calledOnce
    })

    it('should return a unsubscribe method', () => {
      const renderer = createRenderer()
      const subscriber = sinon.spy()

      const unsubscriber = renderer.subscribe(subscriber)
      unsubscriber.unsubscribe()

      expect(unsubscriber.unsubscribe).to.be.a.function
      expect(renderer.listeners.length).to.eql(0)
    })
  })


  describe('Processing style', () => {
    it('should process style using data provided via the plugin interface', () => {

      const plugin = style => ({
        ...style,
        foo: 'bar'
      })

      const renderer = createRenderer({ plugins: [ plugin ] })

      expect(renderer._processStyle({ width: 20 })).to.eql({
        width: 20,
        foo: 'bar'
      })
    })

    it('should pass meta data', () => {
      const plugin = (style, meta) => ({
        ...style,
        foo: meta.type
      })

      const renderer = createRenderer({ plugins: [ plugin ] })
      renderer.renderRule(() => ({ width: 20 }))

      expect(renderer.rules).to.eql('.c0{width:20;foo:rule}')
    })
  })

  describe('Diffing style objects', () => {
    it('should only return new/dynamic values', () => {

      const base = { color: 'blue', fontSize: '12px' }

      const style = {
        color: 'blue',
        fontSize: '12px',
        lineHeight: 1.2
      }

      const renderer = createRenderer()
      expect(renderer._diffStyle(style, base)).to.eql({
        lineHeight: 1.2
      })
    })

    it('should return modified values', () => {

      const base = { color: 'blue', fontSize: '12px' }
      const style = { color: 'red', fontSize: '12px' }

      const renderer = createRenderer()
      expect(renderer._diffStyle(style, base)).to.eql({
        color: 'red'
      })
    })

    it('should ignore additional base properties', () => {

      const base = {
        color: 'blue',
        fontSize: '12px',
        lineHeight: 1.2
      }
      const style = { color: 'red', fontSize: '12px' }

      const renderer = createRenderer()
      expect(renderer._diffStyle(style, base)).to.eql({
        color: 'red'
      })
    })

    it('should also diff nested objects', () => {
      const base = {
        color: 'blue',
        fontSize: '12px',
        ':hover': {
          color: 'red',
          lineHeight: 1.2
        }
      }
      const style = {
        color: 'red',
        fontSize: '12px',
        ':hover': {
          color: 'red',
          fontSize: '12px',
          lineHeight: 1.5
        }
      }

      const renderer = createRenderer()
      expect(renderer._diffStyle(style, base)).to.eql({
        color: 'red',
        ':hover': {
          fontSize: '12px',
          lineHeight: 1.5
        }
      })
    })

    it('should remove empty nested objects', () => {

      const base = {
        color: 'blue',
        fontSize: '12px',
        ':hover': {
          color: 'red',
          lineHeight: 1.2
        }
      }
      const style = {
        color: 'red',
        fontSize: '12px',
        ':hover': {
          color: 'red',
          lineHeight: 1.2
        }
      }

      const renderer = createRenderer()
      expect(renderer._diffStyle(style, base)).to.eql({
        color: 'red'
      })
    })

    it('should remove undefined values', () => {
      const base = { color: 'blue', fontSize: '12px' }

      const style = {
        color: 'red',
        fontSize: '12px',
        lineHeight: undefined,
        animation: 'undefined 2s infinite'
      }

      const renderer = createRenderer()
      expect(renderer._diffStyle(style, base)).to.eql({
        color: 'red'
      })
    })
  })
})
