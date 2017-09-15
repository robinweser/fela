import processStyleWithPlugins from '../processStyleWithPlugins'

const RULE_TYPE = 1

function mockRenderer(plugin) {
  return {
    plugins: [plugin]
  }
}
describe('Processing style', () => {
  it('should process style using data provided via the plugin interface', () => {
    const plugin = style => ({
      ...style,
      foo: 'bar'
    })

    expect(
      processStyleWithPlugins(mockRenderer(plugin), {
        width: 20
      })
    ).toEqual({
      width: 20,
      foo: 'bar'
    })
  })

  it('should pass the style type', () => {
    const plugin = (style, type) => ({
      ...style,
      foo: type
    })

    expect(
      processStyleWithPlugins(
        mockRenderer(plugin),
        {
          width: 20
        },
        RULE_TYPE
      )
    ).toEqual({
      width: 20,
      foo: 1
    })
  })
})
