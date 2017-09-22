import { Component } from 'react'

import generateDisplayName from '../generateDisplayName'

describe('Generating display names', () => {
  it('should return a fela wrapped displayName', () => {
    /* eslint-disable react/prefer-stateless-function */
    class Foo extends Component {}
    /* eslint-enable */

    expect(generateDisplayName(Foo)).toEqual('FelaFoo')
  })

  it('should return a fela wrapped displayName', () => {
    const Bar = () => ({})

    expect(generateDisplayName(Bar)).toEqual('FelaBar')
  })

  it('should return the component displayName', () => {
    const foo = {}
    expect(generateDisplayName(foo)).toEqual('ConnectedFelaComponent')
  })
})
