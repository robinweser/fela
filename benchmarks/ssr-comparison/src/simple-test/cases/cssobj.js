//import cssobj from 'cssobj'; // In client
// For server-side rendering
import cssobjCore from 'cssobj-core'
import cssobjPluginLocalize from 'cssobj-plugin-localize'
import cssobjPluginGencss from 'cssobj-plugin-gencss'

import { stylesheet } from '../styles'
import { renderHtml, renderBody } from '../render'
import { toClasses } from '../../utilities'

export const cssobjCase = caseName => {
  const cssobj = cssobjCore({
    local: true, // Add suffix to given class names
    plugins: [
      // order is important
      cssobjPluginLocalize({
        /*space: '_custom_', localNames: {}*/
      }), // Don't customize the output, defaults to random suffix
      cssobjPluginGencss({ indent: '\t', newLine: '\n' })
    ]
  })
  const cssObject = cssobj(toClasses(stylesheet))

  const html = renderBody(caseName, cssObject.mapClass('container'), cssObject.mapClass('button'))

  return renderHtml(cssObject.css, html)
}
