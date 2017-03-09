export default function isObject(value) {
  return typeof value === 'object' && !Array.isArray(value)
}
