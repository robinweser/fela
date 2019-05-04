/* @flow */
/* eslint-disable */
// $FlowFixMe
import { Dimensions } from 'react-native'
/* eslint-enable */

import * as React from 'react'

type Props = {
  children: React.Node,
}

export default class DimensionProvider extends React.Component<Props> {
  componentDidMount() {
    Dimensions.addEventListener('change', this.forceUpdate)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.forceUpdate)
  }

  render() {
    const { children } = this.props
    return React.Children.only(children)
  }
}
