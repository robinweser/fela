/* @flow */
import { arrayReduce } from 'fela-utils'

export default function enhance(...enhancers: Array<Function>): Function {
  return (createRenderer: Function) => (config: Object) =>
    arrayReduce(
      enhancers,
      (enhancedRenderer, enhancer) => {
        enhancedRenderer = enhancer(enhancedRenderer)
        return enhancedRenderer
      },
      createRenderer(config)
    )
}
