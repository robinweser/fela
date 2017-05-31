/* @flow */
import Component from 'inferno-component'

export default class ThemeProvider extends Component {
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
    return this.props.children
  }
}
