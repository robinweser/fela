import { createRenderer } from 'fela'
import { renderToString } from 'fela-tools'
import { containerStyle, buttonStyle, notUsedStyle } from '../styles'
import { renderHtml, renderBody } from '../render'

export const felaCase = caseName => {
  const renderer = createRenderer()

  const html = renderBody(
    caseName,
    renderer.renderRule(() => containerStyle),
    renderer.renderRule(() => buttonStyle),
    renderer.renderRule(() => notUsedStyle)
  )

  const css = renderToString(renderer)

  return renderHtml(css, html)
}
