import React from 'react'
import { FelaComponent } from 'react-fela'

import { createRenderer } from 'fela'
import plugins from 'fela-preset-web'

import createSnapshotAsync from '../createSnapshotAsync'

jest.mock('react', () => jest.requireActual('react-18'))
jest.mock('react-dom', () => jest.requireActual('react-dom-18'))
jest.mock('react-dom/client', () => jest.requireActual('react-dom-18/client'), {
  virtual: true,
})

describe('Creating Snapshots with Fela', () => {
  it('should run on React 18', () => {
    // eslint-disable-next-line import/no-unresolved,global-require
    const { createRoot } = require('react-dom/client')
    expect(createRoot).toBeDefined()
  })
  it('should return formatted html and css', async () => {
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
      await createSnapshotAsync(<FelaComponent style={style} />)
    ).toMatchSnapshot()
  })

  it('should always use a clean setup', async () => {
    expect(
      await createSnapshotAsync(
        <FelaComponent style={{ color: 'red', backgroundColor: 'blue' }} />
      )
    ).toMatchSnapshot()
    expect(
      await createSnapshotAsync(
        <FelaComponent style={{ color: 'red', backgroundColor: 'green' }} />
      )
    ).toMatchSnapshot()
  })

  it('should inject the theme', async () => {
    const rule = ({ theme }) => ({
      backgroundColor: theme.bgColor,
      color: 'red',
    })

    expect(
      await createSnapshotAsync(<FelaComponent style={rule} />, {
        bgColor: 'blue',
      })
    ).toMatchSnapshot()
  })

  it('should use a custom renderer', async () => {
    const renderer = createRenderer({
      plugins,
    })

    expect(
      await createSnapshotAsync(
        <FelaComponent style={{ appearance: 'none', fontSize: 12 }} />,
        {},
        renderer
      )
    ).toMatchSnapshot()
  })
})
