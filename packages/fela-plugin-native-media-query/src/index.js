/* eslint-disable import/no-unresolved, import/extensions */
import { Dimension } from 'react-native'

/* @flow */
import { match } from 'css-mediaquery'
import { isObject, isMediaQuery } from 'fela-utils'
import assignStyle from 'css-in-js-utils/lib/assignStyle'

type Orientation = 'landscape' | 'portrait'

function getOrientation(width: number, height: number): Orientation {
  return width > height ? 'landscape' : 'portrait'
}

function resolveMediaQuery(style: Object): Object {
  const { width, height } = Dimension.get('window')

  for (const property in style) {
    const value = style[property]

    if (
      isMediaQuery(property) &&
      isObject(value) &&
      match(property, {
        type: 'screen',
        orientation: getOrientation(width, height),
        width,
        height
      })
    ) {
      assignStyle(style, value)
      delete style[property]
    }
  }

  return style
}

export default () => resolveMediaQuery
