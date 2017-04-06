/* @flow */
import { Broadcast } from 'react-broadcast'
import React, { Component, PropTypes, Children } from 'react'

export default class ThemeProvider extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    overwrite: PropTypes.bool
  };
  static contextTypes = { theme: PropTypes.object };
  static defaultProps = { overwrite: false };

  render() {
    const { overwrite, theme } = this.props
    return (
      <Broadcast channel='felaTheme' value={{
        ...(overwrite ? {} : this.context.theme)
        ...theme
      }}>
        {Children.only(this.props.children)}
      </Broadcast>
    )
  }
}
