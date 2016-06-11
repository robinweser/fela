export default function enhance(...enhancers) {
  return renderer => enhancers.reduce((renderer, enhancer) => enhancer(renderer), renderer)
}
