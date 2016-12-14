import createRenderer from '../modules/createRenderer'
import combineRules from '../modules/combineRules'

import { RULE_TYPE } from '../modules/utils/styleTypes'

describe('Renderer', () => {
  describe('Instantiating a new renderer', () => {
    it('should add caches for all styles', () => {
      const renderer = createRenderer()

      expect(renderer.rules).to.eql('')
      expect(renderer.mediaRules).to.eql({ })
      expect(renderer.keyframes).to.eql('')
      expect(renderer.fontFaces).to.eql('')
      expect(renderer.statics).to.eql('')
      expect(renderer.cache).to.eql({ })
      expect(renderer.uniqueRuleIdentifier).to.eql(0)
      expect(renderer.uniqueKeyframeIdentifier).to.eql(0)
    })

    it('should apply enhancers directly', () => {
      const enhancer = renderer => {
        renderer.foo = 'bar'
        return renderer
      }
      const renderer = createRenderer({ enhancers: [ enhancer ] })

      expect(renderer.foo).to.eql('bar')
    })

    it('should apply media queries in correct order', () => {
      const renderer = createRenderer({
        mediaQueryOrder: [ '(min-height: 300px)', '(max-width: 150px)' ]
      })

      expect(renderer.mediaRules).to.eql({
        '(min-height: 300px)': '',
        '(max-width: 150px)': ''
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
      expect(renderer.cache).to.eql({ })
      expect(renderer.uniqueRuleIdentifier).to.eql(0)
      expect(renderer.uniqueKeyframeIdentifier).to.eql(0)
    })
  })


  describe('Rendering rules', () => {
    it('should add a cache entry', () => {
      const rule = props => ({ color: 'red' })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule)

      expect(renderer.cache.hasOwnProperty('color' + 'red')).to.eql(true)
    })


    it('should reuse cached classNames', () => {
      const rule = props => ({ color: props.color, fontSize: '23px' })
      const renderer = createRenderer()

      const className1 = renderer.renderRule(rule, { color: 'red' })
      const className2 = renderer.renderRule(rule, { color: 'red' })
      const className3 = renderer.renderRule(rule, { color: 'blue' })

      expect(className1).to.eql(className2)
      expect(className1).to.eql('a b')
      expect(className3).to.eql('c b')
    })

    it('should return an empty string if the style is empty', () => {
      const rule = props => ({ })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule)

      expect(className).to.eql('')
    })

    it('should remove undefined values', () => {
      const rule = props => ({ color: props.color, fontSize: '15px' })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule)

      expect(className).to.eql('a')
      expect(renderer.rules).to.eql('.a{font-size:15px}')
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

      expect(className).to.eql('a b')
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

      expect(renderer.rules).to.eql('.a{color:red}.b:hover{color:blue}')
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

      expect(renderer.rules).to.eql('.a{color:red}.b[bool=true]{color:blue}')
    })

    it('should render attribute selectors', () => {
      const rule = props => ({
        color: 'red',
        '>div': {
          color: 'blue'
        }
      })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule)

      expect(renderer.rules).to.eql('.a{color:red}.b>div{color:blue}')
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

      expect(renderer.rules).to.eql('.a{color:red}')
      expect(renderer.mediaRules['(min-height:300px)']).to.eql('.b{color:blue}')
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
      expect(renderer.cache.hasOwnProperty(JSON.stringify(keyframe()))).to.eql(true)
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

      expect(animationName).to.eql('k1')
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

      expect(animationName).to.eql('k1')
      expect(renderer.keyframes).to.eql('@-webkit-keyframes k1{from{color:red}to{color:blue}}@-moz-keyframes k1{from{color:red}to{color:blue}}@keyframes k1{from{color:red}to{color:blue}}')
    })
  })


  describe('Rendering static styles', () => {
    it('should cache the style and return the rendered markup', () => {
      const renderer = createRenderer()

      const staticStyle = '*{color:red;margin:0}'
      renderer.renderStatic(staticStyle)

      expect(renderer.cache.hasOwnProperty(staticStyle)).to.eql(true)
      expect(renderer.statics).to.eql(staticStyle)
    })

    it('should render a flat object of static selectors', () => {
      const renderer = createRenderer()

      const staticStyle = { margin: 0, fontSize: '12px' }

      renderer.renderStatic(staticStyle, 'html,body')
      expect(renderer.cache.hasOwnProperty('html,body{"margin":0,"fontSize":"12px"}')).to.eql(true)
      expect(renderer.statics).to.eql('html,body{margin:0;font-size:12px}')
    })

    it('should allow multiple static styles for a single selector', () => {
      const renderer = createRenderer()

      renderer.renderStatic({ margin: 0, fontSize: '12px' }, 'html,body')
      renderer.renderStatic({ color: 'red' }, 'html,body')

      console.log(renderer.cache)
      expect(renderer.cache.hasOwnProperty('html,body{"margin":0,"fontSize":"12px"}')).to.eql(true)
      expect(renderer.cache.hasOwnProperty('html,body{"color":"red"}')).to.eql(true)
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

      const key = family + JSON.stringify(properties)
      expect(renderer.cache.hasOwnProperty(key)).to.eql(true)
    })

    it('should return the font family', () => {
      const renderer = createRenderer()

      const family = renderer.renderFont('Arial', [ '../fonts/Arial.ttf', '../fonts/Arial.woff' ], {
        fontWeight: 300
      })

      expect(family).to.eql('"Arial"')
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

      expect(changes).to.eql([
        {
          type: RULE_TYPE,
          selector: '.a',
          declaration: 'color:red',
          media: ''
        }, {
          type: RULE_TYPE,
          selector: '.b',
          declaration: 'color:blue',
          media: '(min-height: 300px)'
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



  describe('Rendering to string', () => {
    it('should return a single CSS string', () => {
      const rule = props => ({
        color: props.color,
        '@media (min-height: 300px)': {
          color: 'blue'
        }
      })

      const renderer = createRenderer()
      renderer.renderRule(rule, { color: 'red' })
      renderer.renderStatic('*{box-sizing:border-box}')
      renderer.renderStatic({ display: 'flex' }, 'div')

      expect(renderer.renderToString()).to.eql(
        '*{box-sizing:border-box}div{display:flex}.a{color:red}@media (min-height: 300px){.b{color:blue}}'
      )
    })
  })
})
