(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Fela = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};

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

  babelHelpers;

  var Selector = function () {
    /**
     * Selector is a dynamic style container
     *
     * @param {Function} composer - values to resolve dynamic styles
     * @param {Object} mediaCompose - set of additional media composer
     */

    function Selector(composer) {
      var mediaComposer = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      babelHelpers.classCallCheck(this, Selector);

      this.composer = composer;
      this.mediaComposer = mediaComposer;
      // safe media strings to iterate later on
      this.mediaStrings = Object.keys(mediaComposer);
    }

    /**
     * renders the styles with given set of props
     * and pipes those styles through a set of plugins
     *
     * @param {Object?} props - values to resolve dynamic styles
     * @param {Function[]?} plugins - array of plugins to process styles
     * @return {Object} rendered selector including classNames, styles and media styles
     */


    babelHelpers.createClass(Selector, [{
      key: "render",
      value: function render() {
        var _this = this;

        var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var plugins = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        // renders styles by resolving and processing them
        var styles = this._resolve(props, plugins);
        var mediaStyles = this.mediaStrings.reduce(function (output, media) {
          output.set(media, _this._resolve(props, plugins, media));
          return output;
        }, new Map());

        return { mediaStyles: mediaStyles, styles: styles };
      }

      /**
       * executes each plugin using a predefined plugin interface
       *
       * @param {Object} pluginInterface - interface containing relevant processing data
       * @return {Object} processed and validated styles
       */

    }, {
      key: "_process",
      value: function _process(pluginInterface) {
        var plugins = pluginInterface.plugins;
        var styles = pluginInterface.styles;

        // pipes each plugin by passes the plugin interface
        // NOTE: as the styles are passed directly they're editable
        // therefore the plugin order might matter

        plugins.forEach(function (plugin) {
          return plugin(pluginInterface);
        });

        return styles;
      }

      /**
       * resolves and processes styles
       *
       * @param {Object} props - values to resolve dynamic styles
       * @param {Function[]} plugins - array of plugins to process styles
       * @param {string?} media - media string referencing media styles
       * @return {Object} processed and resolved styles
       */

    }, {
      key: "_resolve",
      value: function _resolve(props, plugins, media) {
        var composer = this._getComposer(media);
        var styles = composer(props);

        var pluginInterface = {
          plugins: plugins,
          processStyles: this._process,
          styles: styles,
          media: media,
          props: props
        };

        return this._process(pluginInterface);
      }

      /**
       * evaluates the expected composer for style resolving
       *
       * @param {string?} media - media string referencing a media composer
       * @return {Function} expected style composer
       */

    }, {
      key: "_getComposer",
      value: function _getComposer(media) {
        // if a composer with the given media
        // string exists use it
        if (this.mediaComposer[media]) {
          return this.mediaComposer[media];
        }
        // use the basic composer by default
        return this.composer;
      }
    }]);
    return Selector;
  }();

  /**
   * Enhances a Selector to automatically render with a set of plugins
   * @param {Selector} selector - selector that gets enhanced
   * @param {function[]} plugins - array of plugin functions
   * @return enhanced selector
   */
  function enhanceWithPlugins(selector, plugins) {
    // cache the initial render function to later refer to
    // it would else get overwritten directly
    var existingRenderFunction = selector.render.bind(selector);
    selector.render = function (props) {
      var additionalPlugins = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      // concat enhancing plugins with additional plugins to allow multiple
      // enhancing cycles without loosing the ability to render with additional plugins
      return existingRenderFunction(props, plugins.concat(additionalPlugins));
    };

    return selector;
  }

  var fela = {
    Selector: Selector,
    enhanceWithPlugins: enhanceWithPlugins
  };

  return fela;

}));
//# sourceMappingURL=fela.js.map