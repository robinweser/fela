/* @flow weak */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, PropTypes } from 'react'

const generateDisplayName = (Comp) => {
  const displayName = Comp.displayName || Comp.name
  if (displayName) {
    return `Fela${displayName}`
  }

  return 'ConnectedFelaComponent'
}

export default function connect(mapStylesToProps) {
  return Comp => class EnhancedComponent extends Component {
    // reuse the initial displayName name
    static displayName = generateDisplayName(Comp);

    static contextTypes = {
      ...Comp.contextTypes,
      renderer: PropTypes.object,
      theme: PropTypes.object
    };

    render() {
      const { renderer, theme } = this.context

      const styles = mapStylesToProps({
        ...this.props,
        theme: theme || {}
      })(renderer)

      return <Comp {...this.props} styles={styles} />
    }
  }
}
