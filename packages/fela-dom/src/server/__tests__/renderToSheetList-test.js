import renderToSheetList from '../renderToSheetList'
import { createRenderer } from 'fela'

describe('Rendering to a sheet list', () => {
  it('should return a list of style sheets', () => {
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

    expect(renderToSheetList(renderer)).toMatchSnapshot()
  })
})
