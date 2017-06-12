import renderToSheetList from '../renderToSheetList'
import { createRenderer } from 'fela'

describe('Rendering to a sheet list', () => {
  it('should return a list of style sheets', () => {
    const rule = props => ({
      color: props.color,
      '@media (min-height: 300px)': { color: 'blue' }
    })

    const renderer = createRenderer()
    renderer.renderRule(rule, { color: 'red' })
    renderer.renderStatic('*{box-sizing:border-box}')
    renderer.renderStatic({ display: 'flex' }, 'div')

    expect(renderToSheetList(renderer)).toEqual([
      {
        type: 'STATIC',
        css: '*{box-sizing:border-box}div{display:flex}'
      },
      {
        type: 'RULE',
        css: '.a{color:red}'
      },
      {
        type: 'RULE',
        css: '.b{color:blue}',
        media: '(min-height: 300px)'
      }
    ])
  })
})
