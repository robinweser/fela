/* eslint-disable react/prop-types */
import React from 'react'
import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import unit from 'fela-plugin-unit'
import embedded from 'fela-plugin-embedded'
import fallbackValue from 'fela-plugin-fallback-value'

import View from './View'

const renderer = createRenderer({
  // optimizePlugins: true,
  plugins: [embedded(), unit(), fallbackValue()],
})

class Provider extends React.Component {
  render() {
    return (
      <RendererProvider renderer={renderer}>
        <View>{this.props.children}</View>
      </RendererProvider>
    )
  }
}

export default Provider
