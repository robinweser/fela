const jsdom = require('jsdom')
// const matchMedia = require('./mocks/matchMedia')
// const raf = require('./mocks/raf')

const { JSDOM } = jsdom

const { window } = new JSDOM('<!doctype html><html><body></body></html>')
global.window = window
// global.window.matchMedia = window.matchMedia || matchMedia
global.document = window.document
global.navigator = window.navigator

global.window.addEventListener = () => {}
global.window.cancelAnimationFrame = window.clearTimeout
global.window.requestAnimationFrame = (cb) => window.setTimeout(cb, 1000 / 60)

// workaround for https://github.com/facebook/react/issues/26608
MessageChannel = jest.fn().mockImplementation(() => {
  return {
    port1: {
      postMessage: jest.fn(),
    },
    port2: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  };
});
