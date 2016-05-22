import FelaDOM, { Renderer } from '../modules/felaDOM'

describe('Importing the default export', () => {
  it('should include Selector, DOMRenderer and helpers', () => {
    expect(FelaDOM.Renderer).to.exist
  })
})

describe('Importing destructed components', () => {
  it('should work as well', () => {
    expect(Renderer).to.exist
  })
})

describe('Requiring the package using require.js', () => {
  it('should directly import the default export', () => {
    const requiredFelaDOM = require('../modules/felaDOM')

    expect(requiredFelaDOM.Renderer).to.exist
  })

  it('should also allow destructed import', () => {
    const { Renderer : requiredRenderer } = require('../modules/felaDOM')

    expect(requiredRenderer).to.exist
  })
})
