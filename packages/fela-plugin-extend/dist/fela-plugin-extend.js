(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('css-in-js-utils/lib/assignStyle')) :
  typeof define === 'function' && define.amd ? define(['css-in-js-utils/lib/assignStyle'], factory) :
  (global.FelaPluginExtend = factory(global.assignStyle));
}(this, function (assignStyle) { 'use strict';

  assignStyle = 'default' in assignStyle ? assignStyle['default'] : assignStyle;

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

  function isObject(value) {
    return (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && !Array.isArray(value);
  }

  function arrayEach(array, iterator) {
    for (var i = 0, len = array.length; i < len; ++i) {
      iterator(array[i], i);
    }
  }

  function extendStyle(style, extension, extendPlugin) {
    // extend conditional style objects
    if (extension.hasOwnProperty('condition')) {
      if (extension.condition) {
        assignStyle(style, extendPlugin(extension.style));
      }
    } else {
      // extend basic style objects
      assignStyle(style, extension);
    }
  }

  function extend(style) {
    for (var property in style) {
      var value = style[property];

      if (property === 'extend') {
        var extensions = [].concat(value);

        arrayEach(extensions, function (extension) {
          return extendStyle(style, extension, extend);
        });
        delete style[property];
      } else if (isObject(value)) {
        // support nested extend as well
        style[property] = extend(value);
      }
    }

    return style;
  }

  var extend$1 = (function () {
    return extend;
  });

  return extend$1;

}));
//# sourceMappingURL=fela-plugin-extend.js.map