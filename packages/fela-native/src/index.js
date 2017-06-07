/* eslint-disable import/no-unresolved, import/extensions */
import { StyleSheet } from 'react-native'

/* @flow */
import { processStyleWithPlugins, arrayEach, RULE_TYPE } from 'fela-utils'

import type {
  NativeRenderer,
  NativeRendererConfig
} from '../../../flowtypes/NativeRenderer'

export function createRenderer(
  config: NativeRendererConfig = {}
): NativeRenderer {
  let renderer: NativeRenderer = {
    listeners: [],
    plugins: config.plugins || [],
    isNativeRenderer: true,

    clear(): void {
      renderer.cache = {}
      renderer.ids = []
    },

    renderRule(rule: Function, props: Object = {}): Object {
      const style = rule(props)
      const reference = JSON.stringify(style)

      if (!renderer.cache.hasOwnProperty(reference)) {
        const processedStyle = processStyleWithPlugins(
          renderer,
          style,
          RULE_TYPE
        )
        renderer.cache[reference] = StyleSheet.create({
          style: processedStyle
        })
      }

      return renderer.cache[reference].style
    }
  }

  // initial setup
  renderer.clear()

  if (config.enhancers) {
    arrayEach(config.enhancers, enhancer => {
      renderer = enhancer(renderer)
    })
  }

  return renderer
}
