const cache = {}

export function deprecate(message) {
  if (process.env.NODE_ENV !== 'production' && !cache[message]) {
    console.warn(message)
    cache[message] = true
  }
}

export function interceptDeprecation(component, message) {
  deprecate(message)
  return component
}

export function pipeDeprecation(method, message) {
  deprecate(message)
  return (...args) => method(...args)
}
