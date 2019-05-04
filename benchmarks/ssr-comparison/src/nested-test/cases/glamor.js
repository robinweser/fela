import { renderStatic } from 'glamor/server'
import { style, flush } from 'glamor'
import { createContainerStyle, createButtonStyle } from '../styles'
import { renderHtml, renderBody } from '../render'

export const glamorCase = caseName => {
  const { html, css } = renderStatic(() =>
    renderBody(caseName, style(createContainerStyle()), style(createButtonStyle()))
  )

  flush()

  return renderHtml(css, html)
}
