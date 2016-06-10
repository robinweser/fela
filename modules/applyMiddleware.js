export default function applyMiddleware(middlewares = [ ]) {
  return renderer => middlewares.reduce((renderer, middleware) => middleware(renderer), renderer)
}
