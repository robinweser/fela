(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaServer = factory());
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
      return '';
    }

    for (; iterator < length; ++iterator) {
      char = str.charCodeAt(iterator);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }

    return '-' + hash.toString(36);
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
     * StyleSheet is a low-level container to cache Selectors
     * Keyframes and FontFaces which optimizes styles
     */

    function StyleSheet() {
      var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      babelHelpers.classCallCheck(this, StyleSheet);

      this.listeners = new Set();
      this.keyframePrefixes = config.keyframePrefixes || ['-webkit-', '-moz-', ''];
      this.plugins = config.plugins || [];
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

        var css = '';

        this.fontFaces.forEach(function (fontFace) {
          return css += fontFace;
        });
        this.keyframes.forEach(function (variation) {
          variation.forEach(function (markup) {
            return css += markup;
          });
        });

        css += this._renderCache(this.cache);
        this.mediaCache.forEach(function (cache, media) {
          css += '@media(' + media + '){' + _this._renderCache(cache) + '}';
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
        this.fontFaces = new Set();
        this.keyframes = new Map();
        this.ids = new Map();
        this._counter = -1;
      }

      /**
       * renders a new font-face and caches it
       *
       * @param {FontFace} fontFace - fontFace which gets rendered
       * @return {string} fontFamily reference
       */

    }, {
      key: '_renderFontFace',
      value: function _renderFontFace(fontFace) {
        if (!this.fontFaces.has(fontFace)) {
          var renderedFontFace = '@font-face {' + cssifyObject(fontFace.render()) + '}';
          this.fontFaces.add(renderedFontFace);
          this._emitChange();
        }

        return fontFace.fontFamily;
      }

      /**
       * renders a new keyframe variation and caches the result
       *
       * @param {Keyframe} keyframe - Keyframe which gets rendered
       * @param {Object?} props - properties used to render
       * @param {Function[]?} plugins - array of plugins to process styles
       * @return {string} animationName to reference the rendered keyframe
       */

    }, {
      key: '_renderKeyframeVariation',
      value: function _renderKeyframeVariation(keyframe) {
        var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var plugins = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

        // rendering a Keyframe for the first time
        // will create cache entries and an ID reference
        if (!this.keyframes.has(keyframe)) {
          this.keyframes.set(keyframe, new Map());
          this.ids.set(keyframe, ++this._counter);
        }

        var cachedKeyframe = this.keyframes.get(keyframe);
        var propsReference = this._generatePropsReference(props);
        var animationName = 'k' + this.ids.get(keyframe) + propsReference;

        // only if the cached selector has not already been rendered
        // with a specific set of properties it actually renders
        if (!cachedKeyframe.has(propsReference)) {
          var pluginInterface = {
            plugins: this.plugins.concat(plugins),
            processStyles: this._processStyles,
            styles: keyframe.render(props),
            props: props
          };

          var processedKeyframe = this._processStyles(pluginInterface);
          cachedKeyframe.set(propsReference, this._renderKeyframe(processedKeyframe, animationName));
          this._emitChange();
        }

        return animationName;
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
          // directly render the static base styles to be able
          // to diff future dynamic styles with those
          this._renderSelectorVariation(selector, {}, plugins);
        }

        var cachedSelector = this.cache.get(selector);
        var propsReference = this._generatePropsReference(props);
        // uses the reference ID and the props to generate an unique className
        var className = 'c' + this.ids.get(selector) + propsReference;

        // only if the cached selector has not already been rendered
        // with a specific set of properties it actually renders
        if (!cachedSelector.has(propsReference)) {
          (function () {
            // get the render method of either class-like selectors
            // or pure functional selectors without a constructor
            var pluginInterface = {
              plugins: _this3.plugins.concat(plugins),
              processStyles: _this3._processStyles,
              styles: isFunctionalSelector ? selector(props) : selector.render(props),
              props: props
            };

            var preparedStyles = _this3._prepareStyles(pluginInterface, cachedSelector.get('static'), propsReference);
            cachedSelector.set(propsReference, _this3._renderStyles(preparedStyles, className));

            // keep static styles to diff dynamic onces later on
            if (propsReference === '') {
              cachedSelector.set('static', preparedStyles);
            }

            if (isMediaSelector) {
              selector.mediaStrings.forEach(function (media) {
                var cachedMediaSelector = _this3.mediaCache.get(media).get(selector);

                var mediaPluginInterface = babelHelpers.extends({}, pluginInterface, {
                  styles: selector.renderMedia(props, media),
                  media: media
                });

                var preparedMediaStyles = _this3._prepareStyles(mediaPluginInterface, cachedMediaSelector.get('static'), propsReference);
                cachedMediaSelector.set(propsReference, _this3._renderStyles(preparedMediaStyles, className));

                // keep static styles to diff dynamic onces later on
                if (propsReference === '') {
                  cachedMediaSelector.set('static', preparedMediaStyles);
                }
              });
            }
            // emit changes as the styles stack changed
            _this3._emitChange();
          })();
        }

        // returns either the base className or both the base and the dynamic part
        var baseClassName = 'c' + this.ids.get(selector);
        return className !== baseClassName ? baseClassName + ' ' + className : className;
      }

      /**
       * executes each plugin using a predefined plugin interface
       *
       * @param {Object} pluginInterface - interface containing relevant processing data
       * @return {Object} processed styles
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
          return styles = plugin(pluginInterface);
        });
        return styles;
      }

      /**
       * extracts all dynamic styles by diffing with the static base styles
       *
       * @param {Object} styles - dynamic styles
       * @param {Object} base - static base styles to diff
       * @return {Object} encapsulated dynamic styles
       */

    }, {
      key: '_extractDynamicStyles',
      value: function _extractDynamicStyles(styles, base) {
        var _this4 = this;

        Object.keys(styles).forEach(function (property) {
          var value = styles[property];
          if (value instanceof Object && !Array.isArray(value)) {
            styles[property] = _this4._extractDynamicStyles(styles[property], base[property]);
            if (Object.keys(styles[property]).length === 0) {
              delete styles[property];
            }
          } else if (base.hasOwnProperty(property) && base[property !== value]) {
            delete styles[property];
          }
        });

        return styles;
      }

      /**
       * removes every invalid property except pseudo class objects
       *
       * @param {Object} styles - styles to be validated
       * @return {Object} validated styles
       */

    }, {
      key: '_validateStyles',
      value: function _validateStyles(styles) {
        var _this5 = this;

        Object.keys(styles).forEach(function (property) {
          var value = styles[property];
          if (value instanceof Object && !Array.isArray(value)) {
            styles[property] = property.charAt(0) === ':' ? _this5._validateStyles(value) : {};
            if (Object.keys(styles[property]).length === 0) {
              delete styles[property];
            }
          } else if (typeof value !== 'string' && typeof value !== 'number') {
            delete styles[property];
          }
        });

        return styles;
      }

      /**
       * flattens nested pseudo classes
       * removes all invalid properties that are not either a string or a number
       *
       * @param {Object} styles - dynamic styles
       * @return {Object} flat and validated styles
       */

    }, {
      key: '_splitPseudoClasses',
      value: function _splitPseudoClasses(styles) {
        var _this6 = this;

        var pseudo = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
        var out = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        Object.keys(styles).forEach(function (property) {
          var value = styles[property];
          if (value instanceof Object && !Array.isArray(value)) {
            _this6._splitPseudoClasses(value, pseudo + property, out);
          } else {
            if (!out[pseudo]) {
              out[pseudo] = {};
            }
            // add properties to pseudo maps
            out[pseudo][property] = value;
          }
        });

        return out;
      }

      /**
       *  processes, flattens, normalizes and diffs styles
       *
       * @param {Object} pluginInterface - plugin interface to process styles
       * @param {Object} baseStyles - static base styles
       * @return {Object} processed styles
       */

    }, {
      key: '_prepareStyles',
      value: function _prepareStyles(pluginInterface, baseStyles, propsReference) {
        var processedStyles = this._processStyles(pluginInterface);
        var validatedStyles = this._validateStyles(processedStyles);

        // only diff and extract dynamic styles
        // if not actually rendering the base styles
        if (propsReference !== '') {
          return this._extractDynamicStyles(validatedStyles, baseStyles);
        }

        return validatedStyles;
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
       * renders styles into a CSS string
       *
       * @param {Object} styles - prepared styles with pseudo keys
       * @param {string} className - className reference to render
       * @return {string} valid CSS string
       */

    }, {
      key: '_renderStyles',
      value: function _renderStyles(styles, className) {
        var splitStyles = this._splitPseudoClasses(styles);

        return Object.keys(splitStyles).reduce(function (css, pseudo) {
          return css + '.' + className + pseudo + '{' + cssifyObject(splitStyles[pseudo]) + '}';
        }, '');
      }

      /**
       * renders keyframes into a CSS string with all prefixes
       *
       * @param {Object} frames - validated frame declarations
       * @param {string} animationName - animation reference naming
       * @return {string} valid CSS string
       */

    }, {
      key: '_renderKeyframe',
      value: function _renderKeyframe(frames, animationName) {
        var _this7 = this;

        var keyframe = Object.keys(frames).reduce(function (css, percentage) {
          return css + percentage + '{' + cssifyObject(_this7._validateStyles(frames[percentage])) + '}';
        }, '');

        return this.keyframePrefixes.reduce(function (css, prefix) {
          return css + '@' + prefix + 'keyframes ' + animationName + '{' + keyframe + '}';
        }, '');
      }

      /**
       * renders a whole cache into a single CSS string
       *
       * @param {Map} cache - cache including all selector variations
       * @return {string} valid CSS string
       */

    }, {
      key: '_renderCache',
      value: function _renderCache(cache) {
        var css = '';

        cache.forEach(function (variation) {
          variation.forEach(function (markup, propsReference) {
            if (propsReference !== 'static') {
              css += markup;
            }
          });
        });

        return css;
      }
    }]);
    return StyleSheet;
  }();

  var formats = {
    '.woff': 'woff',
    '.eof': 'eof',
    '.ttf': 'truetype',
    '.svg': 'svg'
  };

  // Returns the font format for a specific font source
  function getFontFormat(src) {
    return Object.keys(formats).reduce(function (format, extension) {
      if (src.indexOf(extension) > -1) {
        format = formats[extension];
      }
      return format; // eslint-disable-line
    }, undefined);
  }

  var FontFace = function () {
    function FontFace(family, files) {
      var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
      babelHelpers.classCallCheck(this, FontFace);

      this.family = family;
      this.files = files;
      this.properties = properties;
    }

    babelHelpers.createClass(FontFace, [{
      key: 'render',
      value: function render() {
        var _this = this;

        var font = {
          fontFamily: '\'' + this.family + '\'',
          src: this.files.map(function (src) {
            return 'url(\'' + src + '\') format(\'' + getFontFormat(src) + '\')';
          }).join(',')
        };

        var fontProperties = ['fontWeight', 'fontStretch', 'fontStyle', 'unicodeRange'];
        Object.keys(this.properties).filter(function (prop) {
          return fontProperties.indexOf(prop) > -1;
        }).forEach(function (fontProp) {
          return font[fontProp] = _this.properties[fontProp];
        });

        return font;
      }
    }]);
    return FontFace;
  }();

  var Keyframe = function () {
    /**
     * Keyframe is a dynamic keyframe animation container
     *
     * @param {Function} keyframeComposer - composer function
     */

    function Keyframe(keyframeComposer) {
      babelHelpers.classCallCheck(this, Keyframe);

      this.keyframeComposer = keyframeComposer;
    }

    /**
     * resolves the styles with given set of props
     *
     * @param {Object?} props - values to resolve dynamic styles
     * @return {Object} rendered styles
     */


    babelHelpers.createClass(Keyframe, [{
      key: "render",
      value: function render() {
        var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return this.keyframeComposer(props);
      }
    }]);
    return Keyframe;
  }();

  var Renderer = function () {
    function Renderer(config) {
      babelHelpers.classCallCheck(this, Renderer);

      this.stylesheet = new StyleSheet(config);
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
        if (selector instanceof FontFace) {
          return this.stylesheet._renderFontFace(selector);
        }

        if (selector instanceof Keyframe) {
          return this.stylesheet._renderKeyframeVariation(selector, props, plugins);
        }

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

  var felaServer = { Renderer: Renderer };

  return felaServer;

}));
//# sourceMappingURL=fela-server.js.map