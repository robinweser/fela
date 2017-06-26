import webPreset from 'fela-preset-web'
import { createRenderer } from 'fela'
import variations from './_variations'

export const optimizedActual = () => {
  const renderer = createRenderer({ plugins: [...webPreset] })
  renderer.precompiled = {}

  const rule = ({ fontSize, width }) => {
    if (!renderer.precompiled[0]) {
      renderer.precompiled[0] = renderer.renderRule(() => ({
        backgroundColor: 'black',
        lineHeight: 1.0,
        ':hover': {
          color: 'red'
        },
        '@media (min-width: 300px)': {
          backgroundColor: 'yellow',
          color: 'green'
        }
      }))
    }

    return {
      _className: renderer.precompiled[0],
      fontSize: `${fontSize}px`,
      width: `${width}px`,
      ':hover': {
        width: `${width * 2}px`,
        '@media (min-width: 300px)': {
          fontSize: `${fontSize + 2}px`
        }
      }
    }
  }

  variations.forEach(variation => renderer.renderRule(rule, variation))
  return renderer.rules
}
