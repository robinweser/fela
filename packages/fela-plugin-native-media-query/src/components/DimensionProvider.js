/* @flow */
// $FlowFixMe
import { Dimensions } from 'react-native'

import React, { Component, Children } from 'react'

type Props = {
  children: React.Node,
}

export default class DimensionProvider extends Component<Props> {
  componentDidMount() {
    Dimensions.addEventListener('change', this.forceUpdate)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.forceUpdate)
  }

  render() {
    const { children } = this.props
    return Children.only(children)
  }
}
