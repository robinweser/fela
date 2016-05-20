import Fela, { Selector, DOMRenderer, enhanceWithPlugins } from '../modules/fela'

describe('Importing the default export', () => {
  it('should include Selector, DOMRenderer and helpers', () => {
    expect(Fela.Selector).to.be.exist
    expect(Fela.DOMRenderer).to.be.a.object
    expect(Fela.DOMRenderer.render).to.be.a.function
    expect(Fela.enhanceWithPlugins).to.be.a.function
  })
})

describe('Importing destructed components', () => {
  it('should work as well', () => {
    expect(Selector).to.be.exist
    expect(DOMRenderer).to.be.a.object
    expect(DOMRenderer.render).to.be.a.function
    expect(enhanceWithPlugins).to.be.a.function
  })
})

describe('Requiring the package using require.js', () => {
  it('should directly import the default export', () => {
    const requiredFela = require('../modules/fela')

    expect(requiredFela.Selector).to.be.exist
    expect(requiredFela.DOMRenderer).to.be.a.object
    expect(requiredFela.DOMRenderer.render).to.be.a.function
    expect(requiredFela.enhanceWithPlugins).to.be.a.function
  })

  it('should also allow destructed import', () => {
    const { Selector : requiredSelector, DOMRenderer : requiredDOMRenderer, enhanceWithPlugins : requiredenhanceWithPlugins } = require('../modules/fela')

    expect(requiredSelector).to.be.exist
    expect(requiredDOMRenderer).to.be.a.object
    expect(requiredDOMRenderer.render).to.be.a.function
    expect(requiredenhanceWithPlugins).to.be.a.function
  })
})