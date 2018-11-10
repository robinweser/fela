import React from 'react'
import { FelaComponent } from 'react-fela'

import { createRenderer } from 'fela'
import plugins from 'fela-preset-web'

import createSnapshot from '../createSnapshot'

describe('Creating Snapshots with Fela', () => {
  it('should return formatted html and css', () => {
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

    expect(createSnapshot(<FelaComponent style={style} />)).toMatchSnapshot()
  })

  it('should always use a clean setup', () => {
    expect(
      createSnapshot(
        <FelaComponent style={{ color: 'red', backgroundColor: 'blue' }} />
      )
    ).toMatchSnapshot()
    expect(
      createSnapshot(
        <FelaComponent style={{ color: 'red', backgroundColor: 'green' }} />
      )
    ).toMatchSnapshot()
  })

  it('should inject the theme', () => {
    const rule = ({ theme }) => ({
      backgroundColor: theme.bgColor,
      color: 'red',
    })

    expect(
      createSnapshot(<FelaComponent style={rule} />, { bgColor: 'blue' })
    ).toMatchSnapshot()
  })

  it('should use a custom renderer', () => {
    const renderer = createRenderer({
      plugins,
    })

    expect(
      createSnapshot(
        <FelaComponent style={{ appearance: 'none', fontSize: 12 }} />,
        {},
        renderer
      )
    ).toMatchSnapshot()
  })
})
