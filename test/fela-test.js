import Fela, { Selector } from '../modules/fela'

describe('Importing the default export', () => {
  it('should include Selector, DOMRenderer and helpers', () => {
    expect(Fela.Selector).to.exist
  })
})

describe('Importing destructed components', () => {
  it('should work as well', () => {
    expect(Selector).to.exist
  })
})

describe('Requiring the package using require.js', () => {
  it('should directly import the default export', () => {
    const requiredFela = require('../modules/fela')

    expect(requiredFela.Selector).to.exist
  })

  it('should also allow destructed import', () => {
    const { Selector : requiredSelector } = require('../modules/fela')

    expect(requiredSelector).to.exist
  })
})
