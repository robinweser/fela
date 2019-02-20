/* @flow */
import { combineRules } from 'fela'

import deprecate from './_deprecate'

export default function FelaComponentFactory(
  createElement: Function,
  RendererContext: any,
  FelaTheme: Function
): Function {
  function FelaComponent({
    children,
    as = 'div',
    style,
    customClass,
    rule,
    render,
    ...otherProps
  }) {
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
    deprecate(
      render !== undefined,
      'The `render` prop in FelaComponent is deprecated. It will be removed in react-fela@11.0.0.\nPlease always use `children` instead. See http://fela.js.org/docs/api/bindings/fela-component'
    )

    const renderFn = renderer => {
      if (renderer.devMode && style == null) {
        // eslint-disable-next-line no-console
        console.warn(
          '"FelaComponent" is being rendered without a style prop\nIf all you need is access to theme, try using "FelaTheme" or the "useFela" hook instead'
        )
      }

      return createElement(FelaTheme, undefined, theme => {
        // TODO: could optimize perf by not calling combineRules if not necessary
        const className = renderer.renderRule(combineRules(style), {
          ...otherProps,
          theme,
        })

        // TODO: remove in 11.0.0
        const cls = customClass ? customClass + ' ' + className : className

        if (render instanceof Function) {
          return render({
            className: cls,
            children,
            theme,
            as,
          })
        }

        if (typeof render === 'string') {
          return createElement(render, { className: cls }, children)
        }

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

    return createElement(RendererContext.Consumer, undefined, renderFn)
  }

  return FelaComponent
}
