import { createRenderer } from 'fela'
import { renderToString } from 'fela-tools'

describe('Fela with Fela Tools integration', () => {
  describe('Rendering rules', () => {
    it('should remove undefined values', () => {
      const rule = props => ({
        color: props.color,
        fontSize: '15px',
      })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule)

      expect(className).toMatchSnapshot()
      expect(renderToString(renderer)).toMatchSnapshot()
    })

    it('should render pseudo classes', () => {
      const rule = () => ({
        color: 'red',
        ':hover': {
          color: 'blue',
        },
      })

      const renderer = createRenderer()
      renderer.renderRule(rule)

      expect(renderToString(renderer)).toMatchSnapshot()
    })

    it('should prefix classNames', () => {
      const rule = () => ({
        color: 'red',
      })

      const renderer = createRenderer({
        selectorPrefix: 'fela_',
      })
      const className = renderer.renderRule(rule)

      expect(renderToString(renderer)).toMatchSnapshot()
      expect(className).toMatchSnapshot()
    })

    it('should render attribute selectors', () => {
      const rule = () => ({
        color: 'red',
        '[bool=true]': {
          color: 'blue',
        },
      })
      const renderer = createRenderer()

      renderer.renderRule(rule)

      expect(renderToString(renderer)).toMatchSnapshot()
    })

    it('should render child selectors', () => {
      const rule = () => ({
        color: 'red',
        '>div': {
          color: 'blue',
        },
      })
      const renderer = createRenderer()

      renderer.renderRule(rule)

      expect(renderToString(renderer)).toMatchSnapshot()
    })

    it('should render pseudo class selectors', () => {
      const rule = () => ({
        color: 'red',
        ':hover': {
          color: 'blue',
        },
      })
      const renderer = createRenderer()

      renderer.renderRule(rule)

      expect(renderToString(renderer)).toMatchSnapshot()
    })

    it('should render any nested selector with the &-prefix', () => {
      const rule = () => ({
        color: 'red',
        '&~#foo': {
          color: 'blue',
        },
        '& .bar': {
          color: 'green',
        },
      })
      const renderer = createRenderer()

      renderer.renderRule(rule)

      expect(renderToString(renderer)).toMatchSnapshot()
    })

    it('should render media queries', () => {
      const rule = () => ({
        color: 'red',
        '@media (min-height:300px)': {
          color: 'blue',
        },
      })

      const renderer = createRenderer()
      renderer.renderRule(rule)

      expect(renderToString(renderer)).toMatchSnapshot()
    })
  })

  describe('Rendering keyframes', () => {
    it('should render dynamic keyframe variations', () => {
      const keyframe = props => ({
        from: {
          color: props.color,
        },
        to: {
          color: 'blue',
        },
      })
      const renderer = createRenderer()

      const animationName = renderer.renderKeyframe(keyframe, {
        color: 'red',
      })

      expect(animationName).toMatchSnapshot()
      expect(renderToString(renderer)).toMatchSnapshot()
    })
  })

  describe('Rendering static styles', () => {
    it('should cache the style and return the rendered markup', () => {
      const renderer = createRenderer()

      const staticStyle = '*{color:red;margin:0}'
      renderer.renderStatic(staticStyle)

      expect(renderer.cache.hasOwnProperty(staticStyle)).toEqual(true)
      expect(renderToString(renderer)).toEqual(staticStyle)
    })

    it('should render a flat object of static selectors', () => {
      const renderer = createRenderer()

      const staticStyle = {
        margin: 0,
        fontSize: '12px',
      }

      renderer.renderStatic(staticStyle, 'html,body')
      expect(
        renderer.cache.hasOwnProperty('html,body{"margin":0,"fontSize":"12px"}')
      ).toEqual(true)
      expect(renderToString(renderer)).toMatchSnapshot()
    })

    it('should allow multiple static styles for a single selector', () => {
      const renderer = createRenderer()

      renderer.renderStatic(
        {
          margin: 0,
          fontSize: '12px',
        },
        'html,body'
      )
      renderer.renderStatic(
        {
          color: 'red',
        },
        'html,body'
      )

      expect(
        renderer.cache.hasOwnProperty('html,body{"margin":0,"fontSize":"12px"}')
      ).toEqual(true)
      expect(renderer.cache.hasOwnProperty('html,body{"color":"red"}')).toEqual(
        true
      )
      expect(renderToString(renderer)).toMatchSnapshot()
    })
  })
})
