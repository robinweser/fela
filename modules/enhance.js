/* @flow weak */
export default function enhance(...enhancers) {
  return createRenderer => (config) => {
    let renderer = createRenderer(config)

    for (let i = 0, len = enhancers.length; i < len; ++i) {
      renderer = enhancers[i](renderer)
    }

    return renderer
  }
}
