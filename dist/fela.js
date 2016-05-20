(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Fela"] = factory();
	else
		root["Fela"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Selector = __webpack_require__(1);

	var _Selector2 = _interopRequireDefault(_Selector);

	var _DOMRenderer = __webpack_require__(3);

	var _enhanceWithPlugins = __webpack_require__(2);

	var _enhanceWithPlugins2 = _interopRequireDefault(_enhanceWithPlugins);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  Selector: _Selector2.default,

	  render: _DOMRenderer.render,
	  clear: _DOMRenderer.clear,
	  enhanceWithPlugins: _enhanceWithPlugins2.default
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Selector = function () {
	  /**
	   * Selector is a dynamic style container
	   *
	   * @param {Function} composer - values to resolve dynamic styles
	   * @param {Object} mediaCompose - set of additional media composer
	   */

	  function Selector(composer) {
	    var mediaComposer = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Selector);

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


	  _createClass(Selector, [{
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
	        process: this._process,
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

	exports.default = Selector;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = enhanceWithPlugins;
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
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _StyleSheet = __webpack_require__(4);

	var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var NODE_TYPE = 1;
	var NODE_NAME = 'STYLE';

	// initializes a global mapping to map each node
	// to a different stylesheet to prevent collision
	// allows the use of multiple splitted stylesheets
	var nodeMap = new Map();

	exports.default = {
	  /**
	   * renders a Selector variation of props into a DOM node
	   *
	   * @param {node} node - DOM node which gets rendered into
	   * @param {Selector} selector - Selector instance that is rendered
	   * @param {Object?} props - list of props to render
	   * @param {Function[]?} plugins - array of plugins to process styles
	   * @return {string} className reference of the rendered selector
	   */

	  render: function render(node, selector, props, plugins) {
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

	    // references a new stylesheet for new nodes
	    if (!nodeMap.has(node)) {
	      var sheet = new _StyleSheet2.default();
	      sheet.subscribe(function (css) {
	        return node.textContent = css;
	      });
	      nodeMap.set(node, sheet);
	    }

	    var stylesheet = nodeMap.get(node);
	    // renders the passed selector variation into the stylesheet which
	    // adds the variation to the cache and updates the DOM automatically
	    // if the variation has already been added it will do nothing but return
	    // the cached className to reference the mounted CSS selector
	    return stylesheet._renderSelectorVariation(selector, props, plugins);
	  },


	  /**
	   * clears the stylesheet associated with a DOM node
	   * 
	   * @param {node} node - DOM node which gets cleared
	   */
	  clear: function clear(node) {
	    if (!nodeMap.has(node)) {
	      console.error('You are trying to clean a node which has never been rendered to before.'); // eslint-disable-line
	      return false;
	    }

	    nodeMap.get(node).clear();
	    node.textContent = '';
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cssifyObject = __webpack_require__(5);

	var _cssifyObject2 = _interopRequireDefault(_cssifyObject);

	var _generateContentHash = __webpack_require__(6);

	var _generateContentHash2 = _interopRequireDefault(_generateContentHash);

	var _sortedStringify = __webpack_require__(7);

	var _sortedStringify2 = _interopRequireDefault(_sortedStringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StyleSheet = function () {
	  /**
	   * StyleSheet is a low-level Selector container
	   */

	  function StyleSheet() {
	    _classCallCheck(this, StyleSheet);

	    this.listeners = new Set();
	    this._init();
	  }

	  /**
	   * clears the sheet's cache but keeps all listeners 
	   */


	  _createClass(StyleSheet, [{
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
	      return (0, _generateContentHash2.default)((0, _sortedStringify2.default)(props));
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
	      return '.' + className + '{' + (0, _cssifyObject2.default)(styles) + '}';
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

	exports.default = StyleSheet;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = cssifyObject;
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
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = generateHash;
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
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = sortedStringify;
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
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;