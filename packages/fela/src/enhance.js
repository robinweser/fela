/* @flow */
import reduce from 'lodash/reduce'

export default function enhance(...enhancers: Array<Function>): Function {
  return createRenderer => config =>
    reduce(
      enhancers,
      (enhancedRenderer, enhancer) => {
        enhancedRenderer = enhancer(enhancedRenderer)
        return enhancedRenderer
      },
      createRenderer(config)
    )
}
