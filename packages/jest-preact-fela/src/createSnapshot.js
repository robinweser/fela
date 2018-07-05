import { createElement, render } from 'preact'
import { Provider } from 'preact-fela'

import { createSnapshotFactory } from 'jest-fela-bindings'

export default createSnapshotFactory(createElement, render, Provider)
