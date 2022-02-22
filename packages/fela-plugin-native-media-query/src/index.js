/* eslint-disable import/no-unresolved, import/extensions */
import { Dimensions } from 'react-native'

import isPlainObject from 'isobject'
import { match } from 'css-mediaquery'
import { isMediaQuery } from 'fela-utils'
import { assignStyle } from 'css-in-js-utils'

import DimensionProvider from './components/DimensionProvider'

function getOrientation(width, height) {
  return width > height ? 'landscape' : 'portrait'
}

function nativeMediaQueryPlugin(style) {
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
        assignStyle(style, value)
      }

      delete style[property]
    }
  }

  return style
}

export default function nativeMediaQuery() {
  return nativeMediaQueryPlugin
}

export { DimensionProvider }
