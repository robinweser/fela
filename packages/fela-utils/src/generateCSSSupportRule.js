/* @flow */
export default function generateCSSSupportRule(
  support: string,
  cssRules: string
): string {
  return `@supports ${support}{${cssRules}}`
}
