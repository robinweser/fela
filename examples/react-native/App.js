import React, { Component } from 'react'
import { createRenderer } from 'fela-native'
import { create } from 'fela-stylesheet'
import { Text, View } from 'react-native'

const renderer = createRenderer()

class Ticker extends Component {
  constructor() {
    super(...arguments)
    this.state = { color: 'red' }
    this.startTicker = this.startTicker.bind(this)
  }

  startTicker() {
    this.setState({
      color: this.state.color === 'red' ? 'blue' : 'red'
    })
    setTimeout(this.startTicker, 500)
  }

  componentDidMount() {
    this.startTicker()
  }

  render() {
    return (
      <Text style={renderer.renderRule(rules.ticker, { color: this.state.color })}>
        I am &nbsp;
        {this.state.color}
      </Text>
    )
  }
}

const App = () => (
  <View style={renderer.renderRule(rules.container, { bgColor: 'gray' })}>
    <Text style={renderer.renderRule(rules.welcome)}>
      Welcome to Fela Native!
    </Text>
    <Text style={renderer.renderRule(rules.instructions)}>
      To get started, edit index.android.js
    </Text>
    <Text style={renderer.renderRule(rules.instructions)}>
      Double tap R on your keyboard to reload,
      {'\n'} Shake or press menu button for dev menu
    </Text>
    <Ticker />
  </View>
)

const rules = create({
  container: props => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.bgColor
  }),
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  ticker: props => ({ color: props.color })
})

export default App
