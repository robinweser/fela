/* @flow */
import reduce from 'lodash/reduce'

export default function enhance(...enhancers: Array<Function>): Function {
  return (createRenderer: Function) =>
    (config: Object) =>
      reduce(
        enhancers,
        (enhancedRenderer, enhancer) => {
          enhancedRenderer = enhancer(enhancedRenderer)
          return enhancedRenderer
        },
        createRenderer(config)
      )
}
