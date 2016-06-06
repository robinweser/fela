import combineSelectors from '../../modules/helpers/combineSelectors'

describe('Combining selectors', () => {
  it('should create a combined selector', () => {
    const selector = props => ({
      color: 'red',
      fontSize: props.fontSize,
      lineHeight: props.lineHeight,
      padding: 10
    })

    const anotherSelector = props => ({
      backgroundColor: 'blue',
      lineHeight: props.lineHeight * 2,
      padding: 20
    })

    const combinedSelector = combineSelectors(selector, anotherSelector)

    expect(combinedSelector({ fontSize: 12, lineHeight: 10 })).to.eql({
      color: 'red',
      backgroundColor: 'blue',
      fontSize: 12,
      lineHeight: 20,
      padding: 20
    })
  })
})