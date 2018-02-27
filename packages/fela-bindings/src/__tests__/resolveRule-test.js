import resolveRule from '../resolveRule'

describe('Resolving rules', () => {
  it('should resolve the rule', () => {
    const rule = ({ color }) => ({
      color,
      fontSize: 12,
    })

    expect(resolveRule(rule, { color: 'red' })).toEqual({
      color: 'red',
      fontSize: 12,
    })
  })

  it('should return the style object', () => {
    const style = {
      color: 'blue',
      fontSize: 12,
    }

    expect(resolveRule(style)).toBe(style)
  })
})
