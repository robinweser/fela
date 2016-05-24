import StyleSheet from '../../../modules/renderers/dom/StyleSheet'
import MediaSelector from '../../../modules/components/dom/MediaSelector'
import Selector from '../../../modules/components/shared/Selector'

describe('StyleSheet Tests', () => {
  describe('Adding a Selector variation', () => {
    it('should add a cache entry', () => {
      const selector = new Selector(props => ({ color: 'red' }))
      const sheet = new StyleSheet()

      sheet._renderSelectorVariation(selector)

      expect(sheet.cache.has(selector)).to.eql(true)
    })

    it('should add a media cache entry for each media', () => {
      const selector = new MediaSelector(props => ({ color: 'red' }), {
        screen: props => ({ color: 'blue' }),
        'min-height: 300px': props => ({
          color: 'yellow'
        })
      })

      const sheet = new StyleSheet()

      sheet._renderSelectorVariation(selector)

      expect(sheet.mediaCache.has('screen')).to.eql(true)
      expect(sheet.mediaCache.has('min-height: 300px')).to.eql(true)
      expect(sheet.mediaCache.get('screen').has(selector)).to.eql(true)
      expect(sheet.mediaCache.get('min-height: 300px').has(selector)).to.eql(true)
    })

    it('should reuse cached variations', () => {
      const selector = new Selector(props => ({ color: 'red' }))
      const sheet = new StyleSheet()

      sheet._renderSelectorVariation(selector, { color: 'red' })
      sheet._renderSelectorVariation(selector, { color: 'red' })

      expect(sheet.cache.get(selector).size).to.eql(1)
    })

    it('should generate an incrementing reference id', () => {
      const selector = new Selector(props => ({ color: 'red' }))
      const selector2 = new Selector(props => ({ color: 'blue' }))
      const sheet = new StyleSheet()

      sheet._renderSelectorVariation(selector)
      sheet._renderSelectorVariation(selector2)

      expect(sheet.ids.has(selector)).to.eql(true)
      expect(sheet.ids.has(selector2)).to.eql(true)
      expect(sheet.ids.get(selector2)).to.be.greaterThan(sheet.ids.get(selector))
    })

    it('should always return the same className prefix', () => {
      const selector = new Selector(props => ({ color: 'red' }))
      const sheet = new StyleSheet()

      const staticClassName = sheet._renderSelectorVariation(selector)
      const dynamicClassName = sheet._renderSelectorVariation(selector, {
        foo: 'bar'
      })
      expect(staticClassName).to.not.eql(dynamicClassName)
      expect(staticClassName.substr(0, 2)).to.eql(dynamicClassName.substr(0, 2))
    })

    it('should support function selectors', () => {
      const selector = props => ({ color: 'red' })
      const sheet = new StyleSheet()

      sheet._renderSelectorVariation(selector)

      expect(sheet.cache.has(selector)).to.eql(true)
      expect(sheet.cache.get(selector).get('s')).to.eql({
        color: 'red'
      })
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

    it('should append an -s for selectors base', () => {
      const stylesheet = new StyleSheet()

      const className1 = stylesheet._generatePropsReference()
      const className2 = stylesheet._generatePropsReference({ })
      expect(className1).to.eql('s')
      expect(className2).to.eql('s')
    })
  })

  describe('Rendering a className', () => {
    it('should render valid CSS', () => {
      const stylesheet = new StyleSheet()
      const className = stylesheet._renderClassName('0', 'x345')

      expect(className).to.eql('c0-x345')
    })
  })

  describe('Rendering a selector', () => {
    it('should render valid CSS', () => {
      const stylesheet = new StyleSheet()
      const css = stylesheet._renderSelector('c0-s', {
        color: 'red',
        fontSize: 12,
        msFlexAlign: 'center'
      })

      expect(css).to.eql('.c0-s{color:red;font-size:12;-ms-flex-align:center}')
    })
  })

  describe('Rendering a media query', () => {
    it('should render valid CSS', () => {
      const selectors = '.c0-s{color:red;font-size:12;-ms-flex-align:center}'
      const stylesheet = new StyleSheet()
      const css = stylesheet._renderMediaQuery('min-height: 300px', selectors)

      expect(css).to.eql('@media(min-height: 300px){.c0-s{color:red;font-size:12;-ms-flex-align:center}}')
    })
  })

  describe('Rendering a whole cache', () => {
    it('should render valid CSS', () => {
      const selector = new Selector(props => ({ color: 'red' }))

      const stylesheet = new StyleSheet()
      const staticClassName = stylesheet._renderSelectorVariation(selector)
      const dynamicClassName = stylesheet._renderSelectorVariation(selector, {
        foo: 'bar'
      })

      const css = stylesheet._renderCache(stylesheet.cache)

      expect(css).to.eql('.' + staticClassName + '{color:red}.' + dynamicClassName + '{color:red}')
    })

    it('should split and render pseudo classes', () => {
      const selector = new Selector(props => ({
        color: 'red',
        ':hover': {
          color: 'blue',
          ':focus': {
            color: 'yellow',
            fontSize: '12px'
          }
        }
      }))

      const stylesheet = new StyleSheet()
      const className = stylesheet._renderSelectorVariation(selector)

      const css = stylesheet._renderCache(stylesheet.cache)

      expect(css).to.eql('.' + className + '{color:red}.' + className + ':hover{color:blue}.' + className + ':hover:focus{color:yellow;font-size:12px}')
    })
  })


  describe('Rendering to string', () => {
    it('should render all caches', () => {
      const selector = new MediaSelector(props => ({ color: 'red' }), {
        'min-height: 300px': props => ({ color: 'blue' })
      })

      const stylesheet = new StyleSheet()
      const staticClassName = stylesheet._renderSelectorVariation(selector)

      const css = stylesheet.renderToString()

      expect(css).to.eql('.' + staticClassName + '{color:red}@media(min-height: 300px){.' + staticClassName + '{color:blue}}')
    })

    it('should cluster media queries', () => {
      const selector = new MediaSelector(props => ({ color: 'red' }), {
        'min-height: 300px': props => ({ color: 'blue' })
      })

      const stylesheet = new StyleSheet()
      const staticClassName = stylesheet._renderSelectorVariation(selector)
      const dynamicClassName = stylesheet._renderSelectorVariation(selector, {
        foo: 'bar'
      })

      const css = stylesheet.renderToString()

      expect(css).to.eql('.' + staticClassName + '{color:red}.' + dynamicClassName + '{color:red}@media(min-height: 300px){.' + staticClassName + '{color:blue}.' + dynamicClassName + '{color:blue}}')
    })
  })

  describe('Subscribing to the StyleSheet', () => {
    it('should call the callback each time it emits changes', () => {
      const selector = new MediaSelector(props => ({ color: 'red' }), {
        'min-height: 300px': props => ({ color: 'blue' })
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
