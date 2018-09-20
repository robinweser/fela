/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'

/* TODO

- special props id, innerRef etc.
- composing rules
- extending styles
*/

function resolvePassThrough(
  passThrough: Function | Array<string>,
  ruleProps: Object
): Array<string> {
  if (typeof passThrough === 'function') {
    return passThrough(ruleProps)
  }

  return passThrough
}

function extractPassThroughProps(
  passThrough: Array<string>,
  ruleProps: Object
): Object {
  return arrayReduce(
    passThrough,
    (output, property) => {
      if (ruleProps.hasOwnProperty(property)) {
        output[property] = ruleProps[property]
      }

      return output
    },
    {}
  )
}

export default function createComponentFactory(
  createElement: Function,
  FelaComponent: Function
): Function {
  return function createComponent(
    rule: Function,
    type: string | Function = 'div',
    passThroughProps: Array<string> | Function = []
  ) {
    return props => {
      const resolvedProps = extractPassThroughProps(
        resolvePassThrough(passThroughProps, props),
        props
      )

      const render = ({ className }) =>
        createElement(type, {
          ...resolvedProps,
          className,
        })

      return createElement(FelaComponent, {
        ...props,
        rule,
        render,
      })
    }
  }
}
