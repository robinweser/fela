import removeUndefined from '../../modules/plugins/removeUndefined'

describe('Remove undefined plugin', () => {
  it('should remove all undefined values', () => {
    const style = {
      color: 'blue',
      fontSize: undefined,
      border: 'undefinedpx solid blue',
      ':hover': {
        color: [ 'rgba(0, 0, 0, 0.4)', undefined, 'black' ]
      }
    }

    expect(removeUndefined()(style)).to.eql({
      color: 'blue',
      ':hover': {
        color: [ 'rgba(0, 0, 0, 0.4)', 'black' ]
      }
    })
  })
})
