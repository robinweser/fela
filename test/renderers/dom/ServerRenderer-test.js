import Renderer from '../../../modules/renderers/dom/ServerRenderer'
import FontFace from '../../../modules/components/dom/FontFace'
import Keyframe from '../../../modules/components/dom/Keyframe'

describe('ServerRenderer Tests', () => {
  describe('Rendering', () => {
    it('should use its stylesheets render handler', () => {
      const selector = props => ({ color: 'red' })

      const renderer = new Renderer()
      renderer.stylesheet.handleRender = sinon.spy()
      const className = renderer.render(selector, { })
      expect(renderer.stylesheet.handleRender).to.have.been.calledOnce
    })

    it('should return its stylesheets render handler results', () => {
      const selector = props => ({ color: 'red' })

      const renderer = new Renderer()
      const className = renderer.render(selector)
      expect(className).to.eql('c0')
    })
  })

  describe('Clearing the renderer', () => {
    it('should clear all caches', () => {
      const selector = props => ({ color: 'red' })

      const renderer = new Renderer()

      renderer.render(selector, { })
      renderer.render(selector, { foo: 'bar' })

      renderer.clear()

      expect(renderer.stylesheet.cache.size).to.eql(0)
      expect(renderer.renderToString()).to.eql('')
    })
  })

  describe('Rendering to string', () => {
    it('should render all caches', () => {
      const selector = props => ({
        color: 'red',
        '@media (min-height: 300px)': {
          color: 'blue'
        }
      })

      const fontFace = new FontFace('Arial', [ '../fonts/Arial.ttf', '../fonts/Arial.woff' ], {
        fontWeight: 300
      })

      const keyframe = new Keyframe(props => ({
        from: {
          color: 'red'
        },
        to: {
          color: 'blue'
        }
      }))

      const renderer = new Renderer()
      const className = renderer.render(selector)
      const fontFamily = renderer.render(fontFace)
      const animationName = renderer.render(keyframe)

      const css = renderer.renderToString()

      const selectorMarkup = '.' + className + '{color:red}@media (min-height: 300px){.' + className + '{color:blue}}'
      const fontFaceMarkup = '@font-face {font-family:\'Arial\';src:url(\'../fonts/Arial.ttf\') format(\'truetype\'),url(\'../fonts/Arial.woff\') format(\'woff\');font-weight:300}'
      const keyframeMarkup = ' ' + animationName + '{from{color:red}to{color:blue}}'
      const prefixedKeyframeMarkup = [ '@-webkit-keyframes', '@-moz-keyframes', '@keyframes', '' ].join(keyframeMarkup)

      expect(fontFamily).to.eql('Arial')
      expect(animationName).to.eql('k1')
      expect(className).to.eql('c0')
      expect(css).to.eql(fontFaceMarkup + selectorMarkup + prefixedKeyframeMarkup)
    })
  })
})
