(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPerf = factory());
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
  var counter = 0;

  /**
   * adds a performance profiler to renderRule calls
   *
   * @param {Object} renderer - renderer which gets enhanced
   * @return {Object} enhanced renderer
   */
  function addPerfTool(renderer) {
    var existingRenderRule = renderer.renderRule.bind(renderer);

    renderer.renderRule = function (rule, props) {
      var timerCounter = '[' + ++counter + ']';

      console.time(timerCounter); // eslint-disable-line
      var className = existingRenderRule(rule, props);
      console.log(timerCounter + ' ' + (rule.name || 'anonym'), props); // eslint-disable-line
      console.timeEnd(timerCounter); // eslint-disable-line

      return className;
    };

    return renderer;
  }

  var perf = (function () {
    return function (renderer) {
      return addPerfTool(renderer);
    };
  });

  return perf;

}));
//# sourceMappingURL=fela-perf.js.map