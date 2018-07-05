import React, { createElement } from 'react'
import { render } from 'react-dom'

import createSnapshotFactory from '../createSnapshotFactory'

import FelaComponent from '../../../react-fela/src/FelaComponent'
import Provider from '../../../react-fela/src/Provider'
import createRenderer from '../../../fela/src/createRenderer'
import webPreset from '../../../fela-preset-web/src/index'

const createSnapshot = createSnapshotFactory(createElement, render, Provider)

describe('Creating Snapshots with Fela', () => {
  it('should return formatted html and css', () => {
    const renderer = createRenderer({
      plugins: webPreset,
    })

    const style = {
      display: 'flex',
      flex: '1 0 auto',
      ':hover': {
        color: 'blue',
      },
      '@media (min-width: 300px)': {
        backgroundColor: 'black',
        ':hover': {
          color: 'green',
        },
      },
    }

    expect(
      createSnapshot(<FelaComponent style={style} />, renderer)
    ).toMatchSnapshot()
  })

  it('should always use a clean setup', () => {
    const renderer = createRenderer({
      plugins: webPreset,
    })

    expect(
      createSnapshot(
        <FelaComponent style={{ color: 'red', backgroundColor: 'blue' }} />,
        renderer
      )
    ).toMatchSnapshot()
    expect(
      createSnapshot(
        <FelaComponent style={{ color: 'red', backgroundColor: 'green' }} />,
        renderer
      )
    ).toMatchSnapshot()
  })
})
