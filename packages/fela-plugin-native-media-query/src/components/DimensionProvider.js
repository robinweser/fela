/* eslint-disable import/no-unresolved, import/extensions */
import { Dimension } from 'react-native'

/* @flow */
import { Component, Children } from 'react'

type DimensionType = {
  width: number,
  height: number
}

export default class DimensionProvider extends Component {
  state = Dimension.get('window')

  componentWillMount() {
    Dimension.addEventListener('change', this.updateDimensions)
  }

  componentWillUnmount() {
    Dimension.removeEventListener('change', this.updateDimensions)
  }

  updateDimensions = (dimensions: DimensionType) => this.setState(dimensions)

  render() {
    return Children.only(this.props.children)
  }
}
