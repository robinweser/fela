/* @flow */
import React, { PropTypes } from 'react'
import { Subscriber } from 'react-broadcast'
import generateDisplayName from '../generateDisplayName'

export default function connect(mapStylesToProps: Function): Function {
  return (Component: any): any => {
    const ConnectedComponent = (props, { renderer }) => (
      <Subscriber channel="felaTheme">
        {(theme = {}) => (
          <Component
            {...props}
            styles={mapStylesToProps({
              ...props,
              theme
            })(renderer)}
          />
        )}
      </Subscriber>
    )

    ConnectedComponent.displayName = generateDisplayName(Component)

    ConnectedComponent.contextTypes = { renderer: PropTypes.object }

    return ConnectedComponent
  }
}
