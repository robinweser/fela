/* @flow  */
import {
  RULE_TYPE,
  KEYFRAME_TYPE,
  isNestedSelector,
  isMediaQuery,
  isSupport,
} from 'fela-utils'
import cssifyDeclaration from 'css-in-js-utils/lib/cssifyDeclaration'
import { CSSLint } from 'csslint'

import type { StyleType } from '../../../flowtypes/StyleType'

function isPlainObject(obj: any): boolean {
  return typeof obj === 'object' && !Array.isArray(obj)
}

function handleError(
  property: string,
  style: Object,
  logInvalid: boolean,
  deleteInvalid: boolean,
  message: string,
  logObject: any
): void {
  if (deleteInvalid) {
    delete style[property]
  }
  if (logInvalid) {
    /* eslint-disable-next-line no-console */
    console.error(`${deleteInvalid ? '[Deleted] ' : ' '}${message}`, logObject)
  }
}

function validateStyleObject(
  style: Object,
  logInvalid: boolean,
  deleteInvalid: boolean
): void {
  for (const property in style) {
    const value = style[property]

    if (isPlainObject(value)) {
      if (
        isNestedSelector(property) ||
        isMediaQuery(property) ||
        isSupport(property)
      ) {
        validateStyleObject(value, logInvalid, deleteInvalid)
      } else {
        handleError(
          property,
          style,
          logInvalid,
          deleteInvalid,
          `Invalid nested property. Only use nested media queries, pseudo classes, child selectors or &-combinators.
          Maybe you forgot to add a plugin that resolves "${property}".`,
          {
            property,
            value,
          }
        )
      }
    } else {
      const { messages } = CSSLint.verify(
        `.fela {${cssifyDeclaration(property, value)};}`
      )
      messages.forEach(({ message }) => {
        handleError(
          property,
          style,
          logInvalid,
          deleteInvalid,
          `Invalid property "${property}" with value "${value}". ${message.replace(
            / at line .+, col .+\./,
            '.'
          )}`,
          {
            property,
            value,
          }
        )
      })
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
      handleError(
        percentage,
        style,
        logInvalid,
        deleteInvalid,
        'Invalid keyframe value. An object was expected.',
        {
          percentage,
          style: value,
        }
      )
      // check for invalid percentage values, it only allows from, to or 0% - 100%
    } else if (
      percentage !== 'from' &&
      percentage !== 'to' &&
      !isValidPercentage(percentage)
    ) {
      handleError(
        percentage,
        style,
        logInvalid,
        deleteInvalid,
        `Invalid keyframe property.
        Expected either \`to\`, \`from\` or a percentage value between 0 and 100.`,
        {
          percentage,
          style: value,
        }
      )
    } else {
      validateStyleObject(value, logInvalid, deleteInvalid)
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
