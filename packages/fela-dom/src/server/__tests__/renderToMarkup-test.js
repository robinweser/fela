import { createRenderer } from 'fela'
import { html as beautify } from 'js-beautify'

import renderToMarkup from '../renderToMarkup'

describe('Rendering to HTML markup', () => {
  it('should return a single HTML markup string', () => {
    const rule = props => ({
      color: props.color,
      '@media (min-height: 300px)': {
        color: 'blue'
      }
    })

    const renderer = createRenderer()
    renderer.renderRule(rule, {
      color: 'red'
    })
    renderer.renderStatic('*{box-sizing:border-box}')
    renderer.renderStatic(
      {
        display: 'flex'
      },
      'div'
    )

    expect(beautify(renderToMarkup(renderer))).toMatchSnapshot()
  })
})
