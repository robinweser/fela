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

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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
    var exclude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (style.isolation === false) {
      // remove the isolation prop to
      // prevent false CSS properties
      delete style.isolation;
      return style;
    }

    var excludedDeclarations = exclude.reduce(function (exclusion, property) {
      exclusion[property] = 'inherit';
      return exclusion;
    }, {});

    return babelHelpers.extends({
      all: 'initial'
    }, excludedDeclarations, style);
  }

  var isolation = (function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (style) {
      return addIsolation(style, options.exclude);
    };
  });

  return isolation;

}));
//# sourceMappingURL=fela-plugin-isolation.js.map