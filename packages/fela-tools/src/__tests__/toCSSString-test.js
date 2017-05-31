import toCSSString from '../toCSSString'

describe('Transforming strings to CSSStrings', () => {
  it('should wrap strings in double quotes', () => {
    expect(toCSSString('Arial')).toEqual('"Arial"')
  })

  it('should not add additional double quotes', () => {
    expect(toCSSString('"Arial"')).toEqual('"Arial"')
  })
})
