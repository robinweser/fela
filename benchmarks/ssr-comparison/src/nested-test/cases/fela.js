import { createRenderer } from 'fela'
import { renderToString } from 'fela-tools'
import { createContainerStyle, createButtonStyle } from '../styles'
import { renderHtml, renderBody } from '../render'

export const felaCase = caseName => {
  const renderer = createRenderer()

  const html = renderBody(
    caseName,
    renderer.renderRule(createContainerStyle),
    renderer.renderRule(createButtonStyle)
  )

  const css = renderToString(renderer)

  return renderHtml(css, html)
}
