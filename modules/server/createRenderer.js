import Renderer from '../renderer/Renderer'

export default function createRenderer(config) {
  return new Renderer(config)
}