(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginExtend = factory());
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
  function assign(base) {
    for (var _len = arguments.length, extendingStyles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      extendingStyles[_key - 1] = arguments[_key];
    }

    for (var i = 0, len = extendingStyles.length; i < len; ++i) {
      var style = extendingStyles[i];

      for (var property in style) {
        var value = style[property];

        if (base[property] instanceof Object && value instanceof Object) {
          base[property] = assign({}, base[property], value);
        } else {
          base[property] = value;
        }
      }
    }

    return base;
  }

  function extendStyle(style, extension) {
    // extend conditional style objects
    if (extension.hasOwnProperty('condition')) {
      if (extension.condition) {
        assign(style, extend(extension.style));
      }
    } else {
      // extend basic style objects
      assign(style, extension);
    }
  }

  function extend(style) {
    for (var property in style) {
      var value = style[property];
      if (property === 'extend') {
        // arrayify to loop each extension to support arrays and single extends
        var extensions = [].concat(value);
        for (var i = 0, len = extensions.length; i < len; ++i) {
          extendStyle(style, extensions[i]);
        }
        delete style[property];
      } else if (value instanceof Object && !Array.isArray(value)) {
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