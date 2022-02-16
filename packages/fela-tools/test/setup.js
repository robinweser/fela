const jsdom = require('jsdom')
// const matchMedia = require('./mocks/matchMedia')
// const raf = require('./mocks/raf')

const { JSDOM } = jsdom

const { window } = new JSDOM('<!doctype html><html><body></body></html>')
global.window = window
// global.window.matchMedia = window.matchMedia || matchMedia
global.document = window.document
global.navigator = window.navigator
