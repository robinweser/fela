export default function getFontLocals(localAlias) {
  if (typeof localAlias === 'string') {
    return [localAlias]
  }

  if (Array.isArray(localAlias)) {
    return localAlias.slice()
  }

  return []
}
