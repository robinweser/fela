/* @flow weak */
import { Component, PropTypes, Children } from 'react'

export default class ThemeProvider extends Component {
  static propTypes =  { theme: PropTypes.object, overwrite: PropTypes.bool };
  static childContextTypes = { theme: PropTypes.object };
  static contextTypes = { theme: PropTypes.object };

  getChildContext() {
    return {
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
