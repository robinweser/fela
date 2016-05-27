(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginFallbackValue = factory());
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

  /**
   * converts camel cased to dash cased properties
   *
   * @param {string} property - camel cased CSS property
   * @returns {string} dash cased CSS property
   */
  function camelToDashCase(property) {
    return property.replace(/([a-z]|^)([A-Z])/g, function (match, p1, p2) {
      return p1 + '-' + p2.toLowerCase();
    }).replace('ms-', '-ms-');
  }

  function fallbackValue() {
    return function (pluginInterface) {
      var styles = pluginInterface.styles;
      var processStyles = pluginInterface.processStyles;


      Object.keys(styles).forEach(function (property) {
        var value = styles[property];
        if (Array.isArray(value)) {
          styles[property] = value.join(';' + camelToDashCase(property) + ':');
        } else if (value instanceof Object) {
          styles[property] = processStyles(babelHelpers.extends({}, pluginInterface, {
            styles: value
          }));
        }
      });

      return styles;
    };
  }

  return fallbackValue;

}));
//# sourceMappingURL=fela-plugin-fallback-value.js.map