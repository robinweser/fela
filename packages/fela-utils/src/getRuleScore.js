export default function getRuleScore(ruleOrder = [], pseudo = '') {
  if (ruleOrder.length === 0 || pseudo.length === 0) {
    return 0
  }

  return (
    ruleOrder.indexOf(ruleOrder.find((regex) => pseudo.match(regex) !== null)) +
    1
  )
}
