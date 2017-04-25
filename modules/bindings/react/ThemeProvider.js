/* @flow */
import { Broadcast } from 'react-broadcast'
import React, { PropTypes, Children } from 'react'

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
