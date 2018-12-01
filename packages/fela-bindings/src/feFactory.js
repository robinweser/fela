/* @flow */
// Fe was heavily inspired by glam, both the code as well as the name
// https://github.com/threepointone/glam/blob/master/packages/glam/src/index.js#L83
export default function feFactory(
  createElement: Function,
  FelaComponent: Function
) {
  return function fe(type: any, props: Object = {}, ...children: any) {
    if (props) {
      const { css, className, ...otherProps } = props

      if (css) {
        return createElement(
          FelaComponent,
          {
            style: css,
          },
          renderProps =>
            createElement(
              type,
              {
                ...otherProps,
                className: className
                  ? className + ' ' + renderProps.className
                  : renderProps.className,
              },
              ...children
            )
        )
      }
    }

    return createElement(type, props, ...children)
  }
}
