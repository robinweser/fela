const cache = {}
const isProd = process.env.NODE_ENV === 'production'

export default function deprecate(condition, message, effect) {
  if (condition) {
    if (!isProd && !cache[message]) {
      console.warn(message)
      cache[message] = true
    }

    if (effect) {
      effect()
    }
  }
}
