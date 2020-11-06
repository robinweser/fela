/* eslint-disable react/prop-types */
import React from 'react'
import { createRenderer } from 'fela'
import { RendererProvider  } from 'react-fela'
import View from './View'

const renderer = createRenderer()

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
