/* @flow */
import { Broadcast } from 'react-broadcast'
import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'

const ThemeProvider = ({
  overwrite,
  theme,
  children
}, { theme: previousTheme }) => (
  <Broadcast
    channel="felaTheme"
    value={{
      ...(overwrite ? {} : previousTheme),
      ...theme
    }}
  >
    {Children.only(children)}
  </Broadcast>
)

ThemeProvider.propTypes = {
  theme: PropTypes.object.isRequired,
  overwrite: PropTypes.bool
}
ThemeProvider.defaultProps = { overwrite: false }
ThemeProvider.contextTypes = { theme: PropTypes.object }

export default ThemeProvider
