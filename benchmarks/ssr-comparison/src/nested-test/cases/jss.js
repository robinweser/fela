import { create } from 'jss'
import cache from 'jss-cache'
import preset from 'jss-preset-default'
import { createStylesheet } from '../styles'
import { renderHtml, renderBody } from '../render'

export const jssCase = caseName => {
  const settings = preset()
  settings.plugins.unshift(cache())

  const jss = create(settings)

  const options = { prefixPseudo: true }
  const sheet = jss.createStyleSheet(createStylesheet(options)).attach()
  const { classes: { container, button } } = sheet

  const html = renderBody(caseName, container, button)

  const css = sheet.toString()

  return renderHtml(css, html)
}
