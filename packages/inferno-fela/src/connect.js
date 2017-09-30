/* @flow */
import Component from 'inferno-component'
import createElement from 'inferno-create-element'
import { connectFactory } from 'fela-bindings'

export default connectFactory(Component, createElement)
