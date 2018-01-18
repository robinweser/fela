/* @flow */
export default function FelaComponentFactory(
  BaseComponent: any,
  createElement: Function,
  withTheme: Function,
  contextTypes?: Object
): any {
  class FelaComponent extends BaseComponent {
    constructor(props, context) {
      super(props, context)

      // we cache the rule and the component render method
      // to reuse it later instead of creating a new one every time
      this.component = props.render
      this.rule = props.rule
    }

    render() {
      const { render, rule, className, ...componentProps } = this.props
      const { theme, renderer } = this.context

      const felaClassName = renderer.renderRule(this.rule, {
        ...componentProps,
        theme,
      })

      return createElement(this.component, {
        ...componentProps,
        className: className ? className + ' ' + felaClassName : felaClassName,
        theme,
      })
    }
  }

  if (contextTypes) {
    FelaComponent.contextTypes = contextTypes
  }

  return FelaComponent
}
