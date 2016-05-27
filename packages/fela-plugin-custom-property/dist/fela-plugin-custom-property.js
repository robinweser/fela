(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginCustomProperty = factory());
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

  function customProperty(properties) {
    return function (pluginInterface) {
      var styles = pluginInterface.styles;
      var processStyles = pluginInterface.processStyles;


      Object.keys(styles).forEach(function (property) {
        var value = styles[property];
        if (properties[property]) {
          Object.assign(styles, properties[property](value));
          delete styles[property];
        }

        if (value instanceof Object && !Array.isArray(value)) {
          styles[property] = processStyles(babelHelpers.extends({}, pluginInterface, {
            styles: value
          }));
        }
      });

      return styles;
    };
  }

  return customProperty;

}));
//# sourceMappingURL=fela-plugin-custom-property.js.map