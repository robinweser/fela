import Styletron from 'styletron-server'
import { injectStyle } from 'styletron-utils'
import { containerStyle, buttonStyles } from '../styles'
import { renderHtml, renderBody } from '../render'

export const styletronCase = caseName => {
  const styletron = new Styletron()

  const getButtonClassName = i => injectStyle(styletron, buttonStyles[i])

  const html = renderBody(caseName, injectStyle(styletron, containerStyle), getButtonClassName)

  const css = styletron.getCss()

  return renderHtml(css, html)
}
