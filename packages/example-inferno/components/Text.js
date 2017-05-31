import Inferno from 'inferno'
import Component from 'inferno-component'
import { createComponent } from 'inferno-fela'

const info = props => ({
  padding: 5,
  fontSize: '20px',
  color: 'gray',
  flexDirection: 'column'
})

export default createComponent(info)
