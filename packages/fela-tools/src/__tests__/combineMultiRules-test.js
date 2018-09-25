import combineMultiRules from '../combineMultiRules'

describe('Combining multi rules', () => {
  it('should create a combined multi rule', () => {
    const multiRule = {
      header: props => ({
        color: 'red',
        fontSize: props.fontSize,
      }),
      content: props => ({
        lineHeight: props.lineHeight,
        padding: 10,
      }),
    }

    const anotherMultiRule = props => ({
      header: {
        backgroundColor: 'blue',
      },
      content: {
        lineHeight: props.lineHeight * 2,
        padding: 20,
      },
    })

    const combinedMultiRule = combineMultiRules(multiRule, anotherMultiRule)
    const params = [
      {
        fontSize: 12,
        lineHeight: 10,
      },
    ]

    expect.assertions(2)
    expect(combinedMultiRule(...params).header(...params)).toEqual({
      color: 'red',
      backgroundColor: 'blue',
      fontSize: 12,
    })
    expect(combinedMultiRule(...params).content(...params)).toEqual({
      lineHeight: 20,
      padding: 20,
    })
  })
})
