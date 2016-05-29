import Renderer from './renderers/dom/DOMRenderer'
import Keyframe from './components/dom/Keyframe'
import FontFace from './components/dom/FontFace'
import applyMiddleware from './helper/applyMiddleware'

export default {
  Renderer: Renderer,
  Keyframe: Keyframe,
  FontFace: FontFace,
  applyMiddleware: applyMiddleware
}
