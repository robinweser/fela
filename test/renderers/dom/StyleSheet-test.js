import StyleSheet from '../../../modules/renderers/dom/StyleSheet'
import FontFace from '../../../modules/components/dom/FontFace'
import Keyframe from '../../../modules/components/dom/Keyframe'

describe('StyleSheet Tests', () => {
  describe('Instantiating a new StyleSheet', () => {
    it('should add caches for all styles', () => {
      const stylesheet = new StyleSheet()

      expect(stylesheet.cache).to.eql(new Map())
      expect(stylesheet.mediaCache).to.eql(new Map())
      expect(stylesheet.keyframes).to.eql(new Map())
      expect(stylesheet.fontFaces).to.eql(new Set())
      expect(stylesheet.statics).to.eql(new Set())
    })
  })

  describe('Clearing a StyleSheet', () => {
    it('should reset all caches', () => {
      const stylesheet = new StyleSheet()
      const selector = props => ({ color: 'red' })

      stylesheet._renderSelectorVariation(selector)
      stylesheet.clear()

      expect(stylesheet.cache).to.eql(new Map())
      expect(stylesheet.mediaCache).to.eql(new Map())
      expect(stylesheet.keyframes).to.eql(new Map())
      expect(stylesheet.fontFaces).to.eql(new Set())
      expect(stylesheet.statics).to.eql(new Set())
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

      sheet._renderSelectorVariation(selector)

      expect(sheet.cache.has(selector)).to.eql(true)
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

      sheet._renderSelectorVariation(selector)
      sheet._renderSelectorVariation(anotherSelector)

      expect(sheet.mediaCache.has('screen')).to.eql(true)
      expect(sheet.mediaCache.has('min-height: 300px')).to.eql(true)
      expect(sheet.mediaCache.get('screen').has(selector)).to.eql(true)
      expect(sheet.mediaCache.get('min-height: 300px').has(selector)).to.eql(true)
      expect(sheet.mediaCache.get('min-height: 300px').has(anotherSelector)).to.eql(true)
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

      expect(sheet.cache.get(selector).size).to.eql(4)
    })

    it('should reuse static styles', () => {
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
      expect(sheet.cache.get(selector).get('')).to.eql('.c0{font-size:23px}')
      expect(sheet.cache.get(selector).size).to.eql(4)
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

      sheet._renderSelectorVariation(selector)

      expect(sheet.cache.get(selector).get('static')).to.eql({
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

      sheet._renderKeyframeVariation(keyframe)

      expect(sheet.keyframes.has(keyframe)).to.eql(true)
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
      expect(sheet.keyframes.get(keyframe).get('--aedinm')).to.eql('@-webkit-keyframes k0--aedinm{from{color:red}to{color:blue}}@-moz-keyframes k0--aedinm{from{color:red}to{color:blue}}@keyframes k0--aedinm{from{color:red}to{color:blue}}')
    })

    it('should process keyframes with plugins', () => {
      const keyframe = new Keyframe(props => ({
        from: {
          color: 'red'
        }
      }))
      const sheet = new StyleSheet()

      const animationName = sheet._renderKeyframeVariation(keyframe, {}, [ ({ styles }) => ({
        ...styles,
        to: {
          color: 'blue'
        }
      }) ])

      expect(sheet.keyframes.get(keyframe).get('')).to.eql('@-webkit-keyframes k0{from{color:red}to{color:blue}}@-moz-keyframes k0{from{color:red}to{color:blue}}@keyframes k0{from{color:red}to{color:blue}}')
    })
  })

  describe('Rendering static styles', () => {
    it('should cache the styles and return the rendered markup', () => {
      const sheet = new StyleSheet()

      const staticStyles = '*{color:red;margin:0}'
      const css = sheet._renderStatic(staticStyles)

      expect(sheet.statics.has(staticStyles)).to.eql(true)
      expect(css).to.eql(staticStyles)
    })

    it('should render a flat object of static selectors', () => {
      const sheet = new StyleSheet()

      const css = sheet._renderStatic({
        '*': {
          margin: 0,
          fontSize: '12px'
        },
        div: {
          display: 'flex'
        }
      })

      expect(sheet.statics.has(css)).to.eql(true)
      expect(css).to.eql('*{margin:0;font-size:12px}div{display:flex}')
    })
  })

  describe('Rendering FontFaces', () => {
    it('should cache the font-face', () => {
      const sheet = new StyleSheet()

      const fontFace = new FontFace('Arial', [ '../fonts/Arial.ttf', '../fonts/Arial.woff' ], {
        fontWeight: 300
      })
      const css = sheet._renderFontFace(fontFace)

      expect(sheet.fontFaces.has(fontFace)).to.eql(true)
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

    it('should use an empty string for empty props', () => {
      const stylesheet = new StyleSheet()

      const className1 = stylesheet._generatePropsReference()
      const className2 = stylesheet._generatePropsReference({ })
      expect(className1).to.eql('')
      expect(className2).to.eql('')
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

      expect(subscriber).to.have.been.calledTwice
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

  describe('Validating styles', () => {
    it('should remove invalid properties', () => {
      const selector = props => ({
        color: props.color,
        display: [ '-webkit-box', 'flex' ],
        something: {
          color: 'blue'
        },
        fontSize: '12px',
        width: false
      })

      const stylesheet = new StyleSheet()
      const validatedStyles = stylesheet._validateStyles(selector({ }))

      expect(validatedStyles).to.eql({ fontSize: '12px' })
    })
  })

  describe('Clustering styles', () => {
    it('should cluster and flatten media query styles', () => {
      const styles = {
        color: 'blue',
        fontSize: '12px',
        '@media (min-height: 300px)': {
          color: 'red',
          fontSize: '5px',
          '@media (max-width: 200px)': {
            color: 'black'
          }
        },
        '@media screen': {
          fontSize: '20px'
        }
      }

      const stylesheet = new StyleSheet()
      const clusteredStyles = stylesheet._clusterStyles(styles)

      expect(clusteredStyles).to.eql({
        '': {
          '': {
            color: 'blue',
            fontSize: '12px'
          }
        },
        '(min-height: 300px)': {
          '': {
            color: 'red',
            fontSize: '5px'
          }
        },
        '(min-height: 300px) and (max-width: 200px)': {
          '': {
            color: 'black'
          }
        },
        screen: {
          '': {
            fontSize: '20px'
          }
        }
      })
    })

    it('should cluster and flatten pseudo classes', () => {
      const styles = {
        color: 'blue',
        fontSize: '12px',
        ':hover': {
          color: 'red',
          fontSize: '5px',
          ':focus': {
            color: 'black'
          }
        },
        ':focus': {
          fontSize: '20px'
        }
      }

      const stylesheet = new StyleSheet()
      const clusteredStyles = stylesheet._clusterStyles(styles)

      expect(clusteredStyles).to.eql({
        '': {
          '': {
            color: 'blue',
            fontSize: '12px'
          },
          ':hover': {
            color: 'red',
            fontSize: '5px'
          },
          ':hover:focus': {
            color: 'black'
          },
          ':focus': {
            fontSize: '20px'
          }
        }
      })
    })

    it('should cluster flatten media query styles and pseudo classes combined', () => {
      const styles = {
        color: 'blue',
        fontSize: '12px',
        ':hover': {
          color: 'black',
          ':active': {
            color: 'gray'
          }
        },
        '@media (min-height: 300px)': {
          color: 'red',
          fontSize: '5px',
          ':hover': {
            color: 'yellow',
            ':focus': {
              color: 'brown'
            }
          },
          '@media (max-width: 200px)': {
            color: 'black',
            ':focus': {
              color: 'purple'
            }
          }
        }
      }

      const stylesheet = new StyleSheet()
      const clusteredStyles = stylesheet._clusterStyles(styles)

      expect(clusteredStyles).to.eql({
        '': {
          '': {
            color: 'blue',
            fontSize: '12px'
          },
          ':hover': {
            color: 'black'
          },
          ':hover:active': {
            color: 'gray'
          }
        },
        '(min-height: 300px)': {
          '': {
            color: 'red',
            fontSize: '5px'
          },
          ':hover': {
            color: 'yellow'
          },
          ':hover:focus': {
            color: 'brown'
          }
        },
        '(min-height: 300px) and (max-width: 200px)': {
          '': {
            color: 'black'
          },
          ':focus': {
            color: 'purple'
          }
        }
      })
    })
  })

  describe('Extracting dynamic styles', () => {
    it('should only return the difference of two style objects', () => {
      const base = {
        color: 'red',
        display: '-webkit-box;display:flex',
        something: {
          color: 'blue'
        },
        test: {
          foo: 'bar'
        },
        fontSize: '12px',
        width: false
      }

      const styles = {
        color: 'blue',
        something: {
          fontSize: '15px'
        },
        test: {
          foo: 'bar'
        },
        width: true,
        fontSize: '12px',
        height: 12
      }
      const stylesheet = new StyleSheet()
      const dynamicStyles = stylesheet._extractDynamicStyles(styles, base)

      expect(dynamicStyles).to.eql({
        color: 'blue',
        something: {
          fontSize: '15px'
        },
        width: true,
        height: 12
      })
    })
  })
})
