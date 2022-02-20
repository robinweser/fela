/* eslint-disable react/prop-types */
import React from 'react'
import { useFela } from 'react-fela'

const style = () => ({
  alignItems: 'stretch',
  borderWidth: 0,
  borderStyle: 'solid',
  boxSizing: 'border-box',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: 0,
  margin: 0,
  padding: 0,
  position: 'relative',
  // fix flexbox bugs
  minHeight: 0,
  minWidth: 0,
})

const View = ({ children }) => {
  const { css } = useFela()

  return <div className={css(style)}>{children}</div>
}

export default View
