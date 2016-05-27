(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Fela = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

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

  var Selector = function () {
    /**
     * Selector is a dynamic style container
     *
     * @param {Function} composer - values to resolve dynamic styles
     */

    function Selector(composer) {
      babelHelpers.classCallCheck(this, Selector);

      this.composer = composer;
    }

    /**
     * resolves the styles with given set of props
     *
     * @param {Object?} props - values to resolve dynamic styles
     * @return {Object} rendered styles
     */


    babelHelpers.createClass(Selector, [{
      key: "render",
      value: function render() {
        var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return this.composer(props);
      }
    }]);
    return Selector;
  }();

  /**
   * Enhances a Renderer to automatically render with a set of plugins
   * @param {FelaRenderer} renderer - renderer that gets enhanced
   * @param {function[]} plugins - array of plugin functions
   * @return enhanced renderer
   */
  function enhanceWithPlugins(renderer, plugins) {
    // cache the initial render function to later refer to
    // it would else get overwritten directly
    var existingRenderFunction = renderer.render.bind(renderer);
    renderer.render = function (selector, props) {
      var additionalPlugins = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

      // concat enhancing plugins with additional plugins to allow multiple
      // enhancing cycles without loosing the ability to render with additional plugins
      return existingRenderFunction(selector, props, plugins.concat(additionalPlugins));
    };

    return renderer;
  }

  var fela = {
    Selector: Selector,
    enhanceWithPlugins: enhanceWithPlugins
  };

  return fela;

}));
//# sourceMappingURL=fela.js.map