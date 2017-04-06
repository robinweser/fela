/* @flow */
import React, { Component, createElement, PropTypes } from 'react'
import { Subscriber } from 'react-broadcast'
import generateDisplayName from '../generateDisplayName'

export default function connect(mapStylesToProps: Function): Function {
  return (component: any): any => {
    class EnhancedComponent extends Component {
      static displayName = generateDisplayName(component);

      render() {
        return (
          <Subscriber channel='felaTheme'>
            {(theme = {}) => (
              createElement(component, {
                ...this.props,
                styles: mapStylesToProps({
                  ...this.props,
                  theme
                })(this.context.renderer)
              })
            )}
          </Subscriber>
        )
      }
    }

    EnhancedComponent.contextTypes = {
      renderer: PropTypes.object,
      theme: PropTypes.object
    }

    return EnhancedComponent
  }
}
