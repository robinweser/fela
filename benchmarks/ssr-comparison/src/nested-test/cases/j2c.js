import j2c from 'j2c'

import { createStylesheet } from '../styles'
import { renderHtml, renderBody } from '../render'
import { toClasses } from '../../utilities'

export const j2cCase = caseName => {
  const options = { prefixPseudo: true }
  const css = j2c.sheet(toClasses(createStylesheet(options)))

  const html = renderBody(caseName, css.container, css.button)

  return renderHtml(css, html)
}
