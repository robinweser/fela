/* @flow */
export default function getRuleScore(
  ruleOrder: Array<any> = [],
  pseudo: string = ''
): number {
  if (ruleOrder.length === 0 || pseudo.length === 0) {
    return 0
  }

  return (
    ruleOrder.indexOf(ruleOrder.find(regex => pseudo.match(regex) !== null)) + 1
  )
}
