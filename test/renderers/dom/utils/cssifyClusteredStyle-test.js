import cssifyClusteredStyle from '../../../../modules/renderers/dom/utils/cssifyClusteredStyle'

describe('Cssifying clustered style', () => {
  it('should generate a valid CSS string', () => {
    const style = {
      '': {
        color: 'blue',
        fontSize: '12px'
      },
      ':hover': {
        color: 'red'
      }
    }

    expect(cssifyClusteredStyle(style, 'c0')).to.eql('.c0{color:blue;font-size:12px}.c0:hover{color:red}')
  })
})
