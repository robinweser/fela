import { Component, PropTypes } from 'react'

export default class Theme extends Component {
  static propTypes =  { theme: PropTypes.object };
  static childContextTypes = { theme: PropTypes.object };
  static contextTypes = { theme: PropTypes.object };

  getChildContext() {
    return {
      theme: {
        ...this.context.theme,
        ...this.props.theme
      }
    }
  }

  render() {
    return this.props.children
  }
}
