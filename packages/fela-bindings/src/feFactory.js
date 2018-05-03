/* @flow */
// Fe was heavily inspired by glam, both the code as well as the name
// https://github.com/threepointone/glam/blob/master/packages/glam/src/index.js#L83
export default function feFactory(
  createElement: Function,
  FelaComponent: Function
) {
  return function fe(type, props = {}, ...children) {
    const { style, className, ...otherProps } = props

    if (style) {
      return createElement(FelaComponent, {
        style,
        customClass: className,
        render: renderProps =>
          createElement(
            type,
            {
              ...otherProps,
              className: renderProps.className,
            },
            ...children
          ),
      })
    }

    return createElement(type, props, ...children)
  }
}
