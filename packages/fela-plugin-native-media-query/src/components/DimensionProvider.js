/* eslint-disable import/no-unresolved, import/extensions */
import { Dimensions } from 'react-native'

/* @flow */
import { Component, Children } from 'react'

export default class DimensionProvider extends Component {
  componentDidMount() {
    Dimensions.addEventListener('change', this.forceUpdate)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.forceUpdate)
  }

  render() {
    return Children.only(this.props.children)
  }
}
