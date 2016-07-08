(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('fela')) :
  typeof define === 'function' && define.amd ? define(['fela'], factory) :
  (global.FelaFontRenderer = factory(global.Fela));
}(this, function (fela) { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
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

  function fontRenderer(renderer, mountNode) {
    renderer.fontRenderer = fela.createRenderer();

    if (mountNode) {
      fela.render(renderer.fontRenderer, mountNode);
    }

    renderer.renderFont = function (family, files, properties) {
      return renderer.fontRenderer.renderFont(family, files, properties);
    };

    return renderer;
  }

  var fontRenderer$1 = (function (mountNode) {
    return function (renderer) {
      return fontRenderer(renderer, mountNode);
    };
  });

  return fontRenderer$1;

}));
//# sourceMappingURL=fela-font-renderer.js.map