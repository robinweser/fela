import React from 'react'

import createSnapshot from '../createSnapshot'

import FelaComponent from '../../../react-fela/src/FelaComponent'
import createRenderer from '../../../fela/src/createRenderer'
import webPreset from '../../../fela-preset-web/src/index'

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
