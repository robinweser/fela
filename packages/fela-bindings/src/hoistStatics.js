/* @flow */
import forEach from 'lodash/forEach'

const basicStatics = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true,
}

const mergableStatics = ['contextTypes', 'defaultProps']
const blockedStatics = { childContextTypes: true, propTypes: true }

export default function hoistStatics(target: any, source: any): any {
  if (typeof source === 'string') {
    return target
  }

  const statics = Object.getOwnPropertyNames(source).filter(
    property => !basicStatics[property]
  )

  forEach(statics, property => {
    if (!target.hasOwnProperty(property) && !blockedStatics[property]) {
      try {
        // Avoid failures from read-only properties
        const descriptor = Object.getOwnPropertyDescriptor(source, property)
        Object.defineProperty(target, property, descriptor)
      } catch (e) {}
    }
  })

  forEach(mergableStatics, property => {
    if (source[property]) {
      const targetStatics = target[property] || {}

      target[property] = {
        ...source[property],
        ...targetStatics,
      }
    }
  })

  return target
}
