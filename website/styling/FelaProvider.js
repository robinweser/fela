import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { RendererProvider, RendererContext } from 'react-fela'
import getFelaRenderer from './getFelaRenderer'

const clientRenderer = getFelaRenderer()

export default function FelaProvider({ renderer = clientRenderer, children }) {
  const contextRenderer = useContext(RendererContext)

  if (contextRenderer) {
    return children
  }

  return <RendererProvider renderer={renderer}>{children}</RendererProvider>
}
