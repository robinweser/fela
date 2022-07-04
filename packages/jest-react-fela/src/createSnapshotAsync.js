import { createElement, useEffect, useRef } from 'react'
import { createRenderer } from 'fela'
import { renderToStaticMarkup } from 'react-dom/server'
import { render } from 'react-dom'
import { RendererProvider, ThemeProvider } from 'react-fela'

import { createAsyncSnapshotFactory } from 'jest-fela-bindings'

// Wait for React to finish in concurrent mode https://github.com/reactwg/react-18/discussions/5#discussioncomment-2276079
export const CallbackWrapper = ({ callback, children }) => {
  const once = useRef(false)
  useEffect(() => {
    if (once.current) return
    once.current = true
    callback()
  }, [callback])
  return children
}

let createRoot
try {
  // eslint-disable-next-line import/no-unresolved,global-require
  const ReactDOMClient = require('react-dom/client')
  if (
    typeof ReactDOMClient !== 'undefined' &&
    typeof ReactDOMClient.createRoot !== 'undefined'
  ) {
    createRoot = ReactDOMClient.createRoot
  }
  // eslint-disable-next-line no-empty
} catch (e) {}

const renderHandler = {
  createRoot: { createRoot, CallbackWrapper },
  render,
  renderToStaticMarkup,
}

export default createAsyncSnapshotFactory(
  createElement,
  renderHandler,
  createRenderer(),
  RendererProvider,
  ThemeProvider
)
