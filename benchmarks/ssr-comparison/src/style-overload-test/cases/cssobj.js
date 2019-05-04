// See simple-test for details
import cssobjCore from 'cssobj-core'
import cssobjPluginLocalize from 'cssobj-plugin-localize'
import cssobjPluginGencss from 'cssobj-plugin-gencss'

import { stylesheet, buttonClassNames } from '../styles'
import { renderHtml, renderBody } from '../render'
import { toClasses } from '../../utilities'

export const cssobjCase = caseName => {
  const cssobj = cssobjCore({
    local: true,
    plugins: [
      cssobjPluginLocalize(),
      cssobjPluginGencss({ indent: '', newLine: '' }) // To be fair, reduce size of generated code; still add space after colon and class name.
    ]
  })
  const cssObject = cssobj(toClasses(stylesheet))

  const getButtonClassName = i => cssObject.mapClass(buttonClassNames[i])

  const html = renderBody(caseName, cssObject.mapClass('container'), getButtonClassName)

  return renderHtml(cssObject.css, html)
}
