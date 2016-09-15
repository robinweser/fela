(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginRemoveUndefined = factory());
}(this, function () { 'use strict';

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

  function isInvalid(value) {
    return value === undefined || typeof value === 'string' && value.indexOf('undefined') > -1;
  }

  function removeUndefined(style) {
    Object.keys(style).forEach(function (property) {
      var value = style[property];
      if (value instanceof Object && !Array.isArray(value)) {
        style[property] = removeUndefined(value);
      } else if (Array.isArray(value)) {
        style[property] = value.filter(function (val) {
          return !isInvalid(val);
        });
      } else {
        if (isInvalid(value)) {
          delete style[property];
        }
      }
    });

    return style;
  }

  var removeUndefined$1 = (function () {
    return removeUndefined;
  });

  return removeUndefined$1;

}));
//# sourceMappingURL=fela-plugin-remove-undefined.js.map