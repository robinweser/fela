import j2c from 'j2c'

import { stylesheet, buttonClassNames } from '../styles'
import { renderHtml, renderBody } from '../render'
import { toClasses } from '../../utilities'

export const j2cCase = caseName => {
  const css = j2c.sheet(toClasses(stylesheet))

  const getButtonClassName = i => css[buttonClassNames[i]]

  const html = renderBody(caseName, css.container, getButtonClassName)

  return renderHtml(css, html)
}
