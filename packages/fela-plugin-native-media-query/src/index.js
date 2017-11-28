/* eslint-disable import/no-unresolved, import/extensions */
import { Dimensions } from 'react-native'

/* @flow */
import { match } from 'css-mediaquery'
import { isMediaQuery } from 'fela-utils'

import DimensionProvider from './components/DimensionProvider'

type Orientation = 'landscape' | 'portrait'

function isPlainObject(obj: any): boolean {
  return typeof obj === 'object' && !Array.isArray(obj)
}

function getOrientation(width: number, height: number): Orientation {
  return width > height ? 'landscape' : 'portrait'
}

function resolveMediaQuery(style: Object): Object {
  const { width, height } = Dimensions.get('window')
  for (const property in style) {
    const value = style[property]

    if (isMediaQuery(property) && isPlainObject(value)) {
      if (
        match(property.slice(6).trim(), {
          type: 'screen',
          orientation: getOrientation(width, height),
          width,
          height,
        })
      ) {
        renderer._mergeStyle(style, value)
      }

      delete style[property]
    }
  }

  return style
}

export default () => resolveMediaQuery

export { DimensionProvider }
