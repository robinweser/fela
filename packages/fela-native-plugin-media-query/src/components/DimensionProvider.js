/* @flow */
import { Component, Children } from 'react'
import { Dimension } from 'react-native'

export default class DimensionProvider extends Component {
  state = Dimensions.get('window')
  updateDevice = dimensions => this.setState(dimensions)

  componentWillMount() {
    Dimensions.addEventListener('change', this.updateDimensions)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateDimensions)
  }

  render() {
    return Children.only(this.props.children)
  }
}
