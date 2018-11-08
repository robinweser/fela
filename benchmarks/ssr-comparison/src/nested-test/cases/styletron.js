import Styletron from 'styletron-server'
import { injectStyle } from 'styletron-utils'
import { createContainerStyle, createButtonStyle } from '../styles'
import { renderHtml, renderBody } from '../render'

export const styletronCase = caseName => {
  const styletron = new Styletron()

  const html = renderBody(
    caseName,
    injectStyle(styletron, createContainerStyle()),
    injectStyle(styletron, createButtonStyle())
  )

  const css = styletron.getCss()

  return renderHtml(css, html)
}
