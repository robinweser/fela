/* @flow weak */
import { RULE_TYPE, KEYFRAME_TYPE } from '../utils/styleTypes'

import isObject from '../utils/isObject'
import isNestedSelector from '../utils/isNestedSelector'

const percentageRegex = /from|to|%/

function validateStyleObject(style, logInvalid, deleteInvalid) {
  for (const property in style) {
    const value = style[property]

    if (isObject(value)) {
      if (isNestedSelector(property)) {
        validateStyleObject(value, logInvalid, deleteInvalid)
      } else {
        if (deleteInvalid) {
          delete style[property]
        }
        if (logInvalid) {
          console.error(
            `${deleteInvalid ? '[Deleted] ' : ' '}Invalid nested property. Only use nested media queries, pseudo classes, child selectors or &-combinators.
              Maybe you forgot to add a plugin that resolves "${property}".`,
            {
              property,
              value
            }
          )
        }
      }
    }
  }
}

function isValidPercentage(percentage) {
  const percentageValue = parseFloat(percentage)

  return percentage.indexOf('%') > -1 && (percentageValue < 0 || percentageValue > 100)
}

function validateKeyframeObject(style, logInvalid, deleteInvalid) {
  for (const percentage in style) {
    const value = style[percentage]
    if (!isObject(value)) {
      if (logInvalid) {
        console.error(
          `${deleteInvalid ? '[Deleted] ' : ' '}Invalid keyframe value. An object was expected.`,
          {
            percentage,
            style: value
          }
        )
      }
      if (deleteInvalid) {
        delete style[percentage]
      }
    } else {
      // check for invalid percentage values, it only allows from, to or 0% - 100%
      if (!percentageRegex.test(percentage) || !isValidPercentage(percentage)) {
        if (logInvalid) {
          console.error(
            `${deleteInvalid ? '[Deleted] ' : ' '}Invalid keyframe property.
              Expected either \`to\`, \`from\` or a percentage value between 0 and 100.`,
            {
              percentage,
              style: value
            }
          )
        }
        if (deleteInvalid) {
          delete style[percentage]
        }
      }
    }
  }
}

function validator(style, type, options) {
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
  deleteInvalid: false
}
export default options =>
  (style, props, type) =>
    validator(style, type, {
      ...defaultOptions,
      ...options
    })
