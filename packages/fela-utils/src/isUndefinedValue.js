const FALSY_REGEX = /undefined|null/
const URL_REGEX = /url/

export default function isUndefinedValue(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' &&
      FALSY_REGEX.test(value) &&
      !URL_REGEX.test(value))
  )
}
