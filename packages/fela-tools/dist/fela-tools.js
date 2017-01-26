(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaTools = factory());
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

  var StyleSheet = {
    create: function create(styles) {
      var rules = {};

      var _loop = function _loop(rule) {
        if (typeof styles[rule] !== 'function') {
          rules[rule] = function () {
            return styles[rule];
          };
        } else {
          rules[rule] = styles[rule];
        }
      };

      for (var rule in styles) {
        _loop(rule);
      }

      return rules;
    }
  };

  function mapValueToMediaQuery() {
    var queryValueMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var mapper = arguments[1];

    var style = {};

    for (var query in queryValueMap) {
      style[query] = mapper(queryValueMap[query]);
    }

    return style;
  }

  var index = {
    StyleSheet: StyleSheet,
    mapValueToMediaQuery: mapValueToMediaQuery
  };

  return index;

}));
//# sourceMappingURL=fela-tools.js.map