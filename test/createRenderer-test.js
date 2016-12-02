import createRenderer from '../modules/createRenderer'
import combineRules from '../modules/combineRules'
import generateStyleHash from '../modules/utils/generateStyleHash'

describe('Renderer', () => {
  describe('Instantiating a new Renderer', () => {
    it('should add caches for all styles', () => {
      const renderer = createRenderer()

      expect(renderer.rules).to.eql('')
      expect(renderer.mediaRules).to.eql({ })
      expect(renderer.keyframes).to.eql('')
      expect(renderer.fontFaces).to.eql('')
      expect(renderer.statics).to.eql('')
      expect(renderer.callStack).to.eql([ ])
    })

    it('should apply enhancers directly', () => {
      const enhancer = renderer => {
        renderer.foo = 'bar'
        return renderer
      }
      const renderer = createRenderer({ enhancers: [ enhancer ] })

      expect(renderer.foo).to.eql('bar')
    })

    it('should prefill media queries in correct order', () => {
      const renderer = createRenderer({
        mediaQueryOrder: [ '(min-height: 300px)', '(min-height: 500px)' ]
      })

      expect(renderer.mediaRules).to.eql({
        '(min-height: 300px)': '',
        '(min-height: 500px)': ''
      })
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
      expect(renderer.callStack).to.eql([ ])
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
      expect(renderer.rules).to.eql('.c1{font-size:23px}')
      expect(Object.keys(renderer.rendered).length).to.eql(1)
    })

    it('should always render static style', () => {
      const renderer = createRenderer()

      const className = renderer.renderRule(props => ({
        fontSize: '23px',
        color: props.color
      }), { color: 'red' })
      const className2 = renderer.renderRule(props => ({
        fontSize: '23px',
        color: props.color
      }), { color: 'red' })

      expect(className).to.eql(className2)
      expect(className).to.eql('c1 c2')
      expect(renderer.rules).to.eql('.c1{font-size:23px}.c2{color:red}')
    })

    it('should return an empty string if the style is empty', () => {
      const rule = props => ({ })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule)

      expect(className).to.eql('')
    })

    it('should allow nested props', () => {
      const rule = props => ({
        color: props.theme.color,
        fontSize: 15
      })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule, {
        theme: {
          color: 'red'
        }
      })

      expect(className).to.eql('c1')
    })

    it('should accept defaultProps for static styles', () => {
      const rule = props => ({
        color: props.color,
        transition: props.duration + ' all linear',
        fontSize: 15
      })

      const renderer = createRenderer()

      const className = renderer.renderRule(rule, { }, {
        color: 'red',
        duration: 200
      })

      expect(className).to.eql('c1')
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

      expect(renderer.rules).to.eql('.c1:hover{color:blue}.c1{color:red}')
    })

    it('should render attribute selectors', () => {
      const rule = props => ({
        color: 'red',
        '[bool=true]': {
          color: 'blue'
        }
      })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule)

      expect(renderer.rules).to.eql('.c1[bool=true]{color:blue}.c1{color:red}')
    })

    it('should render child selectors', () => {
      const rule = props => ({
        color: 'red',
        '> h1': {
          color: 'blue'
        }
      })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule)

      expect(renderer.rules).to.eql('.c1> h1{color:blue}.c1{color:red}')
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

      expect(renderer.rules).to.eql('.c1{color:red}')
      expect(renderer.mediaRules['(min-height:300px)']).to.eql('.c1{color:blue}')
    })

    it('should name classes after their rule when prettySelectors is true', () => {
      const nicelyNamedRule = props => ({ color: 'red' })

      process.env.NODE_ENV = 'development'

      const renderer = createRenderer({ prettySelectors: true })

      const className = renderer.renderRule(nicelyNamedRule)

      expect(className).to.eql('nicelyNamedRule__c1')
    })

    it('should name classes correctly when the rule name cannot be inferred', () => {
      const renderer = createRenderer({ prettySelectors: true })

      process.env.NODE_ENV = 'development'

      const className = renderer.renderRule(() => ({ color: 'red' }))

      expect(className).to.eql('c1')
    })

    it('should name classes correctly when rules are combined', () => {
      const renderer = createRenderer({ prettySelectors: true })

      const rule1 = props => ({ color: 'red' })
      const rule2 = props => ({ fontSize: 'green' })

      const rule = combineRules(rule1, rule2)

      process.env.NODE_ENV = 'development'

      const className = renderer.renderRule(rule)

      expect(className).to.eql('combined__c1')
    })

    it('should not name classes after their rule when prettySelectors is false', () => {
      const nicelyNamedRule = props => ({ color: 'red' })

      process.env.NODE_ENV = 'development'

      const renderer = createRenderer({ prettySelectors: false })

      const className = renderer.renderRule(nicelyNamedRule)

      expect(className).to.eql('c1')
    })

    it('should not name classes after their rule when in prod', () => {
      const nicelyNamedRule = props => ({ color: 'red' })

      process.env.NODE_ENV = 'production'

      const renderer = createRenderer({ prettySelectors: true })

      const className = renderer.renderRule(nicelyNamedRule)

      expect(className).to.eql('c1')
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

      expect(animationName).to.eql('k0')
      expect(renderer.keyframes).to.eql('@-webkit-keyframes k0{from{color:red}to{color:blue}}@-moz-keyframes k0{from{color:red}to{color:blue}}@keyframes k0{from{color:red}to{color:blue}}')
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
      expect(renderer.rendered.hasOwnProperty('html,body{"margin":0,"fontSize":"12px"}')).to.eql(true)
      expect(renderer.statics).to.eql('html,body{margin:0;font-size:12px}')
    })

    it('should allow multiple static styles for a single selector', () => {
      const renderer = createRenderer()

      renderer.renderStatic({ margin: 0, fontSize: '12px' }, 'html,body')
      renderer.renderStatic({ color: 'red' }, 'html,body')
      expect(renderer.rendered.hasOwnProperty('html,body{"margin":0,"fontSize":"12px"}')).to.eql(true)
      expect(renderer.rendered.hasOwnProperty('html,body{"color":"red"}')).to.eql(true)
      expect(renderer.statics).to.eql('html,body{margin:0;font-size:12px}html,body{color:red}')
    })
  })


  describe('Rendering Fonts', () => {
    it('should cache the font-face', () => {
      const renderer = createRenderer()
      const family = 'Arial'
      const properties = { fontWeight: 300 }

      renderer.renderFont(family, [
        '../fonts/Arial.ttf',
        '../fonts/Arial.woff'
      ], properties)

      const key = family + generateStyleHash(properties)
      expect(renderer.rendered.hasOwnProperty(key)).to.eql(true)
    })

    it('should return the font family', () => {
      const renderer = createRenderer()

      const family = renderer.renderFont('Arial', [ '../fonts/Arial.ttf', '../fonts/Arial.woff' ], {
        fontWeight: 300
      })

      expect(family).to.eql('Arial')
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

      expect(subscriber).to.have.been.calledTwice
    })

    it('should call the callback with a change object', () => {
      const rule = props => ({
        color: 'red',
        '@media (min-height: 300px)': {
          color: 'blue'
        }
      })

      const renderer = createRenderer()

      const changes = [ ]
      const subscriber = change => changes.push(change)

      renderer.subscribe(subscriber)
      const staticClassName = renderer.renderRule(rule)

      expect(changes).to.eql([ {
        type: 'rule',
        selector: '.c1',
        css: 'color:blue',
        style: {
          color: 'blue'
        },
        media: '(min-height: 300px)'
      }, {
        type: 'rule',
        selector: '.c1',
        css: 'color:red',
        style: {
          color: 'red'
        },
        media: ''
      } ])
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


  describe('Rehydration', () => {
    it('should add to the callstack on renders', () => {
      const renderer = createRenderer()

      const rule = props => ({ color: 'red', fontSize: props.size })
      const className = renderer.renderRule(rule)
      const className2 = renderer.renderRule(rule, { size: '12px' })

      expect(renderer.callStack.length).to.eql(2)
      expect(className).to.eql(renderer.callStack[0]())
      expect(className2).to.eql(renderer.callStack[1]())

    })

    it('should clear the old call stack after rehydration', () => {
      const renderer = createRenderer()

      const rule = props => ({ color: 'red', fontSize: props.size })
      const className = renderer.renderRule(rule, { size: '12px' })

      renderer.rehydrate()

      expect(renderer.callStack.length).to.eql(2)
      expect(className).to.eql(renderer.callStack[1]())
    })

    it('should rerender every rule', () => {
      const renderer = createRenderer()

      let color = 'red'
      const rule = props => ({ color: color })
      const className = renderer.renderRule(rule)

      const oldRules = renderer.rules + ''

      color = 'blue'
      renderer.rehydrate()

      expect(renderer.rules).to.eql('.c1{color:blue}')
      expect(oldRules).to.eql('.c1{color:red}')
    })
  })
})
