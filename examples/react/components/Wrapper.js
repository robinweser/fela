import React from 'react'
import { createComponent } from 'react-fela'

const center = props => ({
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  flex: props.flex || 1
})

export default createComponent(center)
