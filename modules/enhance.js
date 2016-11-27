/* @flow weak */
export default function enhance(...enhancers) {
  return createRenderer => (...args) => enhancers.reduce((renderer, enhancer) => enhancer(renderer), createRenderer(...args))
}
