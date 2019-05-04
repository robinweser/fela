import { StyleSheet, css as aphroditeCss, StyleSheetServer, StyleSheetTestUtils } from 'aphrodite/no-important'
import { createStylesheet } from '../styles'
import { renderHtml, renderBody } from '../render'

export const aphroditeNoImportantCase = caseName => {
  const useStyles = StyleSheet.create(createStylesheet())

  const { html, css } = StyleSheetServer.renderStatic(() =>
    renderBody(caseName, aphroditeCss(useStyles.container), aphroditeCss(useStyles.button))
  )

  StyleSheetTestUtils.clearBufferAndResumeStyleInjection()

  return renderHtml(css.content, html)
}
