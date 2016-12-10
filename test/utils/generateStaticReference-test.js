import generateStaticReference from '../../modules/utils/generateStaticReference'

describe('Generating static style references', () => {
  it('should return a valid css selector', () => {
    expect(generateStaticReference('.foo{color:red}')).to.eql('.foo{color:red}')
    expect(generateStaticReference({ color: 'red' }, '.foo')).to.eql('.foo{"color":"red"}')
  })
})
