import { createRenderer } from 'fela'

import renderToString from '../renderToString'

describe('Rendering to string', () => {
  it('should return a single CSS string', () => {
    const rule = props => ({
      color: props.color,
      '@media (min-height: 300px)': { color: 'blue' }
    })

    const renderer = createRenderer()
    renderer.renderRule(rule, { color: 'red' })
    renderer.renderStatic('*{box-sizing:border-box}')
    renderer.renderStatic({ display: 'flex' }, 'div')

    expect(renderToString(renderer)).toEqual(
      '*{box-sizing:border-box}div{display:flex}.a{color:red}@media (min-height: 300px){.b{color:blue}}'
    )
  })
})
