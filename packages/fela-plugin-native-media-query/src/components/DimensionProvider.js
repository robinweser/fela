/* eslint-disable */
// $FlowFixMe
import { Dimensions } from 'react-native'
/* eslint-enable */

import { Component } from 'react'

export default class DimensionProvider extends Component {
  componentDidMount() {
    Dimensions.addEventListener('change', this.forceUpdate)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.forceUpdate)
  }

  render() {
    return this.props.children
  }
}
