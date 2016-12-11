/* @flow weak */
export default function generateCombinedMediaQuery(currentMediaQuery, nestedMediaQuery) {
  if (currentMediaQuery.length === 0) {
    return nestedMediaQuery
  }
  return currentMediaQuery + ' and ' + nestedMediaQuery
}
