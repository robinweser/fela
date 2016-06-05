import validateStyle from '../../../../modules/renderers/dom/utils/validateStyle'

describe('Validating style', () => {
  it('should remove invalid properties', () => {
    const selector = props => ({
      color: props.color,
      display: [ '-webkit-box', 'flex' ],
      something: {
        color: 'blue'
      },
      fontSize: '12px',
      animation: props.name + ' 2s infinite',
      width: false
    })

    expect(validateStyle(selector({ }))).to.eql({
      fontSize: '12px'
    })
  })
})
