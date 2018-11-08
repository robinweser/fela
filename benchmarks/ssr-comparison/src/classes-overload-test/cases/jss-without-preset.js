import { create } from 'jss'
import cache from 'jss-cache'
import camelCase from 'jss-camel-case'
import { stylesheet, buttonClassNames } from '../styles'
import { renderHtml, renderBody } from '../render'

export const jssWithoutPresetCase = caseName => {
  const cachePlugin = cache()
  const camelCasePlugin = camelCase()

  const jss = create()
  jss.use(cachePlugin, camelCasePlugin)

  const sheet = jss.createStyleSheet(stylesheet).attach()
  const { classes } = sheet

  const getButtonClassName = i => classes[buttonClassNames[i]]

  const html = renderBody(caseName, classes.container, getButtonClassName)
  const css = sheet.toString()

  return renderHtml(css, html)
}
