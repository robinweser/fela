import { css as beautify } from 'js-beautify'
import { createRenderer } from 'fela'

import renderToString from '../renderToString'

describe('Rendering to string', () => {
  it('should return a single CSS string', () => {
    const rule = props => ({
      color: props.color,
      '@supports (display:flex)': {
        color: 'yellow',
      },
      '@supports (display:grid)': {
        color: 'brown',
      },
      '@media (min-height: 300px)': {
        color: 'blue',
        '@supports (display:flex)': {
          color: 'green',
        },
        '@supports (display:grid)': {
          color: 'black',
        },
      },

      '@media (max-height: 300px)': {
        '@supports (display:flex)': {
          color: 'purple',
        },
      },

      '@media (max-width: 300px)': {
        color: 'grey',
      },
    })

    const renderer = createRenderer()
    renderer.renderRule(rule, {
      color: 'red',
    })
    renderer.renderStatic('*{box-sizing:border-box}')
    renderer.renderStatic(
      {
        display: 'flex',
      },
      'div'
    )

    expect(
      beautify(renderToString(renderer), {
        indent_size: 2,
      })
    ).toMatchSnapshot()
  })
})
