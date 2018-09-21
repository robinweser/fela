import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-fela'

// declare fela styles
const __placeHolder = props => ({
  width: `${props.width}`,
  height: `${props.height}`,
  background: '#ccc',
})

/**
 * Image placeholders.
 * Note: This component uses react-fela connect api to map and render styles for demo
 */
class Placeholder extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      'animal',
      'bacon',
      'beard',
      'bear',
      'cat',
      'food',
      'city',
      'nature',
      'people',
    ]),
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultProps = {
    type: 'animal',
    width: 150,
    height: 150,
  }

  getImageUrl() {
    const { type, width, height } = this.props
    const types = {
      animal: `http://placeimg.com/${width}/${height}/animals`,
      bacon: `http://baconmockup.com/${width}/${height}`,
      bear: `http://www.placebear.com/${width}/${height}`,
      beard: `http://placebeard.it/${width}/${height}`,
      cat: `http://lorempixel.com/${width}/${height}/cats`,
      city: `http://lorempixel.com/${width}/${height}/city`,
      food: `http://lorempixel.com/${width}/${height}/food`,
      nature: `http://lorempixel.com/${width}/${height}/nature`,
      people: `http://lorempixel.com/${width}/${height}/people`,
    }
    return types[type]
  }

  render() {
    const {
      width,
      height,
      styles: { __placeHolder: placeHolderClass },
    } = this.props
    return (
      <img
        alt={'random'}
        className={placeHolderClass}
        src={this.getImageUrl()}
        width={width}
        height={height}
      />
    )
  }
}

export default connect({ __placeHolder })(Placeholder)
