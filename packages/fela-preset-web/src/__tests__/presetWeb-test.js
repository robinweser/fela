import webPreset, { createWebPreset } from '../index'

import createRenderer from '../../../fela/src/createRenderer'
import combineArrays from '../../../fela-combine-arrays/src'
import renderToString from '../../../fela-tools/src/renderToString'

describe('preset-web-plugin', () => {
  it('should work without config', () => {
    const renderer = createRenderer({
      plugins: webPreset,
      enhancers: [combineArrays()],
    })

    const rule = () => ({
      color: 'red',
      extend: {
        condition: true,
        style: {
          border: 'none',
        },
      },
    })

    renderer.renderRule(rule)
    // Tests that fela-plugin-extend is added to the plugins
    expect(renderToString(renderer)).toEqual('.a{color:red}.b{border:none}')
  })

  describe('Configuring fela-preset-web', () => {
    it('should allow per plugin configuration', () => {
      const renderer = createRenderer({
        plugins: createWebPreset({
          unit: [
            'em',
            {
              margin: '%',
            },
          ],
        }),

        enhancers: [combineArrays()],
      })

      renderer.renderRule(() => ({ width: 1 }))
      expect(renderToString(renderer)).toBe('.a{width:1em}')
    })

    it('should pass all parameters to the plugins', () => {
      const renderer = createRenderer({
        plugins: createWebPreset({
          unit: [
            'em',
            {
              margin: '%',
            },
          ],
        }),
        enhancers: [combineArrays()],
      })

      renderer.renderRule(() => ({ margin: 1 }))
      expect(renderToString(renderer)).toBe('.a{margin:1%}')
    })
  })
})
