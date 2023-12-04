import rehydrateKeyframes from '../rehydrateKeyframes'

describe('Rehydrating keyframes', () => {
  it('should match all keyframes', () => {
    expect(
      rehydrateKeyframes(
        '@keyframes frameName1{0% {opacity:0;}}; @keyframes frameName2{100%{opacity: 1;}}'
      )
    ).toMatchSnapshot()
  })
})
