import { mount as enzymeMount } from 'enzyme'
import { renderToString } from 'fela-tools'
import { createRenderer as felaCreateRenderer } from 'fela'
import toJson from 'enzyme-to-json'
import cssbeautify from 'cssbeautify'
import mergeOptions from './mergeOptions'

const mount = (
  node,
  options = {},
  theme = {},
  createRenderer = felaCreateRenderer
) => {
  const renderer = createRenderer()

  const wrapper = enzymeMount(node, mergeOptions(options, renderer, theme))

  const snapshot = (wrapper, includeStyles = true) => {
    const options = {
      indent: '  ',
      openbrace: 'end-of-line',
      autosemicolon: false,
    }

    const result = {
      component: toJson(wrapper),
    }

    if (includeStyles) {
      result.styles = `\n${cssbeautify(renderToString(renderer), options)}\n`
    }

    return result
  }

  return {
    wrapper,
    snapshot,
  }
}

export default mount
