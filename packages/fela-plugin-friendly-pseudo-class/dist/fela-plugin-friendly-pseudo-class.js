(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginFriendlyPseudoClass = factory());
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

  /*  weak */
  var regex = new RegExp('^on([A-Z])');

  function friendlyPseudoClass(style) {
    Object.keys(style).forEach(function (property) {
      var value = style[property];
      if (value instanceof Object && !Array.isArray(value)) {
        var resolvedValue = friendlyPseudoClass(value);

        if (regex.test(property)) {
          var pseudo = property.replace(regex, function (match, p1) {
            return ':' + p1.toLowerCase();
          });

          style[pseudo] = resolvedValue;
          delete style[property];
        } else {
          style[property] = resolvedValue;
        }
      }
    });

    return style;
  }

  var friendlyPseudoClass$1 = (function () {
    return friendlyPseudoClass;
  });

  return friendlyPseudoClass$1;

}));
//# sourceMappingURL=fela-plugin-friendly-pseudo-class.js.map