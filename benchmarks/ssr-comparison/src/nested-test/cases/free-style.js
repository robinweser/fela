import FreeStyle from 'free-style'
import { createContainerStyle, createButtonStyle } from '../styles'
import { renderHtml, renderBody } from '../render'

export const freeStyleCase = caseName => {
  const Style = FreeStyle.create()

  const options = { prefixPseudo: true }
  const html = renderBody(
    caseName,
    Style.registerStyle(createContainerStyle(options)),
    Style.registerStyle(createButtonStyle(options))
  )

  const css = Style.getStyles()

  return renderHtml(css, html)
}
