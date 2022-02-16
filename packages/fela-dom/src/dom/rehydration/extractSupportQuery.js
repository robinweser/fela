export default function extractSupportQuery(ruleSet) {
  return ruleSet.split('{')[0].slice(9).trim()
}
