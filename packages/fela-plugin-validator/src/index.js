/* @flow  */
/* eslint-disable no-console */
import isPlainObject from 'lodash/isPlainObject'

import {
  RULE_TYPE,
  KEYFRAME_TYPE,
  isNestedSelector,
  isMediaQuery,
} from 'fela-utils'

import type { StyleType } from '../../../flowtypes/StyleType'

function validateStyleObject(
  style: Object,
  logInvalid: boolean,
  deleteInvalid: boolean
): void {
  for (const property in style) {
    const value = style[property]

    if (isPlainObject(value)) {
      if (isNestedSelector(property) || isMediaQuery(property)) {
        validateStyleObject(value, logInvalid, deleteInvalid)
      } else {
        if (deleteInvalid) {
          delete style[property]
        }
        if (logInvalid) {
          console.error(
            `${deleteInvalid
              ? '[Deleted] '
              : ' '}Invalid nested property. Only use nested media queries, pseudo classes, child selectors or &-combinators.
              Maybe you forgot to add a plugin that resolves "${property}".`,
            {
              property,
              value,
            }
          )
        }
      }
    }
  }
}

function isValidPercentage(percentage: string): boolean {
  const percentageValue = parseFloat(percentage)

  return (
    percentage.indexOf('%') !== -1 &&
    (percentageValue >= 0 && percentageValue <= 100)
  )
}

function validateKeyframeObject(
  style: Object,
  logInvalid: boolean,
  deleteInvalid: boolean
): void {
  for (const percentage in style) {
    const value = style[percentage]
    if (!isPlainObject(value)) {
      if (logInvalid) {
        console.error(
          `${deleteInvalid
            ? '[Deleted] '
            : ' '}Invalid keyframe value. An object was expected.`,
          {
            percentage,
            style: value,
          }
        )
      }
      if (deleteInvalid) {
        delete style[percentage]
      }
      // check for invalid percentage values, it only allows from, to or 0% - 100%
    } else if (
      percentage !== 'from' &&
      percentage !== 'to' &&
      !isValidPercentage(percentage)
    ) {
      if (logInvalid) {
        console.error(
          `${deleteInvalid ? '[Deleted] ' : ' '}Invalid keyframe property.
              Expected either \`to\`, \`from\` or a percentage value between 0 and 100.`,
          {
            percentage,
            style: value,
          }
        )
      }
      if (deleteInvalid) {
        delete style[percentage]
      }
    }
  }
}

function validateStyle(
  style: Object,
  type: StyleType,
  options: Object
): Object {
  const { logInvalid, deleteInvalid } = options

  if (type === KEYFRAME_TYPE) {
    validateKeyframeObject(style, logInvalid, deleteInvalid)
  } else if (type === RULE_TYPE) {
    validateStyleObject(style, logInvalid, deleteInvalid)
  }

  return style
}

const defaultOptions = {
  logInvalid: true,
  deleteInvalid: false,
}

export default function validator(options: Object = {}) {
  return (style: Object, type: StyleType) =>
    validateStyle(style, type, {
      ...defaultOptions,
      ...options,
    })
}
