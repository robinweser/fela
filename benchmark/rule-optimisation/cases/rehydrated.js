import webPreset from 'fela-preset-web'
import { createRenderer } from 'fela'

import rehydrateCache from 'fela-dom/lib/dom/rehydration/rehydrateCache'

import variations from './_variations'

export default function rehydrated() {
  const renderer = createRenderer({ plugins: [...webPreset] })
  const rule = ({ fontSize, width }) => {
    if (!renderer.cache[0]) {
      renderer.cache = {
        ...renderer.cache,
        ...rehydrateCache(
          '.a{background-color:black};.b{line-height:1};.c:hover:{color:red}'
        ),
        ...rehydrateCache(
          '.d{background-color:yellow};.e{color:green}',
          '(min-width: 300px)'
        ),
        [0]: {
          type: 'COMPILATION'
        }
      }
    }

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
