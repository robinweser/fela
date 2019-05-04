import React from 'react'

import { combineRules, createRenderer } from 'fela'
import { renderToString } from 'fela-tools'
import { connect } from 'react-fela'
import monolithic from 'fela-monolithic'

import { createSnapshot } from 'jest-react-fela'

import createIdentifier from '../index'

describe('Fela identifier enhancer', () => {
  it('should produce rule with custom property', () => {
    const identifier = createIdentifier()
    createRenderer({ enhancers: [identifier] })

    const identifierRule1 = identifier()
    const identifierRule2 = identifier()
    expect([identifierRule1(), identifierRule2()]).toMatchSnapshot()
  })

  it('should be thrown error if the identifier was not used as an enhancer', () => {
    const identifier = createIdentifier()

    expect(() => identifier()).toThrowErrorMatchingSnapshot()
  })

  it('when renderer render identifier rule, the class name should be the same as the rule', () => {
    const identifier = createIdentifier()
    const renderer = createRenderer({ enhancers: [identifier] })

    const identifierRule = identifier()
    expect(renderer.renderRule(identifierRule).trim()).toBe(
      identifierRule.className
    )
  })

  it('identifier rule should have a method "toString" which returns the class name', () => {
    const identifier = createIdentifier()
    createRenderer({ enhancers: [identifier] })

    const identifierRule = identifier()
    expect(identifierRule.toString()).toBe(identifierRule.className)
  })

  it('should be able to fully control the process of generating identifiers', () => {
    const identifier = createIdentifier({
      prefix: 'custom-prefix',
      generator: () => 'custom-id',
    })
    createRenderer({ enhancers: [identifier] })

    const identifierRule = identifier('custom-name')
    expect(identifierRule.className).toBe('custom-prefix-custom-name-custom-id')
  })

  it('identifier should produce new identifiers each time', () => {
    const identifier = createIdentifier()
    createRenderer({ enhancers: [identifier] })

    expect(identifier().className).not.toEqual(identifier().className)
  })

  it('two identifier enhancers should not affect with each other', () => {
    const identifier1 = createIdentifier()
    const renderer1 = createRenderer({ enhancers: [identifier1] })

    const identifier2 = createIdentifier()
    const renderer2 = createRenderer({ enhancers: [identifier2] })

    expect(identifier1().className).toEqual(identifier2().className)

    const identifierRule = identifier1()

    expect(renderer1.filterClassName(identifierRule.className)).toBeFalsy()
    expect(renderer2.filterClassName(identifierRule.className)).toBeTruthy()
  })

  it('identifier rule should be combined with usual style rules', () => {
    const identifier = createIdentifier()
    createRenderer({ enhancers: [identifier] })

    const identifierRule = identifier()
    const styleRule = () => ({
      color: 'red',
      fontSize: '12px',
    })
    const combinedRule = combineRules(identifierRule, styleRule)

    expect(combinedRule({}, {})).toMatchSnapshot()
  })

  it('rule can have references to several identifiers', () => {
    const identifier = createIdentifier()
    const renderer = createRenderer({ enhancers: [identifier] })

    const identifierRule1 = identifier()
    const identifierRule2 = identifier()
    const styleRule = () => ({
      color: 'red',
      fontSize: '12px',
    })
    const combinedRule = combineRules(
      identifierRule1,
      identifierRule2,
      styleRule
    )

    expect(renderer.renderRule(combinedRule)).toContain(
      identifierRule1.className
    )
    expect(renderer.renderRule(combinedRule)).toContain(
      identifierRule2.className
    )
    expect(renderer.renderRule(combinedRule)).toMatchSnapshot()
  })

  it('renderer should not use the class names that were used for identifiers', () => {
    let renderer = createRenderer()

    const styleRule = () => ({
      color: 'red',
      fontSize: '12px',
    })

    expect(renderer.renderRule(styleRule)).toBe('a b')

    const generator = jest
      .fn()
      .mockImplementationOnce(() => 'a')
      .mockImplementationOnce(() => 'b')

    const identifier = createIdentifier({
      prefix: '',
      generator,
    })
    renderer = createRenderer({ enhancers: [identifier] })

    identifier()
    identifier()

    expect(renderer.renderRule(styleRule)).toBe('c d')
  })

  it('identifier rule should not be contained in the output css', () => {
    const identifier = createIdentifier()
    const renderer = createRenderer({ enhancers: [identifier] })

    const identifierRule = identifier()
    const styleRule = () => ({
      color: 'red',
      fontSize: '12px',
    })
    const combinedRule = combineRules(identifierRule, styleRule)
    renderer.renderRule(combinedRule)

    expect(renderToString(renderer)).toMatchSnapshot()
  })

  it('identifier enhancer should not remove meta information in rule', () => {
    const rules = {
      rule1: () => ({
        padding: 1,
      }),
      rule2: () => ({
        color: 'red',
      }),
    }

    const Component = ({ styles }) => (
      <div>
        <span className={styles.rule1} />
        <span className={styles.rule2} />
      </div>
    )

    const ConnectedComponent = connect(rules)(Component)

    expect(
      createSnapshot(
        <ConnectedComponent />,
        {},
        createRenderer({
          enhancers: [
            monolithic({ prettySelectors: true }),
            createIdentifier(),
          ],
        })
      )
    ).toMatchSnapshot()
  })
})
