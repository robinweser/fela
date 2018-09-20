// See simple-test for details
import cssobjCore from 'cssobj-core'
import cssobjPluginLocalize from 'cssobj-plugin-localize'
import cssobjPluginGencss from 'cssobj-plugin-gencss'

import { createStylesheet } from '../styles'
import { renderHtml, renderBody } from '../render'
import { toClasses } from '../../utilities'

export const cssobjCase = caseName => {
  const cssobj = cssobjCore({
    local: true,
    plugins: [cssobjPluginLocalize(), cssobjPluginGencss({ indent: '\t', newLine: '\n' })]
  })
  const options = { prefixPseudo: true }
  const cssObject = cssobj(toClasses(createStylesheet(options)))

  const html = renderBody(caseName, cssObject.mapClass('container'), cssObject.mapClass('button'))

  return renderHtml(cssObject.css, html)
}
