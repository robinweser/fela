(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginExtend = factory());
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

  function assign(base) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return args.reduce(function (extend, obj) {
      for (var property in obj) {
        var value = obj[property];
        if (extend[property] instanceof Object && value instanceof Object) {
          extend[property] = assign({}, extend[property], value);
        } else {
          extend[property] = value;
        }
      }
      return extend;
    }, base);
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
    Object.keys(style).forEach(function (property) {
      var value = style[property];
      if (property === 'extend') {
        // arrayify to loop each extension to support arrays and single extends
        [].concat(value).forEach(function (extension) {
          return extendStyle(style, extension);
        });
        delete style[property];
      } else if (value instanceof Object && !Array.isArray(value)) {
        // support nested extend as well
        style[property] = extend(value);
      }
    });

    return style;
  }

  var extend$1 = (function () {
    return extend;
  });

  return extend$1;

}));
//# sourceMappingURL=fela-plugin-extend.js.map