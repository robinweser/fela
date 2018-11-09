/* @flow */
import { combineRules } from 'fela'

import deprecate from './_deprecate'

export default function FelaComponentFactory(
  createElement: Function,
  FelaTheme: Function,
  contextTypes?: Object
): Function {
  function FelaComponent(
    { children, as = 'div', style, customClass, rule, ...otherProps },
    { renderer }
  ) {
    // TODO: remove in 11.0.0
    deprecate(
      customClass !== undefined,
      'The `customClass` prop in FelaComponent is deprecated. It will be removed in react-fela@11.0.0.\nPlease resolve class names manually in your render function. See http://fela.js.org/docs/api/bindings/fela-component'
    )
    deprecate(
      rule !== undefined,
      'The `rule` prop in FelaComponent is deprecated. It will be removed in react-fela@11.0.0.\nPlease always use `style` instead. See http://fela.js.org/docs/api/bindings/fela-component',
      () => {
        style = rule
      }
    )

    if (!style) {
      throw new Error(
        'A valid `style` prop must be passed to FelaComponent in order to render.\nSee http://fela.js.org/docs/api/bindings/fela-component'
      )
    }

    return createElement(FelaTheme, undefined, theme => {
      // TODO: could optimise perf by not calling combineRules if not neccessary
      const className = renderer.renderRule(combineRules(style), {
        ...otherProps,
        theme,
      })

      // TODO: remove in 11.0.0
      const cls = customClass ? customClass + ' ' + className : className

      if (children instanceof Function) {
        return children({
          className: cls,
          theme,
          as,
        })
      }

      return createElement(as, { className: cls }, children)
    })
  }

  if (contextTypes) {
    FelaComponent.contextTypes = contextTypes
  }

  return FelaComponent
}
