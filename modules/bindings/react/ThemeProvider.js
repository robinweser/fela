import { Component, PropTypes } from 'react'

export default class ThemeProvider extends Component {
  static propTypes =  { theme: PropTypes.object, flat: PropTypes.bool, overwrite: PropTypes.bool };
  static childContextTypes = { theme: PropTypes.object, flat: PropTypes.bool };
  static contextTypes = { theme: PropTypes.object, flat: PropTypes.bool };

  getChildContext() {
    return {
      flat: this.props.flat || this.props.flat,
      theme: {
        ...(!overwrite && this.context.theme),
        ...this.props.theme
      }
    }
  }

  render() {
    return this.props.children
  }
}
