/* eslint-disable react/prop-types */
import React from 'react'
import { createComponent } from 'react-fela'

const rule = ({ size, x, y, color }) => ({
  position: 'absolute',
  cursor: 'pointer',
  width: 0,
  height: 0,
  borderColor: 'transparent',
  borderStyle: 'solid',
  borderTopWidth: 0,
  transform: 'translate(50%, 50%)',
  borderBottomColor: color,
  borderRightWidth: `${size / 2}px`,
  borderBottomWidth: `${size / 2}px`,
  borderLeftWidth: `${size / 2}px`,
  marginLeft: `${x}px`,
  marginTop: `${y}px`,
})

const Dot = createComponent(rule)
export default Dot
