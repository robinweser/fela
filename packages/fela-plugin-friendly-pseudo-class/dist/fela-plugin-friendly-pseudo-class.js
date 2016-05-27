(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginFriendlyPseudoClass = factory());
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

  function friendlyPseudoClass() {
    return function (pluginInterface) {
      var styles = pluginInterface.styles;
      var processStyles = pluginInterface.processStyles;


      Object.keys(styles).forEach(function (property) {
        var value = styles[property];
        if (value instanceof Object && !Array.isArray(value)) {
          var regex = new RegExp('^on([A-Z])');
          if (regex.test(property)) {
            var pseudo = property.replace(regex, function (match, p1) {
              return ':' + p1.toLowerCase();
            });

            styles[pseudo] = processStyles(babelHelpers.extends({}, pluginInterface, {
              styles: value
            }));

            delete styles[property];
          }
        }
      });

      return styles;
    };
  }

  return friendlyPseudoClass;

}));
//# sourceMappingURL=fela-plugin-friendly-pseudo-class.js.map