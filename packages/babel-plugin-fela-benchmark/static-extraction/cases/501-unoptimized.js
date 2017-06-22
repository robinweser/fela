import { createRenderer } from '../../packages/501/index'
import variations from './_variations'

export const unoptimized501 = () => {
  const renderer = createRenderer()

  const rule = ({ fontSize, width }) => ({
    fontSize: fontSize + 'px',
    width: width + 'px',
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
