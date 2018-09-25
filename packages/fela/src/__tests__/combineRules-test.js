import combineRules from '../combineRules'

describe('Combining rules', () => {
  it('should create a combined rule', () => {
    const rule = props => ({
      color: 'red',
      fontSize: props.fontSize,
      lineHeight: props.lineHeight,
      padding: 10,
    })

    const anotherRule = props => ({
      backgroundColor: 'blue',
      lineHeight: props.lineHeight * 2,
      padding: 20,
    })

    const combinedRule = combineRules(rule, anotherRule)

    expect(
      combinedRule({
        fontSize: 12,
        lineHeight: 10,
      })
    ).toEqual({
      color: 'red',
      backgroundColor: 'blue',
      fontSize: 12,
      lineHeight: 20,
      padding: 20,
    })
  })

  it('should combine any amount of rules', () => {
    const rule1 = props => ({
      color: 'red',
      fontSize: props.fontSize,
      lineHeight: props.lineHeight,
      padding: 10,
    })

    const rule2 = props => ({
      backgroundColor: 'blue',
      lineHeight: props.lineHeight * 2,
      padding: 20,
    })

    const rule3 = props => ({
      color: props.color,
    })

    const rule4 = () => ({
      display: 'flex',
    })

    const combinedRule = combineRules(rule1, rule2, rule3, rule4)

    expect(
      combinedRule({
        fontSize: 12,
        lineHeight: 10,
        color: 'green',
      })
    ).toEqual({
      color: 'green',
      display: 'flex',
      backgroundColor: 'blue',
      fontSize: 12,
      lineHeight: 20,
      padding: 20,
    })
  })
})
