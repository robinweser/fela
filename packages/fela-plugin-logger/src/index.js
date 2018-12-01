/* @flow */
/* eslint-disable no-console */
import type { StyleType } from '../../../flowtypes/StyleType'

function addLogger(style: Object, type: StyleType): Object {
  if (process.env.NODE_ENV !== 'production') {
    console.log(type, { ...style })
  }

  return style
}

export default () => addLogger
