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

  function objectReduce(object, iterator, initialValue) {
    for (var key in object) {
      initialValue = iterator(initialValue, object[key], key);
    }

    return initialValue;
  }

  var StyleSheet = {
    create: function create(styleSheet) {
      return objectReduce(styleSheet, function (ruleSheet, rule, ruleName) {
        if (typeof rule === 'function') {
          ruleSheet[ruleName] = rule;
        } else {
          ruleSheet[ruleName] = function () {
            return rule;
          };
        }

        return ruleSheet;
      }, {});
    }
  };

  function mapValueToMediaQuery() {
    var queryValueMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var mapper = arguments[1];

    return objectReduce(queryValueMap, function (style, value, query) {
      if (typeof mapper === 'string') {
        style[query] = babelHelpers.defineProperty({}, mapper, value);
      } else {
        style[query] = mapper(value);
      }

      return style;
    }, {});
  }

  var index = {
    StyleSheet: StyleSheet,
    mapValueToMediaQuery: mapValueToMediaQuery
  };

  return index;

}));
//# sourceMappingURL=fela-tools.js.map