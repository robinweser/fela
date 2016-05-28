import React, { Component } from 'react'
import Keyframe from '../../modules/components/dom/Keyframe'

const centerSelector = props => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  width: '100%',
  height: '100%',
  flexDirection: 'column'
})

const animation = new Keyframe(props => ({
  '0%': {
    color: props.color
  },
  '50%': {
    color: 'blue'
  },
  '80%': {
    color: 'yellow'
  },
  '100%': {
    color: props.color
  }
}))

const welcomeSelector = props => ({
  padding: '50px',
  color: props.color,
  fontSize: props.fontSize,
  animation: props.name + ' 2s infinite'
})

const infoSelector = props => ({
  fontSize: '20px',
  color: 'gray',
  flexDirection: 'column',
  ':hover': {
    color: 'lightgray'
  }
})

export default class App extends Component {
  render() {

    const { renderer } = this.props
    const welcome = renderer.render(welcomeSelector, {
      color: 'rgb(50, 50, 50)',
      fontSize: '80px',
      name: renderer.render(animation, { color: 'green' })
    })

    return (
      <div className={renderer.render(centerSelector)}>
        <div className={welcome}>Welcome to Fela.</div>
        <div className={renderer.render(infoSelector)}>
          <div>This is the basic example with React.</div>
          <div>It will be updated and extended soon.</div>
        </div>
      </div>
    )
  }
}
