/* @flow */
import type DOMRenderer from '../../../flowtypes/DOMRenderer'

// TODO: add the rest
const propertyPriority = {
  marginLeft: 2,
  marginRight: 2,
  marginTop: 2,
  marginBottom: 2,
  paddingLeft: 2,
  paddingRight: 2,
  paddingBottom: 2,
  paddingTop: 2,
}

// TODO: add option to choose whether directional borders or border shorthands take priority
// e.g. border-left: 2px solid grey vs. border-width: 4px
function enforceLonghands(renderer: DOMRenderer): DOMRenderer {
  renderer.propertyPriority = propertyPriority
  return renderer
}

export default () => enforceLonghands
