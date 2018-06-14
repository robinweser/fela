/* @flow */
export default function getRuleScore(
  ruleOrder: Array<any>,
  pseudo: string = ''
): number {
  return (
    ruleOrder.indexOf(ruleOrder.find(regex => pseudo.match(regex) !== null)) + 1
  )
}
