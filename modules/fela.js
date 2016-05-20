import Selector from './components/dom/Selector'
import { render, clear } from './renderers/dom/DOMRenderer'
import enhanceWithPlugins from './helpers/enhanceWithPlugins'

export default {
  Selector: Selector,

  render: render,
  clear: clear,
  enhanceWithPlugins: enhanceWithPlugins
}