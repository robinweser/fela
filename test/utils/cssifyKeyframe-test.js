import cssifyKeyframe from '../../modules/utils/cssifyKeyframe'

describe('Cssifying keyframes', () => {
  it('should generate a valid CSS string', () => {
    const frames = { from: { color: 'blue' }, to: { color: 'red' } }

    expect(cssifyKeyframe(frames, 'k0')).to.eql('@keyframes k0{from{color:blue}to{color:red}}')
  })

  it('should generated -webkit- prefixed keyframe string', () => {
    const frames = { from: { color: 'blue' }, to: { color: 'red' } }

    expect(cssifyKeyframe(frames, 'k0', [ '-webkit-' ])).to.eql('@-webkit-keyframes k0{from{color:blue}to{color:red}}')
  })

  it('should generated both -webkit- prefixed and unprefixed keyframe string', () => {
    const frames = { from: { color: 'blue' }, to: { color: 'red' } }

    expect(cssifyKeyframe(frames, 'k0', [ '-webkit-', '' ])).to.eql('@-webkit-keyframes k0{from{color:blue}to{color:red}}@keyframes k0{from{color:blue}to{color:red}}')
  })
})
