import Inferno from 'inferno'
import Component from 'inferno-component'
import { createComponent } from 'inferno-fela'

const label = props => ({
  fontSize: props.size,
  lineHeight: '200px',
  padding: 20
})

export default createComponent(label)
