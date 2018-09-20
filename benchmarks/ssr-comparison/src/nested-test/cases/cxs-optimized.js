import cxs from 'cxs/optimized'
import { createContainerStyle, createButtonStyle } from '../styles'
import { renderHtml, renderBody } from '../render'

export const cxsOptimizedCase = caseName => {
  const html = renderBody(caseName, cxs(createContainerStyle()), cxs(createButtonStyle()))

  const { css } = cxs

  cxs.reset()

  return renderHtml(css, html)
}
