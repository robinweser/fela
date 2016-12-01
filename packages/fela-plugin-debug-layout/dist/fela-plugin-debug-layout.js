(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginDebugLayout = factory());
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
  function debugLayout(style, meta, options) {
    if (meta.type === 'rule') {
      var ruleName = meta.rule.name || 'foobar';
      var color = (ruleName + ruleName).length * 17 * ruleName.length;

      if (options.backgroundColor) {
        style.backgroundColor = 'hsla(' + color + ', 100%, 25%, 0.1) !important';
      } else {
        style.outline = options.thickness + 'px solid hsl(' + color + ', 100%, 50%) !important';
      }
    }

    return style;
  }

  var defaultOptions = { backgroundColor: false, thickness: 1 };
  var debugLayout$1 = (function (options) {
    return function (style, meta) {
      return debugLayout(style, meta, babelHelpers.extends({}, defaultOptions, options));
    };
  });

  return debugLayout$1;

}));
//# sourceMappingURL=fela-plugin-debug-layout.js.map