import cssifyKeyframe from '../../modules/utils/cssifyKeyframe'

describe('Cssifying keyframes', () => {
  it('should generate a valid CSS string', () => {
    expect(cssifyKeyframe(
      { from: { color: 'blue' }, to: { color: 'red' } },
      'foo')
    ).to.eql('@keyframes foo{from{color:blue}to{color:red}}')
  })

  it('should generated -webkit- prefixed keyframe string', () => {
    expect(cssifyKeyframe(
      { from: { color: 'blue' }, to: { color: 'red' } },
      'foo',
      [ '-webkit-' ])
    ).to.eql('@-webkit-keyframes foo{from{color:blue}to{color:red}}')
  })

  it('should generated both -webkit- prefixed and unprefixed keyframe string', () => {
    expect(cssifyKeyframe(
      { from: { color: 'blue' }, to: { color: 'red' } },
      'foo',
      [ '-webkit-', '' ])
    ).to.eql('@-webkit-keyframes foo{from{color:blue}to{color:red}}@keyframes foo{from{color:blue}to{color:red}}')
  })
})
