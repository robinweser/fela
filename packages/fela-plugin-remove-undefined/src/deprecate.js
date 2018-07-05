const cache = {}

export default function deprecate(message) {
  if (process.env.NODE_ENV !== 'production' && !cache[message]) {
    console.warn(message)
    cache[message] = true
  }
}
