import { createRenderer } from 'fela'
import embedded from 'fela-plugin-embedded'
import prefixer from 'fela-plugin-prefixer'
import fallbackValue from 'fela-plugin-fallback-value'
// import unit from 'fela-plugin-unit'
import validator from 'fela-plugin-validator'
import logger from 'fela-plugin-logger'
import perf from 'fela-perf'
import beautifier from 'fela-beautifier'
import layoutDebugger from 'fela-layout-debugger'
import sortMediaQueryMobileFirst from 'fela-sort-media-query-mobile-first'

function unit(props) {
  if (
    typeof props.value === 'number' ||
    (typeof props.value === 'string' && props.value == parseFloat(props.value))
  ) {
    props.value += 'px'
  }

  return props
}

function embedded(props, renderer) {
  if (props.property === 'fontFace' && typeof props.value === 'object') {
    props.property = 'fontFamily'
    props.value = renderer.renderFont(value.fontFamily, value.src)
  }

  return props
}

export default () => {
  const renderer = createRenderer({
    // optimizePlugins: true,
    optimizeCaching: true,
    devMode: true,
    plugins: [
      embedded(),
      // unit(),
      fallbackValue(),
      prefixer(),
      validator(),
      logger(),
    ],
    rulePlugins: [unit],
    enhancers: [perf(), beautifier(), sortMediaQueryMobileFirst()],
  })

  renderer.renderStatic(
    {
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      fontFamily: 'Lato',
    },
    'html,body,#app'
  )

  renderer.renderStatic({ display: 'flex' }, 'div')
  return renderer
}
