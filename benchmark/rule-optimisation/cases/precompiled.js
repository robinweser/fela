import webPreset from 'fela-preset-web'
import { createRenderer } from 'fela'

import variations from './_variations'

export default function precompiled() {
  const renderer = createRenderer({ plugins: [...webPreset] })
  const rule = ({ fontSize, width }) => {
    if (!renderer.cache[0]) {
      renderer.cache['backgroundColorblack'] = 'a'
      renderer.cache['lineHeight1'] = 'b'
      renderer.cache['(min-width: 300px)backgroundColoryellow'] = 'c'
      renderer.cache['(min-width: 300px)colorgreen'] = 'd'
      renderer.cache[':hovercolorred'] = 'e'

      renderer.cache[0] = 'a b c d e'
    }

    return {
      _className: renderer.cache[0],
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
