(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginIsolation = factory());
}(this, function () { 'use strict';

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

  /*  weak */
  function addIsolation(style) {
    if (style.isolation === false) {
      // remove the isolation prop to
      // prevent false CSS properties
      delete style.isolation;
      return style;
    }

    return babelHelpers.extends({ all: 'initial' }, style);
  }

  var isolation = (function () {
    return function (style) {
      return addIsolation(style);
    };
  });

  return isolation;

}));
//# sourceMappingURL=fela-plugin-isolation.js.map