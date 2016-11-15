(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaStyleSheet = factory());
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

  var StyleSheet = {
    create: function create(styles) {
      return Object.keys(styles).reduce(function (rules, rule) {
        if (typeof styles[rule] !== 'function') {
          rules[rule] = function () {
            return styles[rule];
          };
        } else {
          rules[rule] = styles[rule];
        }

        return rules;
      }, {});
    }
  };

  return StyleSheet;

}));
//# sourceMappingURL=fela-stylesheet.js.map