/* @flow */
const sanitizeComponentDisplayName = cn =>
  cn
    .replace(/[^_a-z0-9-]/gi, '_')
    .replace(/_{2,}/g, '_')
    .replace(/(^_|_$)/g, '')

export default function generateSelectorPrefix(
  displayName: string,
  ruleName?: string
): string {
  const sanitizedDisplayName = sanitizeComponentDisplayName(displayName)

  return ruleName ? `${sanitizedDisplayName}_${ruleName}` : sanitizedDisplayName
}
