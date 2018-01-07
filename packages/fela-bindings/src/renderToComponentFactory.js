/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'
import {
  clusterCache,
  getRehydrationIndex,
  sheetMap,
  RULE_TYPE,
} from 'fela-utils'

import type { DOMRenderer } from '../../../flowtypes/DOMRenderer'
import type { StyleType } from '../../../flowtypes/StyleType'

export default function renderToComponentFactory(
  createElement: Function
): Function {
  function createStyleElement(
    css: string,
    rehydrationIndex: number,
    type: StyleType,
    media: string = ''
  ) {
    const styleProps: Object = {
      dangerouslySetInnerHTML: { __html: css },
      'data-fela-rehydration': rehydrationIndex,
      'data-fela-type': type,
      type: 'text/css',
    }

    if (media.length > 0) {
      styleProps.media = media
    }

    return createElement('style', styleProps)
  }

  return function renderToComponent(renderer: DOMRenderer): any {
    const cacheCluster = clusterCache(renderer.cache, renderer.mediaQueryOrder)
    const rehydrationIndex = getRehydrationIndex(renderer)

    const componentList = objectReduce(
      sheetMap,
      (list, type, key) => {
        if (cacheCluster[key].length > 0) {
          list.push(
            createStyleElement(cacheCluster[key], rehydrationIndex, type)
          )
        }

        return list
      },
      []
    )

    return objectReduce(
      cacheCluster.mediaRules,
      (list, css, media) => {
        if (css.length > 0) {
          list.push(createStyleElement(css, rehydrationIndex, RULE_TYPE, media))
        }

        return list
      },
      componentList
    )
  }
}
