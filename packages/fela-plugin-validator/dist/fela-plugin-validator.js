(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginValidator = factory());
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

  function validator(style, options) {
    var logInvalid = options.logInvalid;
    var deleteInvalid = options.deleteInvalid;


    Object.keys(style).forEach(function (property) {
      var value = style[property];
      if (value === undefined || typeof value === 'string' && value.indexOf('undefined') > -1) {
        if (deleteInvalid) {
          delete style[property];
        }
        if (logInvalid) {
          console.log((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid Property', { // eslint-disable-line
            property: property,
            value: value
          });
        }
      } else if (value instanceof Object && !Array.isArray(value)) {
        style[property] = validator(value, options);
      }
    });

    return style;
  }

  var defaultOptions = { logInvalid: true, deleteInvalid: false };
  var validator$1 = (function (options) {
    return function (style) {
      return validator(style, babelHelpers.extends({}, defaultOptions, options));
    };
  });

  return validator$1;

}));
//# sourceMappingURL=fela-plugin-validator.js.map