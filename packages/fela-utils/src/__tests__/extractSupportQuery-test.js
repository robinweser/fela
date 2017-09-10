import extractSupportQuery from '../extractSupportQuery'

describe('Extracting @supports queries', () => {
  it('should return the pure query', () => {
    expect(
      extractSupportQuery('@supports (display:grid){.a{color:red}}')
    ).toEqual('(display:grid)')
    expect(
      extractSupportQuery(
        '@supports (display:grid) and (color:rgba(255, 255, 255, 0.5)){.a{color:red}}'
      )
    ).toEqual('(display:grid) and (color:rgba(255, 255, 255, 0.5))')
  })
})
