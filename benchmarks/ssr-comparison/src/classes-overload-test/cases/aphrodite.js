import { StyleSheet, css as aphroditeCss, StyleSheetServer, StyleSheetTestUtils } from 'aphrodite'
import { stylesheet, buttonClassNames } from '../styles'
import { renderHtml, renderBody } from '../render'

export const aphroditeCase = caseName => {
  const useStyles = StyleSheet.create(stylesheet)

  const getButtonClassName = i => aphroditeCss(useStyles[buttonClassNames[i]])

  const { html, css } = StyleSheetServer.renderStatic(() => {
    return renderBody(caseName, aphroditeCss(useStyles.container), getButtonClassName)
  })

  StyleSheetTestUtils.clearBufferAndResumeStyleInjection()

  return renderHtml(css.content, html)
}
