import renderToMarkup from '../renderToMarkup'
import { createRenderer } from 'fela'

describe('Rendering to HTML markup', () => {
  it('should return a single HTML markup string', () => {
    const rule = props => ({
      color: props.color,
      '@media (min-height: 300px)': { color: 'blue' }
    })

    const renderer = createRenderer()
    renderer.renderRule(rule, { color: 'red' })
    renderer.renderStatic('*{box-sizing:border-box}')
    renderer.renderStatic({ display: 'flex' }, 'div')

    const staticStyle =
      '<style type="text/css" data-fela-type="STATIC">*{box-sizing:border-box}div{display:flex}</style>'
    const ruleStyle =
      '<style type="text/css" data-fela-type="RULE">.a{color:red}</style>'
    const mediaRuleStyle =
      '<style type="text/css" data-fela-type="RULE" media="(min-height: 300px)">.b{color:blue}</style>'

    expect(renderToMarkup(renderer)).toEqual(
      staticStyle + ruleStyle + mediaRuleStyle
    )
  })
})
