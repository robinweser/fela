/* @flow */
import { generateCSSRule, generateCSSSupportRule } from 'fela-utils'

export default function generateRule(
  selector: string,
  declaration: string,
  support?: string = ''
): string {
  const rule = generateCSSRule(selector, declaration)

  if (support.length > 0) {
    return generateCSSSupportRule(support, rule)
  }

  return rule
}
