import responsiveValue from '../index'

describe('Responsive value plugin', () => {
  it('should resolve responsive values', () => {
    const style = {
      width: [100, 200],
      padding: [50, 100, 200],
    }

    expect(
      responsiveValue(
        values => {
          if (values.length === 2) {
            return ['@media (min-width: 1024px)']
          }
          return ['@media (min-width: 800px)', '@media (min-width: 1024px)']
        },
        {
          width: true,
          padding: true,
        }
      )(style)
    ).toEqual({
      width: 100,
      padding: 50,
      '@media (min-width: 800px)': {
        padding: 100,
      },
      '@media (min-width: 1024px)': {
        width: 200,
        padding: 200,
      },
    })
  })
})
