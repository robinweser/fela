import Fela, { Selector, render, clear, enhanceWithPlugins } from '../modules/fela'

describe('Importing the default export', () => {
  it('should include Selector, DOMRenderer and helpers', () => {
    expect(Fela.Selector).to.be.exist
    expect(Fela.render).to.be.a.function
    expect(Fela.clear).to.be.a.function
    expect(Fela.enhanceWithPlugins).to.be.a.function
  })
})

describe('Importing destructed components', () => {
  it('should work as well', () => {
    expect(Selector).to.be.exist
    expect(render).to.be.a.function
    expect(clear).to.be.a.function
    expect(enhanceWithPlugins).to.be.a.function
  })
})

describe('Requiring the package using require.js', () => {
  it('should directly import the default export', () => {
    const requiredFela = require('../modules/fela')

    expect(requiredFela.Selector).to.be.exist
    expect(requiredFela.render).to.be.a.function
    expect(requiredFela.clear).to.be.a.function
    expect(requiredFela.enhanceWithPlugins).to.be.a.function
  })

  it('should also allow destructed import', () => {
    const { Selector : requiredSelector, render : requiredRender, clear: requiredClear, enhanceWithPlugins : requiredEnhanceWithPlugins } = require('../modules/fela')

    expect(requiredSelector).to.be.exist
    expect(requiredRender).to.be.a.function
    expect(requiredClear).to.be.a.function
    expect(requiredEnhanceWithPlugins).to.be.a.function
  })
})