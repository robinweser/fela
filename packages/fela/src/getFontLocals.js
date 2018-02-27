/* @flow */
export default function getFontLocals(
  localAlias?: string | Array<string>
): Array<string> {
  if (typeof localAlias === 'string') {
    return [localAlias]
  }

  if (Array.isArray(localAlias)) {
    return localAlias.slice()
  }

  return []
}
