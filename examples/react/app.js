import React, { Component } from 'react'
import Keyframe from '../../modules/components/dom/Keyframe'
import combineSelectors from '../../modules/helpers/combineSelectors'

const centerSelector = props => ({
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  flex: 1
})

const animation = new Keyframe(props => ({
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
}))

const welcomeSelector = props => ({
  padding: '50px',
  color: 'rgb(50, 50, 50)',
  fontSize: props.fontSize,
  animation: props.name + ' 2s infinite',
  '@media (max-width: 800px)': {
    fontSize: '40px'
  }
})

const infoSelector = props => ({
  fontSize: '20px',
  color: 'gray',
  flexDirection: 'column',
  ':hover': {
    color: 'lightgray'
  }
})

const selector1 = props => ({
  fontSize: props.fontSize,
  color: 'blue'
})

const selector2 = props => ({
  lineHeight: props.lineHeight,
  color: 'red'
})

const combined = combineSelectors(selector2, selector1)

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
    const welcome = renderer.render(welcomeSelector, {
      fontSize: this.state.size + 'px',
      name: renderer.render(animation, { color: 'green' })
    })

    return (
      <div className={renderer.render(centerSelector)}>
        <div className={welcome} onClick={this.setSize}>Welcome to Fela.</div>
        <div className={renderer.render(infoSelector)}>
          <div>This is the basic example with React.</div>
          <div className={renderer.render(combined, { fontSize: '20px', lineHeight: 1.0 })}>It will be updated and extended soon.</div>
        </div>
      </div>
    )
  }
}
