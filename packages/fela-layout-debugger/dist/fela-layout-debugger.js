(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaLayoutDebugger = factory());
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
  function addLayoutDebugger(renderer, options) {
    var existingRenderRule = renderer.renderRule.bind(renderer);

    renderer.renderRule = function (rule, props) {
      var className = existingRenderRule(rule, props);

      var ruleName = rule.name || 'debug_layout';
      var color = (ruleName + ruleName).length * 17 * ruleName.length;

      var debugLayoutClassName = 'fela-debug-layout_' + ruleName;

      if (options.backgroundColor) {
        renderer.renderStatic({
          backgroundColor: 'hsla(' + color + ', 100%, 25%, 0.1) !important'
        }, '.' + debugLayoutClassName);
      } else {
        renderer.renderStatic({
          outline: options.thickness + 'px solid hsl(' + color + ', 100%, 50%) !important'
        }, '.' + debugLayoutClassName);
      }

      return debugLayoutClassName + ' ' + className;
    };

    return renderer;
  }

  var defaultOptions = { backgroundColor: false, thickness: 1 };
  var layoutDebugger = (function (options) {
    return function (renderer) {
      return addLayoutDebugger(renderer, babelHelpers.extends({}, defaultOptions, options));
    };
  });

  return layoutDebugger;

}));
//# sourceMappingURL=fela-layout-debugger.js.map