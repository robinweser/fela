import enhance from '../enhance'
import createRenderer from '../createRenderer'

describe('Enhancing renderers', () => {
  it('should enhance a renderer', () => {
    const enhancer = renderer => ({
      ...renderer,
      greet: name => `Hello ${name}`,
    })

    const enhancedRenderer = enhance(enhancer)(createRenderer)()
    expect(enhancedRenderer.greet).toBeInstanceOf(Function)
    expect(enhancedRenderer.greet('World')).toEqual('Hello World')
  })

  it('should enhance a renderer multiple times', () => {
    const enhancer = renderer => ({
      ...renderer,
      greet: name => `Hello ${name}`,
    })

    const anotherEnhancer = renderer => ({
      ...renderer,
      foo: 'bar',
    })

    const enhancedRenderer = enhance(enhancer, anotherEnhancer)(
      createRenderer
    )()
    expect(enhancedRenderer.greet).toBeInstanceOf(Function)
    expect(enhancedRenderer.greet('World')).toEqual('Hello World')
    expect(enhancedRenderer.foo).toEqual('bar')
  })
})
