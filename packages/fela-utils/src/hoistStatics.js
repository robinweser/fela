/* @flow */
import arrayEach from './arrayEach'

const basicStatics = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
}

const mergableStatics = [
  'childContextTypes',
  'contextTypes',
  'defaultProps',
  'propTypes'
]

export default function hoistStatics(target: Object, source: Object): Object {
  if (typeof source === 'string') {
    return target
  }

  const statics = Object.getOwnPropertyNames(source).filter(
    property => !basicStatics[property]
  )

  arrayEach(statics, property => {
    if (!target.hasOwnProperty(property)) {
      try {
        // Avoid failures from read-only properties
        const descriptor = Object.getOwnPropertyDescriptor(source, property)
        Object.defineProperty(target, property, descriptor)
      } catch (e) {}
    }
  })

  arrayEach(mergableStatics, property => {
    if (source[property]) {
      const targetStatics = target[property] || {}

      target[property] = {
        ...source[property],
        ...targetStatics
      }
    }
  })

  return target
}
