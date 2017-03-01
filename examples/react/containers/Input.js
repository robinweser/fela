import React, { Component } from 'react'
import Label from '../components/Label'
import Wrapper from '../components/Wrapper'
import Text from '../components/Text'

export default class Input extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { size: 50 }
    this.setSize = this.setSize.bind(this)
  }

  setSize(e) {
    this.setState({ size: e.target.value })
  }

  render() {
    return (
      <Wrapper flex="0 1 auto">
        <br />
        <Text>Change the input to experience dynamic styling.</Text>
        <input type="number" onInput={this.setSize} defaultValue={this.state.size} />
        <Label size={this.state.size}>
          {this.state.size}
        </Label>
      </Wrapper>
    )
  }
}
