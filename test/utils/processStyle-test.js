import processStyle from '../../modules/utils/processStyle'

describe('Processing style', () => {
  it('should process style using data provided via the plugin interface', () => {

    const plugin = style => ({
      ...style,
      foo: 'bar'
    })

    expect(processStyle({ width: 20 }, { }, [ plugin ])).to.eql({
      width: 20,
      foo: 'bar'
    })
  })

  it('should pass meta data', () => {
    const plugin = (style, meta) => ({
      ...style,
      foo: meta.type
    })

    expect(processStyle({ width: 20 }, { type: 'rule' }, [ plugin ])).to.eql({
      width: 20,
      foo: 'rule'
    })
  })
})
