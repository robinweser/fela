import Renderer from '../../modules/renderer/Renderer'

describe('Renderer', () => {
  describe('Instantiating a new Renderer', () => {
    it('should add caches for all styles', () => {
      const renderer = new Renderer()

      expect(renderer.selectors).to.eql('')
      expect(renderer.mediaSelectors).to.eql(new Map())
      expect(renderer.keyframes).to.eql('')
      expect(renderer.fontFaces).to.eql('')
      expect(renderer.statics).to.eql('')
    })
  })


  describe('Clearing a Renderer', () => {
    it('should reset all caches', () => {
      const renderer = new Renderer()
      const selector = props => ({ color: 'red' })

      renderer.render(selector)
      renderer.clear()

      expect(renderer.selectors).to.eql('')
      expect(renderer.mediaSelectors).to.eql({ })
      expect(renderer.keyframes).to.eql('')
      expect(renderer.fontFaces).to.eql('')
      expect(renderer.statics).to.eql('')
      expect(renderer.ids).to.eql([ ])
    })
  })


  describe('Rendering selectors', () => {
    it('should add a cache entry', () => {
      const selector = props => ({ color: 'red' })
      const renderer = new Renderer()

      const className = renderer.render(selector)

      expect(renderer.rendered.hasOwnProperty(className)).to.eql(true)
    })

    it('should add a media cache entry for each media', () => {
      const selector = props => ({
        color: 'red',
        '@media screen': {
          color: 'blue'
        },
        '@media min-height: 300px': {
          color: 'yellow'
        }
      })

      const anotherSelector = props => ({
        color: 'blue',
        '@media min-height: 300px': {
          color: 'red'
        }
      })

      const renderer = new Renderer()

      const className1 = renderer.render(selector)
      const className2 = renderer.render(anotherSelector)

      expect(renderer.mediaSelectors.hasOwnProperty('screen')).to.eql(true)
      expect(renderer.mediaSelectors.hasOwnProperty('min-height: 300px')).to.eql(true)
      expect(renderer.rendered.hasOwnProperty(className1)).to.eql(true)
      expect(renderer.rendered.hasOwnProperty(className2)).to.eql(true)
    })

    it('should reuse cached variations', () => {
      const selector = props => ({
        color: props.color,
        fontSize: '23px'
      })
      const renderer = new Renderer()

      renderer.render(selector, { color: 'red' })
      renderer.render(selector, { color: 'red' })
      renderer.render(selector, { color: 'blue' })

      expect(Object.keys(renderer.rendered).length).to.eql(3)
    })

    it('should reuse static style', () => {
      const selector = props => ({ fontSize: '23px' })
      const renderer = new Renderer()

      const className = renderer.render(selector, { color: 'red' })
      const className2 = renderer.render(selector, { color: 'red' })
      const className3 = renderer.render(selector, {
        color: 'blue'
      })

      expect(className).to.eql(className2)
      expect(className).to.eql(className3)
      expect(renderer.selectors).to.eql('.c0{font-size:23px}')
      expect(Object.keys(renderer.rendered).length).to.eql(3)
    })

    it('should generate an incrementing reference id', () => {
      const selector = props => ({ color: 'red' })
      const selector2 = props => ({ color: 'blue' })
      const renderer = new Renderer()

      renderer.render(selector)
      renderer.render(selector2)

      expect(renderer.ids.indexOf(selector)).to.be.greaterThan(-1)
      expect(renderer.ids.indexOf(selector2)).to.be.greaterThan(-1)
      expect(renderer.ids.indexOf(selector2)).to.be.greaterThan(renderer.ids.indexOf(selector))
    })

    it('should always return the same className prefix', () => {
      const selector = props => ({ color: 'red', foo: props.foo })
      const renderer = new Renderer()

      const staticClassName = renderer.render(selector)
      const dynamicClassName = renderer.render(selector, {
        foo: 'bar'
      })
      expect(staticClassName).to.not.eql(dynamicClassName)
      expect(staticClassName.substr(0, 2)).to.eql(dynamicClassName.substr(0, 2))
    })

    it('should keep base styles as an object for diffing', () => {
      const selector = props => ({ color: 'red' })
      const renderer = new Renderer()

      const className = renderer.render(selector)

      expect(renderer.base[renderer.ids.indexOf(selector)]).to.eql({
        color: 'red'
      })
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

      const renderer = new Renderer()

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
      const renderer = new Renderer()

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
      const renderer = new Renderer()

      const animationName = renderer.renderKeyframe(keyframe, {
        color: 'red'
      })

      expect(animationName).to.eql('k0--aedinm')
      expect(renderer.keyframes).to.eql('@-webkit-keyframes k0--aedinm{from{color:red}to{color:blue}}@-moz-keyframes k0--aedinm{from{color:red}to{color:blue}}@keyframes k0--aedinm{from{color:red}to{color:blue}}')
    })
  })


  describe('Rendering static styles', () => {
    it('should cache the style and return the rendered markup', () => {
      const renderer = new Renderer()

      const staticStyle = '*{color:red;margin:0}'
      renderer.renderStatic(staticStyle)

      expect(renderer.rendered.hasOwnProperty(staticStyle)).to.eql(true)
      expect(renderer.statics).to.eql(staticStyle)
    })

    it('should render a flat object of static selectors', () => {
      const renderer = new Renderer()

      const staticStyle = {
        '*': {
          margin: 0,
          fontSize: '12px'
        },
        div: {
          display: 'flex'
        }
      }

      renderer.renderStatic(staticStyle)

      expect(renderer.rendered.hasOwnProperty(renderer._generatePropsReference(staticStyle))).to.eql(true)
      expect(renderer.statics).to.eql('*{margin:0;font-size:12px}div{display:flex}')
    })
  })


  describe('Rendering Fonts', () => {
    it('should cache the font-face', () => {
      const renderer = new Renderer()

      const family = renderer.renderFont('Arial', [ '../fonts/Arial.ttf', '../fonts/Arial.woff' ], {
        fontWeight: 300
      })

      expect(renderer.rendered.hasOwnProperty(family)).to.eql(true)
    })

    it('should return the font family', () => {
      const renderer = new Renderer()

      const family = renderer.renderFont('Arial', [ '../fonts/Arial.ttf', '../fonts/Arial.woff' ], {
        fontWeight: 300
      })

      expect(family).to.eql('Arial')
    })
  })


  describe('Generating the props reference', () => {
    it('should always return the same className with the same props', () => {
      const renderer = new Renderer()

      const className1 = renderer._generatePropsReference('foobar')
      const className2 = renderer._generatePropsReference('foobar')
      expect(className1).to.eql(className2)
    })

    it('should sort props before', () => {
      const renderer = new Renderer()

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
      const selector = props => ({
        color: 'red',
        '@media (min-height: 300px)': {
          color: 'blue'
        }
      })

      const renderer = new Renderer()
      const subscriber = sinon.spy()
      renderer.subscribe(subscriber)
      const staticClassName = renderer.render(selector)

      expect(subscriber).to.have.been.calledOnce
    })

    it('should return a unsubscribe method', () => {
      const renderer = new Renderer()
      const subscriber = sinon.spy()

      const unsubscriber = renderer.subscribe(subscriber)
      unsubscriber.unsubscribe()

      expect(unsubscriber.unsubscribe).to.be.a.function
      expect(renderer.listeners.length).to.eql(0)
    })
  })
})
