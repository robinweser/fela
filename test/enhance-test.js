import enhance from '../modules/enhance'

describe('Enhancing renderers', () => {
  it('should enhance a renderer', () => {
    const renderer = { }
    const enhancer = renderer => ({
      ...renderer,
      greet: name => 'Hello ' + name
    })

    const enhancedRenderer = enhance(enhancer)(renderer)
    expect(enhancedRenderer.greet).to.be.a.function
    expect(enhancedRenderer.greet('World')).to.eql('Hello World')
  })

  it('should enhance a renderer multiple times', () => {
    const renderer = { }

    const enhancer = renderer => ({
      ...renderer,
      greet: name => 'Hello ' + name
    })

    const anotherEnhancer = renderer => ({
      ...renderer,
      foo: 'bar'
    })

    const enhancedRenderer = enhance(enhancer, anotherEnhancer)(renderer)
    expect(enhancedRenderer.greet).to.be.a.function
    expect(enhancedRenderer.greet('World')).to.eql('Hello World')
    expect(enhancedRenderer.foo).to.eql('bar')
  })
})
