import { StyleSheet, css as aphroditeCss, StyleSheetServer, StyleSheetTestUtils } from 'aphrodite'
import { createStylesheet } from '../styles'
import { renderHtml, renderBody } from '../render'

export const aphroditeCase = caseName => {
  const useStyles = StyleSheet.create(createStylesheet())

  const { html, css } = StyleSheetServer.renderStatic(() =>
    renderBody(caseName, aphroditeCss(useStyles.container), aphroditeCss(useStyles.button))
  )

  StyleSheetTestUtils.clearBufferAndResumeStyleInjection()

  return renderHtml(css.content, html)
}
