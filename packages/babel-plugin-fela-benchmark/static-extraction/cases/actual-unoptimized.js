import webPreset from 'fela-preset-web'
import { createRenderer } from 'fela'
import variations from './_variations'

export const unoptimizedActual = () => {
  const renderer = createRenderer({ plugins: [...webPreset] })

  const rule = ({ fontSize, width }) => ({
    fontSize: `${fontSize}px`,
    width: `${width}px`,
    backgroundColor: 'black',
    lineHeight: 1.0,
    ':hover': {
      color: 'red',
      width: `${width * 2}px`
    },
    '@media (min-width: 300px)': {
      fontSize: `${fontSize + 2}px`,
      backgroundColor: 'yellow',
      color: 'green'
    }
  })

  variations.forEach(variation => renderer.renderRule(rule, variation))
  return renderer.rules
}
