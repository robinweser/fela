import { createRenderer, combineRules } from 'fela'
import { renderToString } from 'fela-tools'
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

  it('identifier rule should be combined with usual style rules', () => {
    const identifier = createIdentifier()
    const renderer = createRenderer({ enhancers: [identifier] })

    const identifierRule = identifier()
    const styleRule = () => ({
      color: 'red',
      fontSize: '12px',
    })
    const combinedRule = combineRules(identifierRule, styleRule)

    expect(combinedRule({}, renderer)).toMatchSnapshot()
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
})
