import { html as beautify } from 'js-beautify'
import { createRenderer } from 'fela'
import render from '../render'

describe('render', () => {
  it('should create style nodes and render CSS rules', () => {
    const renderer = createRenderer()
    renderer.renderRule(() => ({
      backgroundColor: 'red',
      color: 'blue'
    }))
    renderer.renderKeyframe(() => ({
      '0%': { color: 'yellow' },
      '100%': { color: 'orange' }
    }))
    renderer.renderFont('Lato', ['../Lato.ttf'], { fontWeight: 300 })
    render(renderer)
    expect(
      beautify(document.documentElement.outerHTML, { indent_size: 2 })
    ).toMatchSnapshot()
  })
})
