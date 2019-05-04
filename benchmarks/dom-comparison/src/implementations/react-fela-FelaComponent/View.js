/* eslint-disable react/prop-types */
import React from 'react'
import { FelaComponent } from 'react-fela'

const style = {
  alignItems: 'stretch',
  borderWidth: '0px',
  borderStyle: 'solid',
  boxSizing: 'border-box',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: '0',
  margin: '0px',
  padding: '0px',
  position: 'relative',
  // fix flexbox bugs
  minHeight: '0px',
  minWidth: '0px',
}

const View = ({ children }) => (
  <FelaComponent style={style}>{children}</FelaComponent>
)

export default View
