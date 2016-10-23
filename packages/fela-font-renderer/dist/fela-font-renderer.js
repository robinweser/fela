(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('fela')) :
  typeof define === 'function' && define.amd ? define(['fela'], factory) :
  (global.FelaFontRenderer = factory(global.Fela));
}(this, function (fela) { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  babelHelpers.extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  babelHelpers;

  /**
   * adds a special renderer only used for font rendering
   * to prevent flickering on changes
   *
   * @param {Object} renderer - renderer which gets enhanced
   * @param {DOMElement} mountNode - stylesheet to render fonts into
   * @return {Object} enhanced renderer
   */
  function addFontRenderer(renderer, mountNode) {
    renderer.fontRenderer = fela.createRenderer();

    // mount font styles into the mountNode
    if (mountNode) {
      fela.render(renderer.fontRenderer, mountNode);
    }

    renderer.renderFont = function (family, files, properties) {
      return renderer.fontRenderer.renderFont(family, files, properties);
    };

    return renderer;
  }

  var fontRenderer = (function (mountNode) {
    return function (renderer) {
      return addFontRenderer(renderer, mountNode);
    };
  });

  return fontRenderer;

}));
//# sourceMappingURL=fela-font-renderer.js.map