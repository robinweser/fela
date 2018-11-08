import FreeStyle from 'free-style'
import { containerStyle, buttonStyle, notUsedStyle } from '../styles'
import { renderHtml, renderBody } from '../render'

export const freeStyleCase = caseName => {
  const Style = FreeStyle.create()

  const html = renderBody(
    caseName,
    Style.registerStyle(containerStyle),
    Style.registerStyle(buttonStyle),
    Style.registerStyle(notUsedStyle)
  )

  const css = Style.getStyles()

  return renderHtml(css, html)
}
