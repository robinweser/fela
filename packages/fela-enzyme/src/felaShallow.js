import { shallow as enzymeShallow } from 'enzyme'
import { renderToString } from 'fela-tools'
import cssbeautify from 'cssbeautify'
import toJson from 'enzyme-to-json'
import mergeOptions from './mergeOptions'
import { ThemeProvider } from 'react-fela' // eslint-disable-line behance/no-deprecated
import { createRenderer as felaCreateRenderer } from 'fela'

const isWithTheme = reactElement =>
  reactElement && reactElement.type && reactElement.type.name === 'WithTheme'

const isThemeProvider = reactElement =>
  reactElement && reactElement.type && reactElement.type === ThemeProvider

const isFelaComponent = reactElement =>
  reactElement && reactElement.type && reactElement.type._isFelaComponent

const isNonDOMComponent = reactElement =>
  reactElement && reactElement.type && typeof reactElement.type !== 'string'

const shallow = (
  node,
  options = {},
  rootTheme = {},
  createRenderer = felaCreateRenderer
) => {
  const rootRenderer = createRenderer()

  const wrapper = enzymeShallow(
    node,
    mergeOptions(options, rootRenderer, rootTheme)
  )

  // node = the instance of ReactElement from which the enzymeWrapper wrapper was created
  // wrapper = the of EnzymeWrapper associated with shallow rendering node
  // renderer = fela renderer function
  // theme = fela theme

  // This function will dive into the enzyme tree, until it gets to a non-fela component
  const dive = (node, wrapper, renderer, theme = rootTheme) => {
    let parentFelaComponent = false
    if (isThemeProvider(node) || isFelaComponent(node) || isWithTheme(node)) {
      parentFelaComponent = true
    }

    const reactElement = wrapper.get(0)
    if (parentFelaComponent && isNonDOMComponent(reactElement)) {
      if (isThemeProvider(reactElement)) {
        theme = reactElement.props.theme
      }
      const mergedOptions = mergeOptions(options, renderer, theme)
      const enzymeDived = wrapper.dive(mergedOptions)

      return dive(reactElement, enzymeDived, renderer, theme)
    }
    return wrapper
  }

  const componentSnapshot = (wrapper, includeStyles) => {
    const options = {
      indent: '  ',
      openbrace: 'end-of-line',
      autosemicolon: false,
    }

    let renderer = rootRenderer
    let wrapperToSnapshot = wrapper

    if (includeStyles) {
      // use a new renderer to capture the styles just by rendering this enzyme wrapper
      renderer = createRenderer()
      wrapperToSnapshot = felaDive(wrapper, renderer)
    }

    const result = {
      component: toJson(wrapperToSnapshot),
    }

    if (includeStyles) {
      result.styles = `\n${cssbeautify(renderToString(renderer), options)}\n`
    }

    return result
  }

  const felaDive = (wrapper, renderer = rootRenderer) => {
    // determine whether wrapper is the root wrapper or not
    // in older versions of enzyme root is not a function but the root itself
    const root =
      typeof wrapper.root === 'function' ? wrapper.root() : wrapper.root
    const isRoot = root === wrapper

    return dive(isRoot ? node : wrapper.get(0), wrapper, renderer, rootTheme)
  }

  // if the enzyme wrapper is around a single node, returns an object with keys: component, style
  // otherwise returns an array where each element in the array is an object with keys: component, style
  // where the snapshot for that element is stored.
  // if the includeStyles prop is false, then styles are ommitted from the captured snapshot. This will make it act like a normal
  // enzyme shallow snapshot capture (i.e. we will not dive into fela components and render them)
  const snapshot = (enzymeWrapper, includeStyles = true) => {
    if (enzymeWrapper.length === 1) {
      return componentSnapshot(enzymeWrapper, includeStyles)
    }
    return enzymeWrapper.map(wrapper =>
      componentSnapshot(wrapper, includeStyles)
    )
  }

  return {
    wrapper,
    snapshot,
    felaDive,
  }
}

export default shallow
