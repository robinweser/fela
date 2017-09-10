/* @flow */
export default function extractSupportQuery(ruleSet: string): string {
  return ruleSet
    .split('{')[0]
    .slice(9)
    .trim()
}
