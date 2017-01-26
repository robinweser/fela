/* eslint-disable import/no-unresolved, import/extensions */
import { StyleSheet } from 'react-native'

import processStyleWithPlugins from '../utils/processStyleWithPlugins'
import { RULE_TYPE } from '../utils/styleTypes'

export default function createRenderer(config = {}) {
  let renderer = {
    listeners: [],
    plugins: config.plugins || [],
    clear() {
      renderer.cache = {}
      renderer.ids = []
    },
    renderRule(rule, props = {}) {
      const style = rule(props)
      const reference = JSON.stringify(style)

      if (!renderer.cache[reference]) {
        const processedStyle = processStyleWithPlugins(renderer.plugins, style, RULE_TYPE)
        renderer.cache[reference] = StyleSheet.create({ style: processedStyle })
      }

      return renderer.cache[reference].style
    }
  }

  // initial setup
  renderer.clear()

  if (config.enhancers) {
    for (let i = 0, len = config.enhancers.length; i < len; ++i) {
      renderer = config.enhancers[i](renderer)
    }
  }

  return renderer
}
