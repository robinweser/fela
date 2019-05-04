/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'

const defaultGenerator = (identifierName?: string, index: number): string =>
  index.toString()

const isRenderer = (renderer: DOMRenderer): boolean =>
  renderer && renderer.renderRule

type IdentifierConfig = {
  prefix?: string,
  generator?: Function,
}

export default function identifier(config?: IdentifierConfig = {}) {
  const { prefix = 'fela-identifier' } = config
  const { generator = defaultGenerator } = config

  const idRepository = {}
  let index = 0
  let enhanced = false

  return (identifierName?: string | DOMRenderer) => {
    if (isRenderer(identifierName)) {
      enhanced = true
      const renderer: DOMRenderer = identifierName
      const existingFilterClassName = renderer.filterClassName.bind(renderer)
      const existingRenderRule = renderer.renderRule.bind(renderer)

      renderer.filterClassName = className =>
        existingFilterClassName(className) && !idRepository[className]

      renderer.renderRule = (rule, props) => {
        const idClassNames = []
        const style = rule(props, renderer)
        const cleanedStyle = objectReduce(
          style,
          (newStyle, value, key) => {
            const identifierKey = key.replace(/^--/, '')

            if (idRepository[identifierKey]) {
              idClassNames.push(idRepository[identifierKey].className)
              return newStyle
            }

            return {
              ...newStyle,
              [key]: value,
            }
          },
          {}
        )

        const modifiedRule = () => cleanedStyle
        Object.assign(modifiedRule, rule)

        return [...idClassNames, existingRenderRule(modifiedRule)].join(' ')
      }

      return renderer
    }

    if (!enhanced) {
      throw new Error(
        'You are trying to create a new identifier before you used the identifier as an enhancer. ' +
          'Please add the identifier as an enhancer in the configuration of the renderer.'
      )
    }

    const identifierKey = [
      prefix,
      identifierName,
      generator(identifierName, index++),
    ]
      .filter(chunk => chunk)
      .join('-')

    const identifierRule = (() => ({
      [`--${identifierKey}`]: '',
    }): {
      className?: string,
      toString?: () => string,
    })

    identifierRule.className = identifierKey
    identifierRule.toString = () => identifierKey

    idRepository[identifierKey] = identifierRule

    return identifierRule
  }
}
