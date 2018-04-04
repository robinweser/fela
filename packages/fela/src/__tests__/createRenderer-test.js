import { renderToString } from 'fela-tools'

import createRenderer from '../createRenderer'

describe('Renderer', () => {
  describe('Instantiating a new renderer', () => {
    it('should initialize all values', () => {
      const renderer = createRenderer()

      expect(renderer.cache).toEqual({})
      expect(renderer.uniqueRuleIdentifier).toEqual(0)
      expect(renderer.uniqueKeyframeIdentifier).toEqual(0)
    })

    it('should apply enhancers directly', () => {
      const enhancer = renderer => {
        renderer.foo = 'bar'
        return renderer
      }
      const renderer = createRenderer({
        enhancers: [enhancer],
      })

      expect(renderer.foo).toEqual('bar')
    })
  })

  describe('Clearing a Renderer', () => {
    it('should reset all values', () => {
      const renderer = createRenderer()
      const rule = () => ({
        color: 'red',
      })

      renderer.renderRule(rule)
      renderer.clear()

      expect(renderer.cache).toEqual({})
      expect(renderer.uniqueRuleIdentifier).toEqual(0)
      expect(renderer.uniqueKeyframeIdentifier).toEqual(0)
    })
  })

  describe('Rendering rules', () => {
    it('should add a cache entry', () => {
      const rule = () => ({
        color: 'red',
      })
      const renderer = createRenderer()

      renderer.renderRule(rule)

      expect(renderer.cache.hasOwnProperty('colorred')).toEqual(true)
    })

    it('should reuse cached classNames', () => {
      const rule = props => ({
        color: props.color,
        fontSize: '23px',
      })
      const renderer = createRenderer()

      const className1 = renderer.renderRule(rule, {
        color: 'red',
      })
      const className2 = renderer.renderRule(rule, {
        color: 'red',
      })
      const className3 = renderer.renderRule(rule, {
        color: 'blue',
      })

      expect(className1).toEqual(className2)
      expect(className1).toMatchSnapshot()
      expect(className3).toMatchSnapshot()
    })

    it('should return an empty string if the style is empty', () => {
      const rule = () => ({})
      const renderer = createRenderer()

      const className = renderer.renderRule(rule)

      expect(className).toEqual('')
    })

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

    it('should allow nested props', () => {
      const rule = props => ({
        color: props.theme.color,
        fontSize: 15,
      })
      const renderer = createRenderer()

      const className = renderer.renderRule(rule, {
        theme: {
          color: 'red',
        },
      })

      expect(className).toMatchSnapshot()
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
    it('should add a cache entry', () => {
      const keyframe = () => ({
        from: {
          color: 'red',
        },
        to: {
          color: 'blue',
        },
      })

      const renderer = createRenderer()

      renderer.renderKeyframe(keyframe)

      expect(renderer.cache.hasOwnProperty(JSON.stringify(keyframe()))).toEqual(
        true
      )
    })

    it('should return a valid animation name', () => {
      const keyframe = () => ({
        from: {
          color: 'red',
        },
        to: {
          color: 'blue',
        },
      })

      const renderer = createRenderer()
      const animationName = renderer.renderKeyframe(keyframe)

      expect(animationName).toMatchSnapshot()
    })

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

  describe('Rendering Fonts', () => {
    it('should cache the font-face', () => {
      const renderer = createRenderer()
      const family = 'Arial'
      const properties = {
        fontWeight: 300,
      }

      renderer.renderFont(
        family,
        ['../fonts/Arial.ttf', '../fonts/Arial.woff'],
        properties
      )

      const key = family + JSON.stringify(properties)
      expect(renderer.cache.hasOwnProperty(key)).toEqual(true)
    })

    it('should return the font family', () => {
      const renderer = createRenderer()

      const family = renderer.renderFont(
        'Arial',
        ['../fonts/Arial.ttf', '../fonts/Arial.woff'],
        {
          fontWeight: 300,
        }
      )

      expect(family).toEqual('"Arial"')
    })
    it('should return the font family when localAlias is provided as string', () => {
      const renderer = createRenderer()

      const family = renderer.renderFont(
        'Arial',
        ['../fonts/Arial.ttf', '../fonts/Arial.woff'],
        {
          localAlias: 'Arial',
          fontWeight: 300,
        }
      )

      expect(family).toEqual('"Arial"')
    })
    it('should return the font family when localAlias provided as array', () => {
      const renderer = createRenderer()

      const family = renderer.renderFont(
        'Arial',
        ['../fonts/Arial.ttf', '../fonts/Arial.woff'],
        {
          localAlias: ['Arial', 'Arial-Regular'],
          fontWeight: 300,
        }
      )

      expect(family).toEqual('"Arial"')
    })
    it('should create a valid src list', () => {
      const renderer = createRenderer()
      const family = 'Arial'
      const properties = {}

      renderer.renderFont(
        family,
        ['../fonts/Arial.ttf', '../fonts/Arial.woff'],
        properties
      )

      const key = family + JSON.stringify(properties)
      const src = renderer.cache[key].fontFace.match(/.*(src:.*);.*$/)[1]
      expect(src).toEqual(
        "src:url('../fonts/Arial.ttf') format('truetype'),url('../fonts/Arial.woff') format('woff')"
      )
    })
  })

  describe('Subscribing to the Renderer', () => {
    it('should call the callback each time it emits changes', () => {
      const rule = () => ({
        color: 'red',
        '@media (min-height: 300px)': {
          color: 'blue',
        },
      })

      const renderer = createRenderer()
      const subscriber = jest.fn()
      renderer.subscribe(subscriber)
      renderer.renderRule(rule)

      expect(subscriber).toHaveBeenCalledTimes(2)
    })

    it('should call the callback with a change object', () => {
      const rule = () => ({
        color: 'red',
        '@media (min-height: 300px)': {
          color: 'blue',
        },
      })

      const renderer = createRenderer()

      const changes = []
      const subscriber = change => changes.push(change)

      renderer.subscribe(subscriber)
      renderer.renderRule(rule)

      expect(changes).toMatchSnapshot()
    })

    it('should return a unsubscribe method', () => {
      const renderer = createRenderer()
      const subscriber = () => {}

      const unsubscriber = renderer.subscribe(subscriber)
      unsubscriber.unsubscribe()

      expect(unsubscriber.unsubscribe).toBeInstanceOf(Function)
      expect(renderer.listeners.length).toEqual(0)
    })
  })
})
