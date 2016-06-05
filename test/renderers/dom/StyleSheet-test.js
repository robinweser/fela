import StyleSheet from '../../../modules/renderers/dom/StyleSheet'
import FontFace from '../../../modules/components/dom/FontFace'
import Keyframe from '../../../modules/components/dom/Keyframe'

describe('StyleSheet Tests', () => {
  describe('Instantiating a new StyleSheet', () => {
    it('should add caches for all styles', () => {
      const stylesheet = new StyleSheet()

      expect(stylesheet.selectors).to.eql('')
      expect(stylesheet.mediaSelectors).to.eql(new Map())
      expect(stylesheet.keyframes).to.eql('')
      expect(stylesheet.fontFaces).to.eql('')
      expect(stylesheet.statics).to.eql('')
    })
  })

  describe('Clearing a StyleSheet', () => {
    it('should reset all caches', () => {
      const stylesheet = new StyleSheet()
      const selector = props => ({ color: 'red' })

      stylesheet._renderSelectorVariation(selector)
      stylesheet.clear()

      expect(stylesheet.selectors).to.eql('')
      expect(stylesheet.mediaSelectors).to.eql(new Map())
      expect(stylesheet.keyframes).to.eql('')
      expect(stylesheet.fontFaces).to.eql('')
      expect(stylesheet.statics).to.eql('')
    })

    it('should reset the counter and the ids', () => {
      const stylesheet = new StyleSheet()
      const selector = props => ({ color: 'red' })

      stylesheet._renderSelectorVariation(selector)
      stylesheet.clear()

      expect(stylesheet._counter).to.eql(-1)
      expect(stylesheet.ids).to.eql(new Map())
    })
  })

  describe('Rendering selector variations', () => {
    it('should add a cache entry', () => {
      const selector = props => ({ color: 'red' })
      const sheet = new StyleSheet()

      const cls = sheet._renderSelectorVariation(selector)

      expect(sheet.rendered.has(cls)).to.eql(true)
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

      const sheet = new StyleSheet()

      const className1 = sheet._renderSelectorVariation(selector)
      const className2 = sheet._renderSelectorVariation(anotherSelector)

      expect(sheet.mediaSelectors.has('screen')).to.eql(true)
      expect(sheet.mediaSelectors.has('min-height: 300px')).to.eql(true)
      expect(sheet.rendered.has(className1)).to.eql(true)
      expect(sheet.rendered.has(className2)).to.eql(true)
    })

    it('should reuse cached variations', () => {
      const selector = props => ({
        color: props.color,
        fontSize: '23px'
      })
      const sheet = new StyleSheet()

      sheet._renderSelectorVariation(selector, { color: 'red' })
      sheet._renderSelectorVariation(selector, { color: 'red' })
      sheet._renderSelectorVariation(selector, { color: 'blue' })

      expect(sheet.rendered.size).to.eql(3)
    })

    it('should reuse static style', () => {
      const selector = props => ({ fontSize: '23px' })
      const sheet = new StyleSheet()

      const className = sheet._renderSelectorVariation(selector, {
        color: 'red'
      })
      const className2 = sheet._renderSelectorVariation(selector, {
        color: 'red'
      })
      const className3 = sheet._renderSelectorVariation(selector, {
        color: 'blue'
      })

      expect(className).to.eql(className2)
      expect(className).to.eql(className3)
      expect(sheet.selectors).to.eql('.c0{font-size:23px}')
      expect(sheet.rendered.size).to.eql(3)
    })

    it('should generate an incrementing reference id', () => {
      const selector = props => ({ color: 'red' })
      const selector2 = props => ({ color: 'blue' })
      const sheet = new StyleSheet()

      sheet._renderSelectorVariation(selector)
      sheet._renderSelectorVariation(selector2)

      expect(sheet.ids.has(selector)).to.eql(true)
      expect(sheet.ids.has(selector2)).to.eql(true)
      expect(sheet.ids.get(selector2)).to.be.greaterThan(sheet.ids.get(selector))
    })

    it('should always return the same className prefix', () => {
      const selector = props => ({ color: 'red', foo: props.foo })
      const sheet = new StyleSheet()

      const staticClassName = sheet._renderSelectorVariation(selector)
      const dynamicClassName = sheet._renderSelectorVariation(selector, {
        foo: 'bar'
      })
      expect(staticClassName).to.not.eql(dynamicClassName)
      expect(staticClassName.substr(0, 2)).to.eql(dynamicClassName.substr(0, 2))
    })

    it('should keep base styles as an object for diffing', () => {
      const selector = props => ({ color: 'red' })
      const sheet = new StyleSheet()

      const className = sheet._renderSelectorVariation(selector)

      expect(sheet.base.get(selector)).to.eql({
        color: 'red'
      })
    })
  })

  describe('Rendering Keyframe variations', () => {
    it('should add a cache entry', () => {
      const keyframe = new Keyframe(props => ({
        from: {
          color: 'red'
        },
        to: {
          color: 'blue'
        }
      }))
      const sheet = new StyleSheet()

      const animationName = sheet._renderKeyframeVariation(keyframe)

      expect(sheet.rendered.has(animationName)).to.eql(true)
    })

    it('should return a valid animation name', () => {
      const keyframe = new Keyframe(props => ({
        from: {
          color: 'red'
        },
        to: {
          color: 'blue'
        }
      }))
      const sheet = new StyleSheet()

      const animationName = sheet._renderKeyframeVariation(keyframe)

      expect(animationName).to.eql('k0')
    })

    it('should render dynamic keyframe variations', () => {
      const keyframe = new Keyframe(props => ({
        from: {
          color: props.color
        },
        to: {
          color: 'blue'
        }
      }))
      const sheet = new StyleSheet()

      const animationName = sheet._renderKeyframeVariation(keyframe, {
        color: 'red'
      })

      expect(animationName).to.eql('k0--aedinm')
      expect(sheet.keyframes).to.eql('@-webkit-keyframes k0--aedinm{from{color:red}to{color:blue}}@-moz-keyframes k0--aedinm{from{color:red}to{color:blue}}@keyframes k0--aedinm{from{color:red}to{color:blue}}')
    })

    it('should process keyframes with plugins', () => {
      const keyframe = new Keyframe(props => ({
        from: {
          color: 'red'
        }
      }))
      const sheet = new StyleSheet()

      const animationName = sheet._renderKeyframeVariation(keyframe, {}, [ ({ style }) => ({
        ...style,
        to: {
          color: 'blue'
        }
      }) ])

      expect(sheet.keyframes).to.eql('@-webkit-keyframes k0{from{color:red}to{color:blue}}@-moz-keyframes k0{from{color:red}to{color:blue}}@keyframes k0{from{color:red}to{color:blue}}')
    })
  })

  describe('Rendering static styles', () => {
    it('should cache the style and return the rendered markup', () => {
      const sheet = new StyleSheet()

      const staticStyle = '*{color:red;margin:0}'
      sheet._renderStatic(staticStyle)

      expect(sheet.rendered.has(staticStyle)).to.eql(true)
      expect(sheet.statics).to.eql(staticStyle)
    })

    it('should render a flat object of static selectors', () => {
      const sheet = new StyleSheet()

      const staticStyle = {
        '*': {
          margin: 0,
          fontSize: '12px'
        },
        div: {
          display: 'flex'
        }
      }

      sheet._renderStatic(staticStyle)

      expect(sheet.rendered.has(staticStyle)).to.eql(true)
      expect(sheet.statics).to.eql('*{margin:0;font-size:12px}div{display:flex}')
    })
  })

  describe('Rendering FontFaces', () => {
    it('should cache the font-face', () => {
      const sheet = new StyleSheet()

      const fontFace = new FontFace('Arial', [ '../fonts/Arial.ttf', '../fonts/Arial.woff' ], {
        fontWeight: 300
      })
      const css = sheet._renderFontFace(fontFace)

      expect(sheet.rendered.has(fontFace)).to.eql(true)
    })
    it('should return the font family', () => {
      const sheet = new StyleSheet()

      const fontFace = new FontFace('Arial', [ '../fonts/Arial.ttf', '../fonts/Arial.woff' ], {
        fontWeight: 300
      })
      const css = sheet._renderFontFace(fontFace)

      expect(css).to.eql('Arial')
    })
  })

  describe('Generating the props reference', () => {
    it('should always return the same className with the same props', () => {
      const stylesheet = new StyleSheet()

      const className1 = stylesheet._generatePropsReference('foobar')
      const className2 = stylesheet._generatePropsReference('foobar')
      expect(className1).to.eql(className2)
    })

    it('should sort props before', () => {
      const stylesheet = new StyleSheet()

      const className1 = stylesheet._generatePropsReference({
        foo: 'bar',
        fontSize: 12
      })
      const className2 = stylesheet._generatePropsReference({
        fontSize: 12,
        foo: 'bar'
      })
      expect(className1).to.eql(className2)
    })
  })


  describe('Subscribing to the StyleSheet', () => {
    it('should call the callback each time it emits changes', () => {
      const selector = props => ({
        color: 'red',
        '@media (min-height: 300px)': {
          color: 'blue'
        }
      })

      const stylesheet = new StyleSheet()
      const subscriber = sinon.spy()
      stylesheet.subscribe(subscriber)
      const staticClassName = stylesheet._renderSelectorVariation(selector)

      expect(subscriber).to.have.been.calledOnce
    })

    it('should return a unsubscribe method', () => {
      const stylesheet = new StyleSheet()
      const subscriber = sinon.spy()

      const unsubscriber = stylesheet.subscribe(subscriber)
      unsubscriber.unsubscribe()

      expect(unsubscriber.unsibscribe).to.be.a.function
      expect(stylesheet.listeners.size).to.eql(0)
    })
  })
})
