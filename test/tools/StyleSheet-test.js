import StyleSheet from '../../modules/tools/StyleSheet'

describe('Creating a StyleSheet', () => {
  it('should generate rules of plain style objects', () => {
    const styles = StyleSheet.create({
      foo: {
        color: 'blue'
      },
      bar: props => ({ color: props.color })
    })

    expect(styles.foo).to.be.a.function
    expect(styles.bar).to.be.a.function
    expect(styles.foo()).to.eql({ color: 'blue' })
    expect(styles.bar({ color: 'red' })).to.eql({
      color: 'red'
    })
  })
})
