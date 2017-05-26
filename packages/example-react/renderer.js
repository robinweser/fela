import { createRenderer } from 'fela'
import prefixer from 'fela-plugin-prefixer'
import fallbackValue from 'fela-plugin-fallback-value'
import unit from 'fela-plugin-unit'
import lvha from 'fela-plugin-lvha'
import validator from 'fela-plugin-validator'
import logger from 'fela-plugin-logger'

import perf from 'fela-perf'
import beautifier from 'fela-beautifier'
import fontRenderer from 'fela-font-renderer'

export default (fontNode) => {
  const renderer = createRenderer({
    plugins: [prefixer(), fallbackValue(), unit(), lvha(), validator()],
    enhancers: [perf(), beautifier(), fontRenderer(fontNode)]
  })

  renderer.renderStatic(
    {
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      fontFamily: 'Lato'
    },
    'html,body,#app'
  )

  renderer.renderStatic({ display: 'flex' }, 'div')
  renderer.renderFont('Lato', [
    'https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff'
  ])

  return renderer
}
