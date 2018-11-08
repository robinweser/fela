import { create } from 'jss'
import cache from 'jss-cache'
import camelCase from 'jss-camel-case'
import { stylesheet } from '../styles'
import { renderHtml, renderBody } from '../render'

export const jssWithoutPresetCase = caseName => {
  const cachePlugin = cache()
  const camelCasePlugin = camelCase()

  const jss = create()
  jss.use(cachePlugin, camelCasePlugin)

  const sheet = jss.createStyleSheet(stylesheet).attach()
  const { classes: { container, button } } = sheet

  const html = renderBody(caseName, container, button)

  const css = sheet.toString()

  return renderHtml(css, html)
}
