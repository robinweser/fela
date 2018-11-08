/* @flow */
// $FlowFixMe
import { Dimensions } from 'react-native'

import { Component, Children } from 'react'
import type { Node } from 'react'

type Props = {
  children: Node,
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
