import { createRenderer } from 'fela'
import variations from './_variations'

export const unoptimizedActual = () => {
  const renderer = createRenderer()

  const rule = ({ fontSize, width }) => ({
    fontSize: `${fontSize}px`,
    width: `${width}px`,
    backgroundColor: 'black',
    lineHeight: 1.0,
    ':hover': {
      color: 'red'
    },
    '@media (min-width: 300px)': {
      backgroundColor: 'yellow',
      color: 'green'
    }
  })

  variations.forEach(variation => renderer.renderRule(rule, variation))
  return renderer.rules
}
