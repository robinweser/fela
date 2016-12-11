/* @flow weak */
import React, { Component, PropTypes } from 'react'

export default function connect(mapStylesToProps) {
  return Comp => class EnhancedComponent extends Component {
    // reuse the initial displayName name
    static displayName = Comp.displayName || Comp.name || 'ConnectedFelaComponent'

    static contextTypes = {
      ...Comp.contextTypes,
      renderer: PropTypes.object,
      theme: PropTypes.object
    };

    render() {
      const { renderer, theme } = this.context

      const styles = mapStylesToProps({
        ...this.props,
        theme: theme || { }
      })(renderer)

      return <Comp {...this.props} styles={styles} />
    }
  }
}
