export default (renderer, middleware = [ ]) => {
  middleware.forEach(tool => renderer = tool(renderer))
  return renderer
}
