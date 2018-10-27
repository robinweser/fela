/* @flow */
import { Dimensions } from 'react-native'

import { Component, Children } from 'react'

export default class DimensionProvider extends Component {
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
