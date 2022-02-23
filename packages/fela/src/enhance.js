import { arrayReduce } from 'fast-loops'

export default function enhance(...enhancers) {
  return (createRenderer) => (config) =>
    arrayReduce(
      enhancers,
      (enhancedRenderer, enhancer) => {
        enhancedRenderer = enhancer(enhancedRenderer)
        return enhancedRenderer
      },
      createRenderer(config)
    )
}
