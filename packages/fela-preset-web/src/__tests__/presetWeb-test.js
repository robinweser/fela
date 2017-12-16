import { createRenderer } from 'fela'
import combineArrays from 'fela-combine-arrays'

import webPreset, { createWebPreset } from '../index'

describe('preset-web-plugin', () => {
  it('should work without config', () => {
    const renderer = createRenderer({
      plugins: [...webPreset],
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
    expect(renderer.rules).toEqual('.a{color:red}.b{border:none}')
  })

  describe('configuration', () => {
    const renderer = createRenderer({
      plugins: [
        ...createWebPreset({
          unit: [
            'em',
            {
              margin: '%',
            },
          ],
        }),
      ],
      enhancers: [combineArrays()],
    })

    it('should allow per plugin configuration', () => {
      renderer.renderRule(() => ({ width: 1 }))
      expect(renderer.rules).toBe('.a{width:1em}')
    })

    it('should pass all parameters to the plugins', () => {
      renderer.clear()
      renderer.renderRule(() => ({ margin: 1 }))
      expect(renderer.rules).toBe('.a{margin:1%}')
    })
  })
})
