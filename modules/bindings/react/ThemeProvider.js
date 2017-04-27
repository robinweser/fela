/* @flow */
import { Broadcast } from 'react-broadcast'
import React, { Children } from 'react'
import PropTypes from 'prop-types'

type ProviderProps = {
  overwrite?: boolean,
  theme: Object,
  children: any
};

type ProviderContext = {
  theme: Object
};
const ThemeProvider = (
  {
    overwrite = false,
    theme,
    children
  }:
ProviderProps,
  { theme: previousTheme }: ProviderContext
) => (
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

ThemeProvider.defaultProps = { overwrite: false }
ThemeProvider.contextTypes = { theme: PropTypes.object }

export default ThemeProvider
