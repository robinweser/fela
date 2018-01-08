import webPreset from 'fela-preset-web'
import { createRenderer } from 'fela'

import variations from './_variations'

export default function extracted() {
  const renderer = createRenderer({ plugins: [...webPreset] })
  const rule = ({ fontSize, width }) => {
    return {
      _className: 'a b c d e',
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
}
