import embedded from '../embedded'
import createRenderer from '../../createRenderer'

describe('Embedded plugin', () => {
  it('should render inline keyframes & fonts', () => {
    const rule = () => ({
      color: 'red',
      animationName: {
        '0%': { color: 'red' },
        '100%': { color: 'blue' }
      },
      fontFace: {
        fontFamily: 'Arial',
        src: ['foo', 'bar'],
        fontWeight: 500
      }
    })

    const renderer = createRenderer({ plugins: embedded() })
    renderer.renderRule(rule)

    expect(renderer.rules).toEqual('')
    expect(renderer.keyframes).toEqual('')
    expect(renderer.fonts).toEqual('')
  })
})
