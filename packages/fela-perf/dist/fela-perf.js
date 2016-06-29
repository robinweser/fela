(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPerf = factory());
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

  var counter = 0;

  var perf = (function () {
    return function (renderer) {
      var existingRenderRule = renderer.renderRule.bind(renderer);

      renderer.renderRule = function (rule, props) {
        var timerCounter = ++counter;

        console.time('[' + timerCounter + '] Elapsed time'); // eslint-disable-line
        var className = existingRenderRule(rule, props);
        console.timeEnd('[' + timerCounter + '] Elapsed time'); // eslint-disable-line

        return className;
      };

      return renderer;
    };
  });

  return perf;

}));
//# sourceMappingURL=fela-perf.js.map