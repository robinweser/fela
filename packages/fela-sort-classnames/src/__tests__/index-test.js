import { createRenderer } from 'fela'
import sortClassNames from '../index'

describe('Using the sortClassNames enhancer', () => {
  it('should correctly sort the class names', () => {
    const renderer = createRenderer({
      enhancers: [sortClassNames()],
    })

    const classNameA = renderer.renderRule(() => ({
      color: 'red',
      backgroundColor: 'blue',
    }))

    const classNameB = renderer.renderRule(() => ({
      color: 'yellow',
      backgroundColor: 'blue',
      fontSize: 12,
    }))

    expect([classNameA, classNameB]).toMatchSnapshot()
  })
})
