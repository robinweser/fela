import cxs from 'cxs/optimized'
import { containerStyle, buttonStyles } from '../styles'
import { renderHtml, renderBody } from '../render'

export const cxsOptimizedCase = caseName => {
  const getButtonClassName = i => cxs(buttonStyles[i])

  const html = renderBody(caseName, cxs(containerStyle), getButtonClassName)

  const { css } = cxs

  cxs.reset()

  return renderHtml(css, html)
}
