import extractDynamicStyle from '../../../../modules/renderers/dom/utils/extractDynamicStyle'

describe('Extracting dynamic style', () => {
  it('should only return the difference of two style objects', () => {
    const base = {
      color: 'red',
      display: '-webkit-box;display:flex',
      something: {
        color: 'blue'
      },
      test: {
        foo: 'bar'
      },
      fontSize: '12px',
      width: false
    }

    const style = {
      color: 'blue',
      something: {
        fontSize: '15px'
      },
      test: {
        foo: 'bar'
      },
      width: true,
      fontSize: '12px',
      height: 12
    }

    expect(extractDynamicStyle(style, base)).to.eql({
      color: 'blue',
      something: {
        fontSize: '15px'
      },
      width: true,
      height: 12
    })
  })
})
