const cache = {}
const isProd = process.env.NODE_ENV === 'production'

export default function deprecate(message) {
  if (!isProd && !cache[message]) {
    console.warn(message)
    cache[message] = true
  }
}
