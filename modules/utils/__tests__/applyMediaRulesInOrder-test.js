import applyMediaRulesInOrder from '../applyMediaRulesInOrder'

describe('Applying media rules in order', () => {
  it('should prefill the media rules cache', () => {
    expect(
      applyMediaRulesInOrder(['(min-height: 300px)', '(min-height: 500px)'])
    ).toEqual({
      '(min-height: 300px)': '',
      '(min-height: 500px)': ''
    })
  })
})
