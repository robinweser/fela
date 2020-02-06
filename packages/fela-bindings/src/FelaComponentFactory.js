/* @flow */
import { combineRules } from 'fela'

export default function FelaComponentFactory(
  createElement: Function,
  RendererContext: any,
  FelaTheme: Function
): Function {
  function FelaComponent({ children, as = 'div', style, ...otherProps }) {
    const renderFn = renderer => {
      if (renderer.devMode && style == null) {
        // eslint-disable-next-line no-console
        console.warn(
          '"FelaComponent" is being rendered without a style prop\nIf all you need is access to theme, try using "FelaTheme" or the "useFela" hook instead'
        )
      }

      return createElement(FelaTheme, undefined, theme => {
        // TODO: could optimize perf by not calling combineRules if not necessary
        const renderedRule = renderer.renderRule(combineRules(style), {
          ...otherProps,
          theme,
        })

        if (children instanceof Function) {
          return children({
            className: !renderer.isNativeRenderer && renderedRule,
            style: renderer.isNativeRenderer && renderedRule,
            theme,
            as,
          })
        }

        return createElement(
          as,
          {
            className: !renderer.isNativeRenderer && renderedRule,
            style: renderer.isNativeRenderer && renderedRule,
          },
          children
        )
      })
    }

    return createElement(RendererContext.Consumer, undefined, renderFn)
  }

  return FelaComponent
}
