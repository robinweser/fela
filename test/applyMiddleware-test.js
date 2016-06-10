import applyMiddleware from '../modules/applyMiddleware'

describe('Applying middleware', () => {
  it('should enhance a renderer', () => {
    const renderer = { }
    const middleware = renderer => ({
      ...renderer,
      greet: name => 'Hello ' + name
    })

    const enhancedRenderer = applyMiddleware([ middleware ])(renderer)
    expect(enhancedRenderer.greet).to.be.a.function
    expect(enhancedRenderer.greet('World')).to.eql('Hello World')
  })

  it('should enhance a renderer multiple times', () => {
    const renderer = { }

    const middleware = renderer => ({
      ...renderer,
      greet: name => 'Hello ' + name
    })

    const anotherMiddleware = renderer => ({
      ...renderer,
      foo: 'bar'
    })

    const enhancedRenderer = applyMiddleware([ middleware, anotherMiddleware ])(renderer)
    expect(enhancedRenderer.greet).to.be.a.function
    expect(enhancedRenderer.greet('World')).to.eql('Hello World')
    expect(enhancedRenderer.foo).to.eql('bar')
  })
})
