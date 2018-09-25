/* eslint-disable import/no-unresolved, import/extensions */
import { StyleSheet } from 'react-native'
/* @flow */
import arrayEach from 'fast-loops/lib/arrayEach'
import { processStyleWithPlugins, RULE_TYPE, CLEAR_TYPE } from 'fela-utils'

import type {
  NativeRenderer,
  NativeRendererConfig,
} from '../../../flowtypes/NativeRenderer'

export function createRenderer(
  config: NativeRendererConfig = {}
): NativeRenderer {
  let renderer: NativeRenderer = {
    listeners: [],
    cache: {},
    plugins: config.plugins || [],
    isNativeRenderer: true,

    clear(): void {
      renderer.cache = {}

      renderer._emitChange({
        type: CLEAR_TYPE,
      })
    },

    subscribe(callback: Function): { unsubscribe: Function } {
      renderer.listeners.push(callback)

      return {
        unsubscribe: () =>
          renderer.listeners.splice(renderer.listeners.indexOf(callback), 1),
      }
    },

    renderRule(rule: Function, props: Object = {}): Object {
      const processedStyle = processStyleWithPlugins(
        renderer,
        rule(props, renderer),
        RULE_TYPE,
        props
      )

      const reference = JSON.stringify(processedStyle)

      if (!renderer.cache.hasOwnProperty(reference)) {
        renderer.cache[reference] = StyleSheet.create({
          style: processedStyle,
        })

        renderer._emitChange({
          type: RULE_TYPE,
          style: processedStyle,
        })
      }

      return renderer.cache[reference].style
    },

    _emitChange(change: Object): void {
      arrayEach(renderer.listeners, listener => listener(change))
    },
  }

  if (config.enhancers) {
    arrayEach(config.enhancers, enhancer => {
      renderer = enhancer(renderer)
    })
  }

  return renderer
}
