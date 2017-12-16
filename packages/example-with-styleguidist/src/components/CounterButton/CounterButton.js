import React, { Component } from 'react'
import Button from '../Button'

/**
 * Button that counts how many times it was pressed and exposes a `@public` method to reset itself.
 * Note: This component re-uses already created Button Component by hooking state for demo
 */
export default class CounterButton extends Component {
  constructor() {
    super()
    this.state = {
      value: 0,
    }
    this.increment = this.increment.bind(this)
  }

  /**
 * Sets the counter to a particular value.
 *
 * @public
 * @version 1.0.5
 * @param {Number} newValue New value for the counter
 * @returns {string} Test
 */
  set(newValue) {
    this.setState({
      value: parseInt(newValue, 10),
    })
  }

  /**
 * Increments the counter. This method is not marked @public and is not visible in the styleguide.
 */
  increment() {
    this.setState({
      value: this.state.value + 1,
    })
  }

  render() {
    return (
      // Example showing reusability of previously generated components.
      <Button onClick={this.increment}>
        {this.state.value && this.state.value.toString()}
      </Button>
    )
  }
}
