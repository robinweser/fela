import sortedStringify from '../../modules/utils/sortedStringify'

describe('Stringifying an object', () => {
  it('should sort the object', () => {
    const obj = { foo: 'bar', bar: 'foo' }

    expect(sortedStringify(obj)).to.eql('barfoofoobar')
  })
})
