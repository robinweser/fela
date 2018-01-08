import applyKeysInOrder from '../applyKeysInOrder'

describe('Applying media rules in order', () => {
  it('should prefill the media rules cache', () => {
    expect(
      applyKeysInOrder(['(min-height: 300px)', '(min-height: 500px)'])
    ).toEqual({
      '(min-height: 300px)': '',
      '(min-height: 500px)': '',
    })
  })
})
