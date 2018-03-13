/* @flow */
import { Component } from 'inferno'
import { createElement } from 'inferno-create-element'
import { withThemeFactory } from 'fela-bindings'

export default withThemeFactory(Component, createElement)
