/* @flow */
import cssbeautify from 'cssbeautify'
import { objectReduce } from 'fela-utils'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'

function addBeautifier(renderer: DOMRenderer, options: Object): DOMRenderer {
  renderer.subscribe(() => {
    renderer.fontFaces = cssbeautify(renderer.fontFaces, options)
    renderer.keyframes = cssbeautify(renderer.keyframes, options)
    renderer.statics = cssbeautify(renderer.statics, options)
    renderer.rules = cssbeautify(renderer.rules, options)

    renderer.mediaRules = objectReduce(
      renderer.mediaRules,
      (mediaRules, rules, query) => {
        mediaRules[query] = cssbeautify(rules, options)
        return mediaRules
      },
      {}
    )
  })

  return renderer
}

const defaultOptions = {
  indent: '  ',
  openbrace: 'end-of-line',
  autosemicolon: false
}

export default function beautifier(options: Object = {}) {
  return (renderer: DOMRenderer) =>
    addBeautifier(renderer, {
      ...defaultOptions,
      ...options
    })
}
