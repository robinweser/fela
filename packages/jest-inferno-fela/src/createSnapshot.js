import { render } from 'inferno'
import { createElement } from 'inferno-create-element'
import { Provider } from 'inferno-fela'

import { createSnapshotFactory } from 'jest-fela-bindings'

export default createSnapshotFactory(createElement, render, Provider)
