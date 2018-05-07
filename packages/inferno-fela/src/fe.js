/* @flow */
import { createElement } from 'inferno-create-element'
import { feFactory } from 'fela-bindings'

import FelaComponent from './FelaComponent'

export default feFactory(createElement, FelaComponent)
