import React, { Children, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import createRenderer from './createFelaRenderer'
import createFontRenderer from './createFontRenderer'
import { Provider as FelaProvider, ThemeProvider } from 'react-fela'

// should be from another file. Use this to drive themes.
import defaultTheme from './base-ui-theme'

// Use the below function to customer dev/prod mode plugins
const felaRenderer = createRenderer()

class StyleProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.object.isRequired,
    renderer: PropTypes.object
  }

  static defaultProps = {
    theme: defaultTheme,
    renderer: null
  }

  render() {
    // props can contain a passed renderer. Useful for SSR.
    const { children, theme, renderer } = this.props
    const child = Children.only(children)
    // render all the fonts
    createFontRenderer(renderer || felaRenderer, theme)
    return (
      <FelaProvider renderer={renderer || felaRenderer}>
        <ThemeProvider theme={theme}>
          {isValidElement(child)
            ? cloneElement(child, { ...this.props })
            : child}
        </ThemeProvider>
      </FelaProvider>
    )
  }
}

export default StyleProvider
