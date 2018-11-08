import Styletron from 'styletron-server'
import { injectStyle } from 'styletron-utils'
import { containerStyle, buttonStyle, notUsedStyle } from '../styles'
import { renderHtml, renderBody } from '../render'

export const styletronCase = caseName => {
  const styletron = new Styletron()

  const html = renderBody(
    caseName,
    injectStyle(styletron, containerStyle),
    injectStyle(styletron, buttonStyle),
    injectStyle(styletron, notUsedStyle)
  )

  const css = styletron.getCss()

  return renderHtml(css, html)
}
