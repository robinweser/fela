export default function applyMiddleware(middleware = [ ]) {
  return renderer => {
    middleware.forEach(tool => renderer = tool(renderer))
    return renderer
  }
}
