/* @flow */
import { Component } from 'preact'
import { ProviderFactory } from 'fela'

export default ProviderFactory(Component, children => children[0], {
  defaultProps: {
    rehydrate: true
  }
})
