/* @flow */
/* eslint-disable no-console */
import type DOMRenderer from '../../../flowtypes/DOMRenderer'

function addClassNameSorting(renderer: DOMRenderer) {
  const existingRenderRule = renderer.renderRule.bind(renderer)

  renderer.renderRule = (...args) => {
    const className = existingRenderRule(...args)
    return className
      .split(/\s+/g)
      .sort((a, b) => (a < b ? -1 : a > b ? +1 : 0))
      .join(' ')
  }

  return renderer
}

export default function sortClassNames() {
  return addClassNameSorting
}
