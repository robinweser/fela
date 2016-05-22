(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaDOM = factory());
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

  /**
   * generates a valid CSS string containing styles
   *
   * @param {Object} styles - object containing CSS declarations
   * @returns {string} valid CSS string with dash cased properties
   */
  function cssifyObject(styles) {
    return Object.keys(styles).reduce(function (css, prop) {
      // prevents the semicolon after
      // the last rule declaration
      if (css.length > 0) {
        css += ';';
      }
      css += camelToDashCase(prop) + ':' + styles[prop];
      return css;
    }, '');
  }

  /**
   * generates a hashcode from a string
   * taken from http://stackoverflow.com/a/7616484
   *
   * @param {string} str - str used to generate the unique hash code
   * @return {string} compressed content hash
   */
  function generateHash(str) {
    var hash = 0;
    var iterator = 0;
    var char = void 0;
    var length = str.length;

    // return a `s` for empty strings
    // to symbolize `static`
    if (length === 0) {
      return 's';
    }

    for (; iterator < length; ++iterator) {
      char = str.charCodeAt(iterator);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }

    return hash.toString(36);
  }

  /**
   * stringifies an object without any special character
   * uses a sort version of the obj to get same hash codes
   *
   * @param {Object} obj - obj that gets stringified
   * @return {string} stringyfied sorted object
   */
  function sortedStringify(obj) {
    if (obj === undefined) {
      return '';
    }

    return Object.keys(obj).sort().reduce(function (str, prop) {
      // only concatenate property and value
      // without any special characters
      str += prop + obj[prop];
      return str;
    }, '');
  }

  var StyleSheet = function () {
    /**
     * StyleSheet is a low-level Selector container
     */

    function StyleSheet() {
      babelHelpers.classCallCheck(this, StyleSheet);

      this.listeners = new Set();
      this._init();
    }

    /**
     * clears the sheet's cache but keeps all listeners
     */


    babelHelpers.createClass(StyleSheet, [{
      key: 'clear',
      value: function clear() {
        this._init();
      }

      /**
       * renders all cached selector styles into a single valid CSS string
       * clusters media query styles into groups to reduce output size
       */

    }, {
      key: 'renderToString',
      value: function renderToString() {
        var _this = this;

        var css = this._renderCache(this.cache);

        this.mediaCache.forEach(function (cache, media) {
          css += _this._renderMediaQuery(media, _this._renderCache(cache));
        });

        return css;
      }

      /**
       * Adds a new subscription to get notified on every rerender
       *
       * @param {Function} callback - callback function which will be executed
       * @return {Object} equivalent unsubscribe method
       */

    }, {
      key: 'subscribe',
      value: function subscribe(callback) {
        var _this2 = this;

        this.listeners.add(callback);

        return {
          unsubscribe: function unsubscribe() {
            return _this2.listeners.delete(callback);
          }
        };
      }

      /**
       * calls each listener with the current CSS markup of all caches
       * gets only called if the markup actually changes
       *
       * @param {Function} callback - callback function which will be executed
       * @return {Object} equivalent unsubscribe method
       */

    }, {
      key: '_emitChange',
      value: function _emitChange() {
        var css = this.renderToString();
        this.listeners.forEach(function (listener) {
          return listener(css);
        });
      }

      /**
       * initializes the stylesheet by setting up the caches
       */

    }, {
      key: '_init',
      value: function _init() {
        this.cache = new Map();
        this.mediaCache = new Map();
        this.ids = new Map();
        this._counter = -1;
      }

      /**
       * renders a new selector variation and caches the result
       *
       * @param {Selector} selector - Selector which gets rendered
       * @param {Object?} props - properties used to render
       * @param {Function[]?} plugins - array of plugins to process styles
       * @return {string} className to reference the rendered selector
       */

    }, {
      key: '_renderSelectorVariation',
      value: function _renderSelectorVariation(selector, props, plugins) {
        var _this3 = this;

        // rendering a Selector for the first time
        // will create cache entries and an ID reference
        if (!this.cache.has(selector)) {
          this.ids.set(selector, ++this._counter);
          this.cache.set(selector, new Map());
          // iterate all used media strings to create
          // selector caches for each media as well
          selector.mediaStrings.forEach(function (media) {
            if (!_this3.mediaCache.has(media)) {
              _this3.mediaCache.set(media, new Map());
            }
            _this3.mediaCache.get(media).set(selector, new Map());
          });
        }

        var cachedSelector = this.cache.get(selector);
        var propsReference = this._generatePropsReference(props);

        // only if the cached selector has not already been rendered
        // with a specific set of properties it actually renders
        if (!cachedSelector.has(propsReference)) {
          var _selector$render = selector.render(props, plugins);

          var styles = _selector$render.styles;
          var mediaStyles = _selector$render.mediaStyles;

          // cache the rendered output for future usage

          cachedSelector.set(propsReference, styles);
          mediaStyles.forEach(function (styles, media) {
            _this3.mediaCache.get(media).get(selector).set(propsReference, styles);
          });

          // emit changes as the styles stack changed
          this._emitChange();
        }

        // uses the reference ID and the props to generate an unique className
        return this._renderClassName(this.ids.get(selector), propsReference);
      }

      /**
       * generates an unique reference id by content hashing props
       *
       * @param {Object} props - props that get hashed
       * @return {string} reference - unique props reference
       */

    }, {
      key: '_generatePropsReference',
      value: function _generatePropsReference(props) {
        return generateHash(sortedStringify(props));
      }

      /**
       * generates an unique className using a Selectors reference ID
       * as well as a content hash of the passed props
       *
       * @param {number} id - Selectors reference ID stored within the stylesheet
       * @param {strng} reference - generated props reference
       * @return {string} className - unique className reference
       */

    }, {
      key: '_renderClassName',
      value: function _renderClassName(id, reference) {
        return 'c' + id + '-' + reference;
      }

      /**
       * renders a single ruleset into a CSS string
       *
       * @param {string} className - rendered selector
       * @param {Object} styles - style declarations
       * @return {string} valid selector CSS string
       */

    }, {
      key: '_renderSelector',
      value: function _renderSelector(className, styles) {
        return '.' + className + '{' + cssifyObject(styles) + '}';
      }

      /**
       * renders a set of media styles into a CSS string
       *
       * @param {string} media - media string
       * @param {string} selectors - CSS string of all selectors
       * @return {string} valid media query CSS string
       */

    }, {
      key: '_renderMediaQuery',
      value: function _renderMediaQuery(media, selectors) {
        return '@media(' + media + '){' + selectors + '}';
      }

      /**
       * renders a whole cache into a CSS string
       * clusters media queries into single @media groups
       *
       * @param {Map} cache - cache including styles and media styles
       * @return {string} valid CSS string
       */

    }, {
      key: '_renderCache',
      value: function _renderCache(cache) {
        var _this4 = this;

        var css = '';

        cache.forEach(function (variation, selector) {
          var id = _this4.ids.get(selector);

          variation.forEach(function (styles, propsReference) {
            var className = _this4._renderClassName(id, propsReference);
            css += _this4._renderSelector(className, styles);
          });
        });

        return css;
      }
    }]);
    return StyleSheet;
  }();

  var NODE_TYPE = 1;
  var NODE_NAME = 'STYLE';

  var Renderer = function () {
    function Renderer(node) {
      var _this = this;

      babelHelpers.classCallCheck(this, Renderer);

      // Check if the passed node is a valid element node which allows
      // setting the `textContent` property to update the node's content
      if (node.nodeType !== NODE_TYPE || node.textContent === undefined) {
        console.error('You need to specify a valid element node (nodeType = 1) to render into.'); // eslint-disable-line
        return false;
      }

      // TODO: DEV-MODE
      // In dev-mode we should allow using elements other than <style> as
      // one might want to render the CSS markup into a visible node to be able to
      // validate and observe the styles on runtime
      if (node.nodeName !== NODE_NAME) {
        console.warn('You are using a node other than `<style>`. Your styles might not get applied correctly.'); // eslint-disable-line
      }

      if (node.hasAttribute('data-fela-stylesheet')) {
        console.warn('This node is already used by another renderer. Rendering might overwrite other styles.'); // eslint-disable-line
      }

      node.setAttribute('data-fela-stylesheet', '');
      this.node = node;

      this.stylesheet = new StyleSheet();
      this.stylesheet.subscribe(function (css) {
        return _this.node.textContent = css;
      });
    }
    /**
     * renders a Selector variation of props into a DOM node
     *
     * @param {Selector} selector - Selector instance that is rendered
     * @param {Object?} props - list of props to render
     * @param {Function[]?} plugins - array of plugins to process styles
     * @return {string} className reference of the rendered selector
     */


    babelHelpers.createClass(Renderer, [{
      key: 'render',
      value: function render(selector, props, plugins) {
        // renders the passed selector variation into the stylesheet which
        // adds the variation to the cache and updates the DOM automatically
        // if the variation has already been added it will do nothing but return
        // the cached className to reference the mounted CSS selector
        return this.stylesheet._renderSelectorVariation(selector, props, plugins);
      }

      /**
       * clears the stylesheet associated with a DOM node
       */

    }, {
      key: 'clear',
      value: function clear() {
        this.stylesheet.clear();
        this.node.textContent = '';
      }
    }]);
    return Renderer;
  }();

  var felaDOM = { Renderer: Renderer };

  return felaDOM;

}));
//# sourceMappingURL=fela-dom.js.map