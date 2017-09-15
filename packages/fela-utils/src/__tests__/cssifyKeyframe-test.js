import cssifyKeyframe from '../cssifyKeyframe'

describe('Cssifying keyframes', () => {
  it('should generate a valid CSS string', () => {
    expect(
      cssifyKeyframe(
        {
          from: {
            color: 'blue'
          },
          to: {
            color: 'red'
          }
        },
        'foo'
      )
    ).toEqual('@keyframes foo{from{color:blue}to{color:red}}')
  })

  it('should generated -webkit- prefixed keyframe string', () => {
    expect(
      cssifyKeyframe(
        {
          from: {
            color: 'blue'
          },
          to: {
            color: 'red'
          }
        },
        'foo',
        ['-webkit-']
      )
    ).toEqual('@-webkit-keyframes foo{from{color:blue}to{color:red}}')
  })

  it('should generated both -webkit- prefixed and unprefixed keyframe string', () => {
    expect(
      cssifyKeyframe(
        {
          from: {
            color: 'blue'
          },
          to: {
            color: 'red'
          }
        },
        'foo',
        ['-webkit-', '']
      )
    ).toEqual(
      '@-webkit-keyframes foo{from{color:blue}to{color:red}}@keyframes foo{from{color:blue}to{color:red}}'
    )
  })
})
