/* @flow */
import reduce from 'lodash/reduce'

type MediaRules = { [mediaQuery: string]: string };
export default function applyMediaRulesInOrder(order: Array<string>): MediaRules {
  return reduce(
    order,
    (mediaRules, query) => {
      mediaRules[query] = ''
      return mediaRules
    },
    {}
  )
}
