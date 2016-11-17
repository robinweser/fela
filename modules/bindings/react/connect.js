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
      // invoke the component name for better CSS debugging
      if (process.env.NODE_ENV !== 'production') {
        this.context.renderer._selectorPrefix = Comp.displayName || Comp.name || 'ConnectedFelaComponent'
      }

      // invoke props and renderer to render all styles
      const styles = mapStylesToProps(this.props)(this.context.renderer)

      // remove the component name after rendering
      if (process.env.NODE_ENV !== 'production') {
        this.context.renderer._selectorPrefix = undefined
      }

      return <Comp {...this.props} styles={styles} />
    }
  }
}
