import webPreset from 'fela-preset-web'
import { createRenderer } from 'fela'

import variations from './_variations'

export default function precompiled() {
  const renderer = createRenderer({ plugins: [...webPreset] })
  const rule = ({ fontSize, width }) => {
    if (!renderer.cache[0]) {
      renderer.cache['backgroundColorblack'] = {
        type: 'RULE_TYPE',
        selector: '.a',
        className: 'a',
        declaration: 'background-color:black',
        media: '',
        support: ''
      }
      renderer.cache['lineHeight1'] = {
        type: 'RULE_TYPE',
        selector: '.b',
        className: 'b',
        declaration: 'line-height:1',
        media: '',
        support: ''
      }
      renderer.cache[':hovercolorred'] = {
        type: 'RULE_TYPE',
        selector: '.c:pseudo',
        className: 'c',
        declaration: 'color:red',
        media: '',
        support: ''
      }
      renderer.cache['(min-width: 300px)backgroundColoryellow'] = {
        type: 'RULE_TYPE',
        selector: '.d',
        className: 'd',
        declaration: 'background-color:yellow',
        media: '(min-width: 300px)',
        support: ''
      }
      renderer.cache['(min-width: 300px)colorgreen'] = {
        type: 'RULE_TYPE',
        selector: '.e',
        className: 'e',
        declaration: 'color:green',
        media: '(min-width: 300px)',
        support: ''
      }

      renderer.cache[0] = {
        type: 'COMPILATION'
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
