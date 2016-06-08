import React, { Component } from 'react'

const center = props => ({
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  flex: 1
})

const animation = props => ({
  '0%': {
    color: props.color
  },
  '50%': {
    color: 'blue'
  },
  '80%': {
    color: 'purple'
  },
  '100%': {
    color: props.color
  }
})

const welcome = props => ({
  padding: '50px',
  color: 'rgb(50, 50, 50)',
  fontSize: props.fontSize,
  animation: props.name + ' 2s infinite',
  '@media (max-width: 800px)': {
    fontSize: '40px'
  }
})

const info = props => ({
  fontSize: '20px',
  color: 'gray',
  flexDirection: 'column',
  ':hover': {
    color: 'lightgray'
  }
})

export default class App extends Component {
  constructor() {
    super(...arguments)
    this.state = { size: 100 }
    this.setSize = this.setSize.bind(this)
  }

  setSize() {
    this.setState({ size: ++this.state.size })
  }

  render() {
    const { renderer } = this.props
    const welcomeName = renderer.renderRule(welcome, {
      fontSize: this.state.size + 'px',
      name: renderer.renderKeyframe(animation, { color: 'green' })
    })

    return (
      <div className={renderer.renderRule(center)}>
        <div className={welcomeName} onClick={this.setSize}>Welcome to Fela.</div>
        <div className={renderer.renderRule(info)}>
          <div>This is the basic example with React.</div>
          <div>It will be updated and extended soon.</div>
        </div>
      </div>
    )
  }
}
