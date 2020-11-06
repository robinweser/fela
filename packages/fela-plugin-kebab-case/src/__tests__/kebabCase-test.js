import kebabCase from '../index'

describe('kebab-case plugin', () => {
  it('should normalize properties', () => {
    const style = {
      color: 'blue',
      'background-color': 'red',
    }

    expect(kebabCase()(style)).toMatchSnapshot()
  })

  it('should normalized nested objects', () => {
    const style = {
      color: 'blue',
      ':hover': {
        'background-color': 'red',
      },
    }

    expect(kebabCase()(style)).toMatchSnapshot()
  })
})
