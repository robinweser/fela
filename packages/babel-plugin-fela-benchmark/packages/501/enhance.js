'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = enhance;

var _felaUtils = require('fela-utils');

function enhance() {
  for (var _len = arguments.length, enhancers = Array(_len), _key = 0; _key < _len; _key++) {
    enhancers[_key] = arguments[_key];
  }

  return function (createRenderer) {
    return function (config) {
      return (0, _felaUtils.arrayReduce)(enhancers, function (enhancedRenderer, enhancer) {
        enhancedRenderer = enhancer(enhancedRenderer);
        return enhancedRenderer;
      }, createRenderer(config));
    };
  };
}