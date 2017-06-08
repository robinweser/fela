import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'fela-tools'
import { Text, View } from 'react-native'

const rules = StyleSheet.create({
  container: props => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    '@media (min-width: 200px)': {
      backgroundColor: 'yellow'
    },
    '@media (orientation: landscape)': {
      backgroundColor: 'red'
    },
    '@media (orientation: portrait)': {
      backgroundColor: 'blue'
    }
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

class Ticker extends Component {
  constructor() {
    super()
    this.state = { color: 'red' }
    this.startTicker = this.startTicker.bind(this)
  }

  startTicker() {
    this.setState({ color: this.state.color === 'red' ? 'blue' : 'red' })
    setTimeout(this.startTicker, 500)
  }

  componentDidMount() {
    this.startTicker()
  }

  render() {
    const { renderer } = this.context

    return (
      <Text
        style={renderer.renderRule(rules.ticker, { color: this.state.color })}
      >
        I am &nbsp;
        {this.state.color}
      </Text>
    )
  }
}

Ticker.contextTypes = { renderer: PropTypes.object }

const App = (_, { renderer }) => (
  <View style={renderer.renderRule(rules.container, { bgColor: 'gray' })}>
    <Text style={renderer.renderRule(rules.welcome)}>
      Welcome to Fela Native!
    </Text>
    <Text style={renderer.renderRule(rules.instructions)}>
      To get started, edit index.ios.js
    </Text>
    <Text style={renderer.renderRule(rules.instructions)}>
      Double tap R on your keyboard to reload,
      {'\n'} Shake or press menu button for dev menu
    </Text>
    <Ticker />
  </View>
)

App.contextTypes = { renderer: PropTypes.object }

export default App
