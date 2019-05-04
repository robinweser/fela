/* @flow  */
import {
  RULE_TYPE,
  KEYFRAME_TYPE,
  isNestedSelector,
  isMediaQuery,
  isSupport,
} from 'fela-utils'
import cssifyDeclaration from 'css-in-js-utils/lib/cssifyDeclaration'
import isPlainObject from 'isobject'
import { CSSLint } from 'csslint'

import type { StyleType } from '../../../flowtypes/StyleType'

const defaultRules = CSSLint.getRules().reduce(
  (rules, { id }) => ({
    ...rules,
    [id]: 1,
  }),
  {}
)

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
  deleteInvalid: boolean,
  useCSSLint: boolean,
  cssRules: Object
): void {
  for (const property in style) {
    const value = style[property]

    if (isPlainObject(value)) {
      if (
        isNestedSelector(property) ||
        isMediaQuery(property) ||
        isSupport(property)
      ) {
        validateStyleObject(
          value,
          logInvalid,
          deleteInvalid,
          useCSSLint,
          cssRules
        )
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
    } else if (useCSSLint) {
      const { messages } = CSSLint.verify(
        `.fela {${cssifyDeclaration(property, value)};}`,
        cssRules
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
  deleteInvalid: boolean,
  useCSSLint: boolean,
  cssRules: Object
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
      validateStyleObject(
        value,
        logInvalid,
        deleteInvalid,
        useCSSLint,
        cssRules
      )
    }
  }
}

function validateStyle(
  style: Object,
  type: StyleType,
  options: Object
): Object {
  const { logInvalid, deleteInvalid, useCSSLint, cssRules } = options

  if (type === KEYFRAME_TYPE) {
    validateKeyframeObject(
      style,
      logInvalid,
      deleteInvalid,
      useCSSLint,
      cssRules
    )
  } else if (type === RULE_TYPE) {
    validateStyleObject(style, logInvalid, deleteInvalid, useCSSLint, cssRules)
  }

  return style
}

const defaultOptions = {
  logInvalid: true,
  deleteInvalid: false,
  useCSSLint: false,
}

export default function validator(options: Object = {}) {
  const { useCSSLint } = options
  const preparedOptions = {
    ...defaultOptions,
    ...options,
  }

  preparedOptions.cssRules = isPlainObject(useCSSLint)
    ? {
        ...defaultRules,
        ...useCSSLint,
      }
    : defaultRules

  return (style: Object, type: StyleType) =>
    validateStyle(style, type, preparedOptions)
}
