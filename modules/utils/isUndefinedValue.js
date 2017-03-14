export default function isUndefinedValue(value) {
  return value === undefined || (typeof value === 'string' && value.indexOf('undefined') > -1)
}
