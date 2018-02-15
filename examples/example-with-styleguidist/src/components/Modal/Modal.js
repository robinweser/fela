import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

/**
 * Modal dialog (actually just a [react-modal](https://github.com/rackt/react-modal) wrapper).
 * Note: This component uses external library without using fela api for demo.
 */
export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    isOpen: false,
  }

  render() {
    const { isOpen, children } = this.props
    const style = {
      overlay: {
        zIndex: 999,
      },
    }
    return (
      <ReactModal contentLabel="Modal" isOpen={isOpen} style={style}>
        {children}
      </ReactModal>
    )
  }
}
