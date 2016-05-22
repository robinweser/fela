import Fela, { Selector, enhanceWithPlugins } from '../modules/fela'

describe('Importing the default export', () => {
  it('should include Selector, DOMRenderer and helpers', () => {
    expect(Fela.Selector).to.exist
    expect(Fela.enhanceWithPlugins).to.be.a.function
  })
})

describe('Importing destructed components', () => {
  it('should work as well', () => {
    expect(Selector).to.exist
    expect(enhanceWithPlugins).to.be.a.function
  })
})

describe('Requiring the package using require.js', () => {
  it('should directly import the default export', () => {
    const requiredFela = require('../modules/fela')

    expect(requiredFela.Selector).to.exist
    expect(requiredFela.enhanceWithPlugins).to.be.a.function
  })

  it('should also allow destructed import', () => {
    const { Selector : requiredSelector, enhanceWithPlugins : requiredEnhanceWithPlugins } = require('../modules/fela')

    expect(requiredSelector).to.exist
    expect(requiredEnhanceWithPlugins).to.be.a.function
  })
})
