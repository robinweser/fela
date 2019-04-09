/* eslint-disable react/prop-types */
import React from 'react'
import { useFela } from 'react-fela'

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

const View = ({ children }) => {
  const { css } = useFela()

  return <div className={css(style)}>{children}</div>
}

export default View
