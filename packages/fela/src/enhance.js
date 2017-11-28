/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'

export default function enhance(...enhancers: Array<Function>): Function {
  return createRenderer => config =>
    arrayReduce(
      enhancers,
      (enhancedRenderer, enhancer) => {
        enhancedRenderer = enhancer(enhancedRenderer)
        return enhancedRenderer
      },
      createRenderer(config)
    )
}
