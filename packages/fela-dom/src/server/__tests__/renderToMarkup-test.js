import { html as beautify } from 'js-beautify'

import renderToMarkup from '../renderToMarkup'

import createRenderer from '../../../../fela/src/createRenderer'

describe('Rendering to HTML markup', () => {
  it('should return a single HTML markup string', () => {
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

    expect(beautify(renderToMarkup(renderer))).toMatchSnapshot()
  })

  it('should correctly sort rules', () => {
    const rule1 = () => ({
      ':hover': { color: 'red' },
      ':active': { color: '#fff' },
    })

    const rule2 = () => ({
      ':hover': { color: '#000' },
      ':active': { color: '#fff' },
    })

    const renderer = createRenderer()

    renderer.renderRule(rule1)
    renderer.renderRule(rule2)

    expect(beautify(renderToMarkup(renderer))).toMatchSnapshot()
  })
})
