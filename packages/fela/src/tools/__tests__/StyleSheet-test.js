import StyleSheet from '../StyleSheet'

describe('Creating a StyleSheet', () => {
  it('should generate rules of plain style objects', () => {
    const styles = StyleSheet.create({
      foo: { color: 'blue' },
      bar: props => ({ color: props.color })
    })

    expect(styles.foo).toBeInstanceOf(Function)
    expect(styles.bar).toBeInstanceOf(Function)
    expect(styles.foo()).toEqual({ color: 'blue' })
    expect(styles.bar({ color: 'red' })).toEqual({ color: 'red' })
  })
})
