/* @flow */
import { Component, Children } from 'react'
import PropTypes from 'prop-types'

export default class ThemeProvider extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    overwrite: PropTypes.bool
  }
  static childContextTypes = { theme: PropTypes.object }
  static contextTypes = { theme: PropTypes.object }
  static defaultProps = { overwrite: false }

  getChildContext() {
    const { overwrite, theme } = this.props
    const previousTheme = this.context.theme

    return {
      theme: {
        ...(!overwrite ? previousTheme || {} : {}),
        ...theme
      }
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}
