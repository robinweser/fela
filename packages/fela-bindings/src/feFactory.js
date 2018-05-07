/* @flow */
// Fe was heavily inspired by glam, both the code as well as the name
// https://github.com/threepointone/glam/blob/master/packages/glam/src/index.js#L83
export default function feFactory(
  createElement: Function,
  FelaComponent: Function
) {
  return function fe(type: any, props: Object = {}, ...children: any) {
    const { css, className, ...otherProps } = props

    if (css) {
      return createElement(FelaComponent, {
        style: css,
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
