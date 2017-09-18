import { Component } from 'react'

import generateDisplayName from '../generateDisplayName'

describe('Generating display names', () => {
  it('should return a fela wrapped displayName', () => {
    class Foo extends Component {}

    expect(generateDisplayName(Foo)).toEqual('FelaFoo')
  })

  it('should return the component displayName', () => {
    const foo = {}
    expect(generateDisplayName(foo)).toEqual('ConnectedFelaComponent')
  })
})
