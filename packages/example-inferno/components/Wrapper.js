import Inferno from 'inferno'
import Component from 'inferno-component'
import { createComponent } from 'inferno-fela'

const center = props => ({
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  flex: props.flex || 1
})

export default createComponent(center)
