export default function resolvePassThrough(passThrough, ruleProps) {
  if (typeof passThrough === 'function') {
    return passThrough(ruleProps)
  }

  return passThrough
}
