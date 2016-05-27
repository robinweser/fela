(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaDOMServer = factory());
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


  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

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
       * @param {Selector|Function} selector - Selector which gets rendered
       * @param {Object?} props - properties used to render
       * @param {Function[]?} plugins - array of plugins to process styles
       * @return {string} className to reference the rendered selector
       */

    }, {
      key: '_renderSelectorVariation',
      value: function _renderSelectorVariation(selector) {
        var _this3 = this;

        var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var plugins = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

        var isFunctionalSelector = selector instanceof Function;
        var isMediaSelector = !isFunctionalSelector && selector.renderMedia instanceof Function;

        // rendering a Selector for the first time
        // will create cache entries and an ID reference
        if (!this.cache.has(selector)) {
          this.ids.set(selector, ++this._counter);
          this.cache.set(selector, new Map());

          // iterate all used media strings to create
          // selector caches for each media as well
          if (isMediaSelector) {
            selector.mediaStrings.forEach(function (media) {
              if (!_this3.mediaCache.has(media)) {
                _this3.mediaCache.set(media, new Map());
              }
              _this3.mediaCache.get(media).set(selector, new Map());
            });
          }
        }

        var cachedSelector = this.cache.get(selector);
        var propsReference = this._generatePropsReference(props);

        // uses the reference ID and the props to generate an unique className
        var className = this._renderClassName(this.ids.get(selector), propsReference);

        // only if the cached selector has not already been rendered
        // with a specific set of properties it actually renders
        if (!cachedSelector.has(propsReference)) {
          (function () {
            // get the render method of either class-like selectors
            // or pure functional selectors without a constructor
            var pluginInterface = {
              plugins: plugins,
              processStyles: _this3._processStyles,
              styles: isFunctionalSelector ? selector(props) : selector.render(props),
              className: className,
              props: props
            };

            cachedSelector.set(propsReference, _this3._processStyles(pluginInterface));

            if (isMediaSelector) {
              selector.mediaStrings.forEach(function (media) {
                pluginInterface.styles = selector.renderMedia(props, media);
                pluginInterface.media = media;

                var processedStyles = _this3._processStyles(pluginInterface);
                _this3.mediaCache.get(media).get(selector).set(propsReference, processedStyles);
              });
            }

            // emit changes as the styles stack changed
            _this3._emitChange();
          })();
        }

        return className;
      }

      /**
       * executes each plugin using a predefined plugin interface
       *
       * @param {Object} pluginInterface - interface containing relevant processing data
       * @return {Object} processed and validated styles
       */

    }, {
      key: '_processStyles',
      value: function _processStyles(pluginInterface) {
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
    }, {
      key: '_splitPseudoClasses',
      value: function _splitPseudoClasses(styles) {
        var _this4 = this;

        var pseudo = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
        var out = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        Object.keys(styles).forEach(function (property) {
          var value = styles[property];
          if (value instanceof Object) {
            _this4._splitPseudoClasses(value, pseudo + property, out);
          } else {
            if (!out[pseudo]) {
              out[pseudo] = {};
            }
            out[pseudo][property] = value;
          }
        });

        return out;
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
        var _this5 = this;

        var css = '';

        cache.forEach(function (variation, selector) {
          var id = _this5.ids.get(selector);

          variation.forEach(function (styles, propsReference) {
            var className = _this5._renderClassName(id, propsReference);
            var splitPseudos = _this5._splitPseudoClasses(styles);

            Object.keys(splitPseudos).forEach(function (pseudo) {
              css += _this5._renderSelector(className + pseudo, splitPseudos[pseudo]);
            });
          });
        });

        return css;
      }
    }]);
    return StyleSheet;
  }();

  var Renderer = function () {
    function Renderer() {
      babelHelpers.classCallCheck(this, Renderer);

      this.stylesheet = new StyleSheet();
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
    }, {
      key: 'renderToString',
      value: function renderToString() {
        return this.stylesheet.renderToString();
      }
      /**
       * clears the stylesheet
       */

    }, {
      key: 'clear',
      value: function clear() {
        this.stylesheet.clear();
      }
    }]);
    return Renderer;
  }();

  var felaDOMServer = { Renderer: Renderer };

  return felaDOMServer;

}));
//# sourceMappingURL=fela-dom-server.js.map