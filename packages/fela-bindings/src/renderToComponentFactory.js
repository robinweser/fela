/* @flow */
import {
  objectReduce,
  clusterCache,
  getRehydrationIndex,
  RULE_TYPE,
  KEYFRAME_TYPE,
  FONT_TYPE,
  STATIC_TYPE
} from 'fela-utils'

import type { DOMRenderer } from '../../../../flowtypes/DOMRenderer'
import type { StyleType } from '../../../../flowtypes/StyleType'

const sheetMap = {
  fontFaces: FONT_TYPE,
  statics: STATIC_TYPE,
  keyframes: KEYFRAME_TYPE,
  rules: RULE_TYPE
}

export default function renderToComponentFactory(
  createElement: Function
): Function {
  function createStyleElement(
    css: string,
    rehydrationIndex: number,
    type: StyleType,
    media: string = ''
  ) {
    const styleProps = {
      dangerouslySetInnerHTML: { __html: css },
      'data-fela-rehydration': rehydrationIndex,
      'data-fela-type': type,
      type: 'text/css'
    }

    if (media.length > 0) {
      styleProps.media = media
    }

    return createElement('style', styleProps)
  }

  return function renderToComponent(renderer: DOMRenderer): any {
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
