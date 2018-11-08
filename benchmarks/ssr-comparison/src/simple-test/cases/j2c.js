import j2c from 'j2c'

import { stylesheet } from '../styles'
import { renderHtml, renderBody } from '../render'
import { toClasses } from '../../utilities'

export const j2cCase = caseName => {
  const css = j2c.sheet(toClasses(stylesheet))

  const html = renderBody(caseName, css.container, css.button)

  return renderHtml(css, html)
}
