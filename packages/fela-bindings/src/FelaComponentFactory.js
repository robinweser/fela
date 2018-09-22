/* @flow */
//import assignStyle from 'css-in-js-utils/lib/assignStyle'
import arrayReduce from 'fast-loops/lib/arrayReduce'

function assignStyle(a, b) {
  return Object.assign({}, a, b)
}
function combineRules(...rules: Array<Function>): Function {
  return (props, renderer) =>
    arrayReduce(
      rules,
      (style, rule) =>
        assignStyle(
          style,
          typeof rule === 'function' ? rule(props, renderer) : rule
        ),
      {}
    )
}

function resolveRule(style, extend) {
  if (extend) {
    return combineRules(style, extend)
  }

  if (typeof style === 'object') {
    return () => style
  }

  return style
}

export default function FelaComponentFactory(
  createElement: Function,
  FelaTheme: Function,
  contextTypes?: Object
): Function {
  function FelaComponent(
    { children, as = 'div', style, extend, ...otherProps },
    { renderer }
  ) {
    return createElement(FelaTheme, undefined, theme => {
      const rule = resolveRule(style, extend)

      const className = renderer.renderRule(rule, { theme, ...otherProps })

      if (children instanceof Function) {
        return children({
          className,
          theme,
        })
      }

      return createElement(as, { className }, children)
    })
  }

  if (contextTypes) {
    FelaComponent.contextTypes = contextTypes
  }

  return FelaComponent
}
