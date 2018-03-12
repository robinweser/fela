/* @flow */
import { Component } from 'inferno'
import { createElement } from 'inferno-create-element'
import { connectFactory } from 'fela-bindings'

export default connectFactory(Component, createElement)
