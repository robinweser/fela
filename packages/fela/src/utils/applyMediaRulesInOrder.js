/* @flow */
import arrayReduce from './arrayReduce'

type MediaRules = { [mediaQuery: string]: string }
export default function applyMediaRulesInOrder(
  order: Array<string>
): MediaRules {
  return arrayReduce(
    order,
    (mediaRules, query) => {
      mediaRules[query] = ''
      return mediaRules
    },
    {}
  )
}
