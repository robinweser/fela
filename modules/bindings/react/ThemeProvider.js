/* @flow weak */
import { Component, PropTypes, Children } from 'react'

export default class ThemeProvider extends Component {
  static propTypes =  { theme: PropTypes.object, flat: PropTypes.bool, overwrite: PropTypes.bool };
  static childContextTypes = { theme: PropTypes.object, flat: PropTypes.bool };
  static contextTypes = { theme: PropTypes.object, flat: PropTypes.bool };

  getChildContext() {
    return {
      flat: this.props.flat || false,
      theme: {
        ...(!this.props.overwrite && this.context.theme || {}),
        ...this.props.theme
      }
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}
