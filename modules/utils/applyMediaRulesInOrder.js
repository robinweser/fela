/* @flow */
type MediaRules = { [mediaQuery: string]: string };
export default function applyMediaRulesInOrder(order: Array<string>): MediaRules {
  const mediaRules = {}

  for (let i = 0, len = order.length; i < len; ++i) {
    mediaRules[order[i]] = ''
  }

  return mediaRules
}
