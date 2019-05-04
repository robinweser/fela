import { create } from 'jss'
import cache from 'jss-cache'
import nested from 'jss-nested'
import camelCase from 'jss-camel-case'
import { createStylesheet } from '../styles'
import { renderHtml, renderBody } from '../render'

export const jssWithoutPresetCase = caseName => {
  const cachePlugin = cache()
  const camelCasePlugin = camelCase()
  const nestedPlugin = nested()

  const jss = create()
  jss.use(cachePlugin, nested, camelCasePlugin)

  const options = { prefixPseudo: true }
  const sheet = jss.createStyleSheet(createStylesheet(options)).attach()
  const { classes: { container, button } } = sheet

  const html = renderBody(caseName, container, button)

  const css = sheet.toString()

  return renderHtml(css, html)
}
