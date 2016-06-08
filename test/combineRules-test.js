import combineRules from '../modules/combineRules'

describe('Combining rules', () => {
  it('should create a combined rule', () => {
    const rule = props => ({
      color: 'red',
      fontSize: props.fontSize,
      lineHeight: props.lineHeight,
      padding: 10
    })

    const anotherRule = props => ({
      backgroundColor: 'blue',
      lineHeight: props.lineHeight * 2,
      padding: 20
    })

    const combineRule = combineRules(rule, anotherRule)

    expect(combineRule({ fontSize: 12, lineHeight: 10 })).to.eql({
      color: 'red',
      backgroundColor: 'blue',
      fontSize: 12,
      lineHeight: 20,
      padding: 20
    })
  })
})
