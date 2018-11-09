const cache = {}
const isProd = process.env.NODE_ENV === 'production'

export function deprecate(message) {
  if (!isProd && !cache[message]) {
    console.warn(message)
    cache[message] = true
  }
}

export function interceptDeprecation(component, message) {
  deprecate(message)
  return component
}
