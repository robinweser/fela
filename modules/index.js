/* @flow weak */
import createRenderer from './createRenderer'
import combineRules from './combineRules'
import enhance from './enhance'
import render from './dom/render'

function deprecatedRender(renderer, mountNode) {
  console.warn(
    'Importing `render` from `fela` is deprecated. Use `fela-dom` to import `render` instead.'
  )
  // eslint-disable-line
  return render(renderer, mountNode)
}

export default {
  createRenderer,
  combineRules,
  enhance,
  render: deprecatedRender
}
