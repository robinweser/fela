import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sample from 'lodash/sample'
import { connect } from 'react-fela'

// declare fela styles
const __randomButton = props => ({
  padding: '.5em 1.5em',
  color: props.theme.colorGrey,
  'background-color': props.theme.colorWhite,
  border: '1px solid currentColor',
  'border-radius': props.theme.borderRadius,
  'font-size': '16px',
  'font-weight': props.theme.weightSemiBold,
  'text-align': 'center',
  'vertical-align': 'middle',
  cursor: 'pointer'
})

/**
 * Button that changes label on every click.
 * Note: This component uses react-fela connect api to map and render styles for demo
 */
class RandomButton extends Component {
  static propTypes = {
    /**
		 * List of possible labels.
		 */
    variants: PropTypes.array.isRequired
  }

  constructor(props) {
    super()
    this.state = {
      label: sample(props.variants)
    }
  }

  handleClick() {
    this.setState({
      label: sample(this.props.variants)
    })
  }

  render() {
    const __buttonClass = this.props.styles.__randomButton
    return (
      <button className={__buttonClass} onClick={this.handleClick.bind(this)}>
        {this.state.label}
      </button>
    )
  }
}

export default connect({ __randomButton })(RandomButton)
