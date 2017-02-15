(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginValidator = factory());
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

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers;

  /*  weak */
  var RULE_TYPE = 1;
  var KEYFRAME_TYPE = 2;

  function validateStyleObject(style, logInvalid, deleteInvalid) {
    for (var property in style) {
      var value = style[property];
      if (value instanceof Object && !Array.isArray(value)) {
        if (/^(@media|:|\[|>)/.test(property)) {
          validateStyleObject(value, logInvalid, deleteInvalid);
        } else {
          if (deleteInvalid) {
            delete style[property];
          }
          if (logInvalid) {
            console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid nested property. Only use nested `@media` queries or `:` pseudo classes.\n              Maybe you forgot to add a plugin that resolves `' + property + '`.', {
              // eslint-disable-line
              property: property,
              value: value
            });
          }
        }
      }
    }
  }

  function validator(style, type, options) {
    var logInvalid = options.logInvalid,
        deleteInvalid = options.deleteInvalid;


    if (type === KEYFRAME_TYPE) {
      for (var percentage in style) {
        var percentageValue = parseFloat(percentage);
        var value = style[percentage];
        if (value instanceof Object === false) {
          if (logInvalid) {
            console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid keyframe value. An object was expected.', {
              // eslint-disable-line
              percentage: percentage,
              style: value
            });
          }
          if (deleteInvalid) {
            delete style[percentage];
          }
        } else {
          // check for invalid percentage values, it only allows from, to or 0% - 100%
          if (!percentage.match(/from|to|%/) || percentage.indexOf('%') > -1 && (percentageValue < 0 || percentageValue > 100)) {
            if (logInvalid) {
              console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid keyframe property.\n                Expected either `to`, `from` or a percentage value between 0 and 100.', {
                percentage: percentage,
                style: value
              });
            }
            if (deleteInvalid) {
              delete style[percentage];
            }
          }
        }
      }
    } else if (type === RULE_TYPE) {
      validateStyleObject(style, logInvalid, deleteInvalid);
    }

    return style;
  }

  var defaultOptions = {
    logInvalid: true,
    deleteInvalid: false
  };
  var validator$1 = (function (options) {
    return function (style, props, type) {
      return validator(style, type, babelHelpers.extends({}, defaultOptions, options));
    };
  });

  return validator$1;

}));
//# sourceMappingURL=fela-plugin-validator.js.map