import 'raf/polyfill'
import React from 'react'

import { createSnapshot } from 'jest-react-fela'
import { useFela } from 'react-fela'

describe('Using the useFela hook', () => {
  it('should correctly render styles', () => {
    function Button() {
      const { css } = useFela()

      return <div className={css({ color: 'red' })}>red</div>
    }

    expect(createSnapshot(<Button />)).toMatchSnapshot()
  })

  it('should combine rules', () => {
    function Button() {
      const { css } = useFela()

      return (
        <div className={css({ color: 'red' }, { backgroundColor: 'blue' })}>
          red
        </div>
      )
    }

    expect(createSnapshot(<Button />)).toMatchSnapshot()
  })

  it('should use the theme', () => {
    function Button() {
      const { css, theme } = useFela()

      return (
        <div className={css({ color: theme.primary })}>{theme.primary}</div>
      )
    }

    expect(createSnapshot(<Button />, { primary: 'red' })).toMatchSnapshot()
  })

  it('should use pass props', () => {
    const rule = ({ color, size }) => ({
      color,
      fontSize: size,
    })

    function Button(props) {
      const { css, theme } = useFela(props)

      return <div className={css(rule)}>{theme.primary}</div>
    }

    expect(createSnapshot(<Button color="red" size="15px" />)).toMatchSnapshot()
  })
})
