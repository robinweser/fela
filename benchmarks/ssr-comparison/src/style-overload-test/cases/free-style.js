import FreeStyle from 'free-style'
import { containerStyle, buttonStyles } from '../styles'
import { renderHtml, renderBody } from '../render'

export const freeStyleCase = caseName => {
  const Style = FreeStyle.create()

  const getButtonClassName = i => Style.registerStyle(buttonStyles[i])

  const html = renderBody(caseName, Style.registerStyle(containerStyle), getButtonClassName)

  const css = Style.getStyles()

  return renderHtml(css, html)
}
