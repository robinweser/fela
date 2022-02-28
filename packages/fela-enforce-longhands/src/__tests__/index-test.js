import { createRenderer } from 'fela'

import enforceLonghands from '../index'

describe('enforceLonghands enhancer', () => {
  it('should correctly apply property priority', () => {
    const renderer = createRenderer({
      enhancers: [enforceLonghands()],
    })

    expect(renderer.propertyPriority).toMatchSnapshot()
  })

  it('should accept a borderMode=longhand configuration', () => {
    const renderer = createRenderer({
      enhancers: [
        enforceLonghands({
          borderMode: 'longhand',
        }),
      ],
    })

    expect(renderer.propertyPriority).toMatchSnapshot()
  })

  it('should accept a borderMode=directional configuration', () => {
    const renderer = createRenderer({
      enhancers: [
        enforceLonghands({
          borderMode: 'directional',
        }),
      ],
    })

    expect(renderer.propertyPriority).toMatchSnapshot()
  })
})
