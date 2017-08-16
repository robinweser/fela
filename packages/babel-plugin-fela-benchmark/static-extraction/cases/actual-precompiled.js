import webPreset from 'fela-preset-web'
import { createRenderer } from 'fela'
import variations from './_variations'

export const precompiledActual = () => {
  const renderer = createRenderer({ plugins: [...webPreset] })
  const rule = ({ fontSize, width }) => {
    if (!renderer.cache[0]) {
      renderer.rules +=
        '.a{background-color:black}.b{line-height:1}.e:hover{color:red}'
      if (!renderer.mediaRules['(min-width: 300px)']) {
        renderer.mediaRules['(min-width: 300px)'] = ''
      }
      renderer.mediaRules['(min-width: 300px)'] +=
        '.c{background-color:yellow}.d{color:green}'

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
  return renderer.rules
}
