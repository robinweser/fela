import { createRenderer } from 'fela'
import { renderToString } from 'fela-tools'

import webPreset, { createWebPreset } from '../index'

describe('preset-web-plugin', () => {
  it('should work without config', () => {
    const renderer = createRenderer({
      plugins: [...webPreset],
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
    expect(renderToString(renderer)).toMatchSnapshot()
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
    })

    it('should allow per plugin configuration', () => {
      renderer.renderRule(() => ({ width: 1 }))
      expect(renderToString(renderer)).toMatchSnapshot()
    })

    it('should pass all parameters to the plugins', () => {
      renderer.clear()
      renderer.renderRule(() => ({ margin: 1 }))
      expect(renderToString(renderer)).toMatchSnapshot()
    })
  })
})
