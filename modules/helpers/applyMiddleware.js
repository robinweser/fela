export default (middleware = [ ]) => {
  return renderer => {
    middleware.forEach(tool => renderer = tool(renderer))
    return renderer
  }
}
