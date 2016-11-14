import React, { Component, PropTypes } from 'react'

export default function connect(mapStylesToProps) {
  return Comp => class EnhancedComponent extends Component {
    // reuse the initial displayName name
    static displayName = Comp.displayName || Comp.name || 'ConnectedFelaComponent'

    static contextTypes = {
      ...Comp.contextTypes,
      renderer: PropTypes.object
    };

    render() {
      const { renderer } = this.context

      // invoke the component name for better CSS debugging
      if (process.env.NODE_ENV !== 'production') {
        const displayName = Comp.displayName || Comp.name || 'ConnectedFelaComponent'
        const oldRenderRule = renderer.renderRule.bind(renderer)
        renderer.renderRule = (rule, props) => oldRenderRule(rule, props, displayName)
      }

      // invoke props and renderer to render all styles
      const styles = mapStylesToProps(this.props)(renderer)

      return <Comp {...this.props} styles={styles} />
    }
  }
}
