/* @flow weak */
export default function applyMediaRulesInOrder(order) {
  const mediaRules = {}

  for (let i = 0, len = order.length; i < len; ++i) {
    mediaRules[order[i]] = ''
  }

  return mediaRules
}
