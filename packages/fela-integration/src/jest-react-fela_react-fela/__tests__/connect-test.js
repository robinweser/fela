import 'raf/polyfill'
import React from 'react'

import { createRenderer } from 'fela'
import { createSnapshot } from 'jest-react-fela'
import { connect } from 'react-fela'

describe('Connect Factory for bindings', () => {
  it('should process rules and create classNames', () => {
    const rules = {
      rule1: () => ({
        padding: 1,
      }),
      rule2: props => ({
        color: props.color,
      }),
    }

    const Comp = connect(rules)(({ styles }) => (
      <div>
        <span className={styles.rule1} />
        <span className={styles.rule2} />
      </div>
    ))

    Comp.defaultProps = {
      color: 'red',
    }

    expect(createSnapshot(<Comp />)).toMatchSnapshot()
  })

  it('should pass through "theme" prop into Component', () => {
    const rules = {
      rule1: () => ({
        padding: 1,
      }),
      rule2: props => ({
        color: props.color,
      }),
    }

    const InnerComp = jest.fn(() => null)

    const Comp = connect(rules)(InnerComp)

    const theme = {
      primary: 'red',
      secondary: 'blue',
    }

    createSnapshot(<Comp />, theme)

    expect(InnerComp).toHaveBeenCalledWith(
      {
        styles: expect.anything(),
        rules: expect.anything(),
        theme,
      },
      expect.anything()
    )
    expect(InnerComp).toHaveBeenCalledTimes(1)
  })

  it('should process rules and create classNames with rules as function', () => {
    const rules = jest.fn(props => ({
      rule1: {
        padding: 1,
      },
      rule2: {
        color: props.color,
      },
    }))

    const Comp = connect(rules)(({ styles }) => (
      <div>
        <span className={styles.rule1} />
        <span className={styles.rule2} />
      </div>
    ))

    Comp.defaultProps = {
      color: 'red',
    }

    const renderer = createRenderer()

    expect(createSnapshot(<Comp />, {}, renderer)).toMatchSnapshot()
    expect(rules).toHaveBeenCalledWith(
      {
        color: 'red',
        theme: {},
      },
      renderer
    )
    expect(rules).toHaveBeenCalledTimes(1)
  })

  it('should extend the rule properties', () => {
    const rules = props => ({
      rule1: {
        padding: 1,
      },
      rule2: {
        color: props.color,
      },
    })

    const Comp = connect(rules)(({ styles }) => (
      <div>
        <span className={styles.rule1} />
        <span className={styles.rule2} />
      </div>
    ))

    Comp.defaultProps = {
      color: 'red',
    }

    const extend = {
      rule1: {
        padding: 2,
      },
      rule2: {
        fontSize: 16,
      },
    }

    expect(createSnapshot(<Comp extend={extend} />)).toMatchSnapshot()
  })

  it('should compose styles', () => {
    const rules = props => ({
      rule1: {
        padding: 1,
      },
      rule2: {
        color: props.color,
      },
    })

    const anotherRules = {
      rule1: () => ({
        padding: 2,
      }),
      rule2: () => ({
        fontSize: 16,
      }),
    }

    const Comp = connect(anotherRules)(
      connect(rules)(({ styles }) => (
        <div>
          <span className={styles.rule1} />
          <span className={styles.rule2} />
        </div>
      ))
    )

    Comp.defaultProps = {
      color: 'red',
    }

    expect(createSnapshot(<Comp />)).toMatchSnapshot()
  })

  it('should component receive rules prop with all combined rules', () => {
    const rules = props => ({
      rule1: {
        padding: 1,
      },
      rule2: {
        color: props.color,
      },
    })

    const anotherRules = {
      rule1: () => ({
        padding: 2,
      }),
      rule2: () => ({
        fontSize: 16,
      }),
    }

    const Comp = connect(rules)(({ styles }) => (
      <div>
        <span className={styles.rule1} />
        <span className={styles.rule2} />
      </div>
    ))

    const ProxyWrapper = connect(anotherRules)(({ rules: injectedRules }) => (
      <div>
        <Comp color="red" extend={injectedRules} />
      </div>
    ))

    expect(createSnapshot(<ProxyWrapper />)).toMatchSnapshot()
  })

  it('should provide rules prop for connected component which is an object with rules in the values of fields', () => {
    const rules = props => ({
      rule1: ({ theme }) => ({
        padding: theme.padding,
      }),
      rule2: {
        color: props.color,
      },
    })

    expect.assertions(6)

    const Comp = connect(rules)(({ rules: injectedRules }) => {
      expect(injectedRules.rule1).toBeInstanceOf(Function)
      expect(injectedRules.rule2).toBeInstanceOf(Function)

      expect(injectedRules.rule1()).toEqual({ padding: 1 })
      expect(injectedRules.rule1({ theme: { padding: 2 } })).toEqual({
        padding: 2,
      })

      expect(injectedRules.rule2()).toEqual({ color: 'red' })

      return null
    })

    expect(
      createSnapshot(<Comp color="red" />, { padding: 1 })
    ).toMatchSnapshot()
  })
})
