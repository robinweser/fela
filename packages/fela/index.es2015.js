var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers.toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

babelHelpers;


function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

var index$1 = __commonjs(function (module) {
'use strict';

var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function hyphenateStyleName(string) {
  return string in cache ? cache[string] : cache[string] = string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;
});

var require$$0$2 = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

var hyphenateProperty = __commonjs(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateProperty;

var _hyphenateStyleName = require$$0$2;

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function hyphenateProperty(property) {
  return (0, _hyphenateStyleName2.default)(property);
}
module.exports = exports['default'];
});

var require$$0$1 = (hyphenateProperty && typeof hyphenateProperty === 'object' && 'default' in hyphenateProperty ? hyphenateProperty['default'] : hyphenateProperty);

var cssifyDeclaration = __commonjs(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssifyDeclaration;

var _hyphenateProperty = require$$0$1;

var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function cssifyDeclaration(property, value) {
  return (0, _hyphenateProperty2.default)(property) + ':' + value;
}
module.exports = exports['default'];
});

var require$$0 = (cssifyDeclaration && typeof cssifyDeclaration === 'object' && 'default' in cssifyDeclaration ? cssifyDeclaration['default'] : cssifyDeclaration);

var cssifyObject = __commonjs(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssifyObject;

var _cssifyDeclaration = require$$0;

var _cssifyDeclaration2 = _interopRequireDefault(_cssifyDeclaration);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function cssifyObject(style) {
  var css = '';

  for (var property in style) {
    var value = style[property];
    if (typeof value !== 'string' && typeof value !== 'number') {
      continue;
    }

    // prevents the semicolon after
    // the last rule declaration
    if (css) {
      css += ';';
    }

    css += (0, _cssifyDeclaration2.default)(property, value);
  }

  return css;
}
module.exports = exports['default'];
});

var cssifyObject$1 = (cssifyObject && typeof cssifyObject === 'object' && 'default' in cssifyObject ? cssifyObject['default'] : cssifyObject);

function cssifyFontFace(fontFace) {
  return '@font-face{' + cssifyObject$1(fontFace) + '}';
}

function arrayReduce(array, iterator, initialValue) {
  for (var i = 0, len = array.length; i < len; ++i) {
    initialValue = iterator(initialValue, array[i]);
  }

  return initialValue;
}

function objectReduce(object, iterator, initialValue) {
  for (var key in object) {
    initialValue = iterator(initialValue, object[key], key);
  }

  return initialValue;
}

function cssifyKeyframe(frames, animationName) {
  var prefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [''];

  var keyframe = objectReduce(frames, function (css, frame, percentage) {
    return '' + css + percentage + '{' + cssifyObject$1(frame) + '}';
  }, '');

  return arrayReduce(prefixes, function (cssKeyframe, prefix) {
    return cssKeyframe + '@' + prefix + 'keyframes ' + animationName + '{' + keyframe + '}';
  }, '');
}

function cssifyMediaQueryRules(mediaQuery, mediaQueryRules) {
  if (mediaQueryRules) {
    return '@media ' + mediaQuery + '{' + mediaQueryRules + '}';
  }

  return '';
}

function generateAnimationName(id) {
  return "k" + id;
}

var chars = 'abcdefghijklmnopqrstuvwxyz';
var charLength = chars.length;

function generateClassName(id) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (id <= charLength) {
    return chars[id - 1] + className;
  }

  // Bitwise floor as safari performs much faster https://jsperf.com/math-floor-vs-math-round-vs-parseint/55
  return generateClassName(id / charLength | 0, chars[id % charLength] + className);
}

function generateCombinedMediaQuery(currentMediaQuery, nestedMediaQuery) {
  if (currentMediaQuery.length === 0) {
    return nestedMediaQuery;
  }

  return currentMediaQuery + " and " + nestedMediaQuery;
}

function generateCSSRule(selector, cssDeclaration) {
  return selector + "{" + cssDeclaration + "}";
}

function getCSSSelector(className) {
  var pseudo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return '.' + className + pseudo;
}

function minifyCSSString(style) {
  return style.replace(/\s{2,}/g, '');
}

function processStyleWithPlugins(plugins, style, type) {
  if (plugins.length > 0) {
    return arrayReduce(plugins, function (processedStyle, plugin) {
      processedStyle = plugin(processedStyle, type);
      return processedStyle;
    }, style);
  }

  return style;
}

var RULE_TYPE = 1;
var KEYFRAME_TYPE = 2;
var FONT_TYPE = 3;
var STATIC_TYPE = 4;
var CLEAR_TYPE = 5;

function cssifyStaticStyle(staticStyle, plugins) {
  if (typeof staticStyle === 'string') {
    return minifyCSSString(staticStyle);
  }

  var processedStaticStyle = processStyleWithPlugins(plugins, staticStyle, STATIC_TYPE);
  return cssifyObject$1(processedStaticStyle);
}

function generateStaticReference(style, selector) {
  if (typeof style === 'string') {
    return style;
  }

  if (selector) {
    return selector + JSON.stringify(style);
  }

  return '';
}

function isMediaQuery(property) {
  return property.substr(0, 6) === '@media';
}

var regex = /^(:|\[|>|&)/;

function isNestedSelector(property) {
  return regex.test(property);
}

function isUndefinedValue(value) {
  return value === undefined || typeof value === 'string' && value.indexOf('undefined') !== -1;
}

function isObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && !Array.isArray(value);
}

function normalizeNestedProperty(nestedProperty) {
  if (nestedProperty.charAt(0) === '&') {
    return nestedProperty.slice(1);
  }

  return nestedProperty;
}

function applyMediaRulesInOrder(order) {
  return arrayReduce(order, function (mediaRules, query) {
    mediaRules[query] = '';
    return mediaRules;
  }, {});
}

function toCSSString(value) {
  if (value.charAt(0) === '"') {
    return value;
  }

  return '"' + value + '"';
}

function isBase64(property) {
  return property.indexOf('data:') !== -1;
}

var formats = {
  '.woff': 'woff',
  '.eot': 'eot',
  '.ttf': 'truetype',
  '.svg': 'svg'
};

var base64Formats = {
  'image/svg+xml': 'svg',
  'application/x-font-woff': 'woff',
  'application/font-woff': 'woff',
  'application/x-font-woff2': 'woff2',
  'application/font-woff2': 'woff2',
  'font/woff2': 'woff2',
  'application/octet-stream': 'ttf',
  'application/x-font-ttf': 'ttf',
  'application/x-font-truetype': 'ttf',
  'application/x-font-opentype': 'otf',
  'application/vnd.ms-fontobject': 'eot',
  'application/font-sfnt': 'sfnt'
};

var extensions = Object.keys(formats);
var base64MimeTypes = Object.keys(base64Formats);

function checkFontFormat(src) {
  for (var i = 0, len = extensions.length; i < len; ++i) {
    var extension = extensions[i];
    if (src.indexOf(extension) !== -1) {
      return formats[extension];
    }
  }

  if (isBase64(src)) {
    for (var _i = 0, _len = base64MimeTypes.length; _i < _len; ++_i) {
      var mimeType = base64MimeTypes[_i];
      if (src.indexOf(mimeType) !== -1) {
        return base64Formats[mimeType];
      }
    }

    void 0;
  } else {
    void 0;
  }
  return '';
}

function checkFontUrl(src) {
  if (isBase64(src)) {
    return src;
  }

  return '\'' + src + '\'';
}

function arrayEach(array, iterator) {
  for (var i = 0, len = array.length; i < len; ++i) {
    iterator(array[i], i);
  }
}

function createRenderer() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var renderer = {
    listeners: [],
    keyframePrefixes: config.keyframePrefixes || ['-webkit-', '-moz-'],
    plugins: config.plugins || [],
    mediaQueryOrder: config.mediaQueryOrder || [],
    selectorPrefix: config.selectorPrefix || '',
    fontFaces: '',
    keyframes: '',
    statics: '',
    rules: '',
    // apply media rules in an explicit order to ensure
    // correct media query execution order
    mediaRules: applyMediaRulesInOrder(config.mediaQueryOrder || []),
    uniqueRuleIdentifier: 0,
    uniqueKeyframeIdentifier: 0,
    // use a flat cache object with pure string references
    // to achieve maximal lookup performance and memoization speed
    cache: {},

    renderRule: function renderRule(rule) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var processedStyle = processStyleWithPlugins(renderer.plugins, rule(props), RULE_TYPE);
      return renderer._renderStyleToClassNames(processedStyle).slice(1);
    },
    renderKeyframe: function renderKeyframe(keyframe) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var resolvedKeyframe = keyframe(props);
      var keyframeReference = JSON.stringify(resolvedKeyframe);

      if (!renderer.cache.hasOwnProperty(keyframeReference)) {
        // use another unique identifier to ensure minimal css markup
        var animationName = generateAnimationName(++renderer.uniqueKeyframeIdentifier);

        var processedKeyframe = processStyleWithPlugins(renderer.plugins, resolvedKeyframe, KEYFRAME_TYPE);

        var cssKeyframe = cssifyKeyframe(processedKeyframe, animationName, renderer.keyframePrefixes);

        renderer.cache[keyframeReference] = animationName;
        renderer.keyframes += cssKeyframe;

        renderer._emitChange({
          name: animationName,
          keyframe: cssKeyframe,
          type: KEYFRAME_TYPE
        });
      }

      return renderer.cache[keyframeReference];
    },
    renderFont: function renderFont(family, files) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var fontReference = family + JSON.stringify(properties);

      if (!renderer.cache.hasOwnProperty(fontReference)) {
        var fontFamily = toCSSString(family);

        // TODO: proper font family generation with error proofing
        var fontFace = babelHelpers.extends({}, properties, {
          src: files.map(function (src) {
            return 'url(' + checkFontUrl(src) + ') format(\'' + checkFontFormat(src) + '\')';
          }).join(','),
          fontFamily: fontFamily
        });

        var cssFontFace = cssifyFontFace(fontFace);
        renderer.cache[fontReference] = fontFamily;
        renderer.fontFaces += cssFontFace;

        renderer._emitChange({
          fontFamily: fontFamily,
          fontFace: cssFontFace,
          type: FONT_TYPE
        });
      }

      return renderer.cache[fontReference];
    },
    renderStatic: function renderStatic(staticStyle, selector) {
      var staticReference = generateStaticReference(staticStyle, selector);

      if (!renderer.cache.hasOwnProperty(staticReference)) {
        var cssDeclarations = cssifyStaticStyle(staticStyle, renderer.plugins);
        renderer.cache[staticReference] = '';

        if (typeof staticStyle === 'string') {
          renderer.statics += cssDeclarations;
          renderer._emitChange({
            type: STATIC_TYPE,
            css: cssDeclarations
          });
        } else if (selector) {
          renderer.statics += generateCSSRule(selector, cssDeclarations);
          renderer._emitChange({
            selector: selector,
            declaration: cssDeclarations,
            type: RULE_TYPE,
            static: true,
            media: ''
          });
        }
      }
    },
    renderToString: function renderToString() {
      var basicCSS = renderer.fontFaces + renderer.statics + renderer.keyframes + renderer.rules;

      return objectReduce(renderer.mediaRules, function (css, rules, query) {
        return css + cssifyMediaQueryRules(query, rules);
      }, basicCSS);
    },
    subscribe: function subscribe(callback) {
      renderer.listeners.push(callback);

      return {
        unsubscribe: function unsubscribe() {
          return renderer.listeners.splice(renderer.listeners.indexOf(callback), 1);
        }
      };
    },
    clear: function clear() {
      renderer.fontFaces = '';
      renderer.keyframes = '';
      renderer.statics = '';
      renderer.rules = '';
      renderer.mediaRules = applyMediaRulesInOrder(renderer.mediaQueryOrder);
      renderer.uniqueRuleIdentifier = 0;
      renderer.uniqueKeyframeIdentifier = 0;
      renderer.cache = {};

      renderer._emitChange({ type: CLEAR_TYPE });
    },
    _renderStyleToClassNames: function _renderStyleToClassNames(style) {
      var pseudo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var media = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var classNames = '';

      for (var property in style) {
        var value = style[property];

        if (isObject(value)) {
          if (isNestedSelector(property)) {
            classNames += renderer._renderStyleToClassNames(value, pseudo + normalizeNestedProperty(property), media);
          } else if (isMediaQuery(property)) {
            var combinedMediaQuery = generateCombinedMediaQuery(media, property.slice(6).trim());

            classNames += renderer._renderStyleToClassNames(value, pseudo, combinedMediaQuery);
          } else {
            // TODO: warning
          }
        } else {
          var declarationReference = media + pseudo + property + value;

          if (!renderer.cache.hasOwnProperty(declarationReference)) {
            // we remove undefined values to enable
            // usage of optional props without side-effects
            if (isUndefinedValue(value)) {
              renderer.cache[declarationReference] = '';
              /* eslint-disable no-continue */
              continue;
              /* eslint-enable */
            }

            var className = renderer.selectorPrefix + generateClassName(++renderer.uniqueRuleIdentifier);

            renderer.cache[declarationReference] = className;

            var cssDeclaration = require$$0(property, value);
            var selector = getCSSSelector(className, pseudo);
            var cssRule = generateCSSRule(selector, cssDeclaration);

            if (media.length > 0) {
              if (!renderer.mediaRules.hasOwnProperty(media)) {
                renderer.mediaRules[media] = '';
              }

              renderer.mediaRules[media] += cssRule;
            } else {
              renderer.rules += cssRule;
            }

            renderer._emitChange({
              selector: selector,
              declaration: cssDeclaration,
              media: media,
              type: RULE_TYPE
            });
          }

          classNames += ' ' + renderer.cache[declarationReference];
        }
      }

      return classNames;
    },
    _emitChange: function _emitChange(change) {
      arrayEach(renderer.listeners, function (listener) {
        return listener(change);
      });
    }
  };

  // initial setup
  renderer.keyframePrefixes.push('');
  renderer.clear();

  if (config.enhancers) {
    arrayEach(config.enhancers, function (enhancer) {
      renderer = enhancer(renderer);
    });
  }

  return renderer;
}

var assignStyle = __commonjs(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && babelHelpers.typeof(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : babelHelpers.typeof(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : babelHelpers.typeof(obj);
};

exports.default = assignStyle;

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function assignStyle(base) {
  for (var _len = arguments.length, extendingStyles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    extendingStyles[_key - 1] = arguments[_key];
  }

  for (var i = 0, len = extendingStyles.length; i < len; ++i) {
    var style = extendingStyles[i];

    for (var property in style) {
      var value = style[property];
      var baseValue = base[property];

      if ((typeof baseValue === 'undefined' ? 'undefined' : _typeof(baseValue)) === 'object') {
        if (Array.isArray(baseValue)) {
          if (Array.isArray(value)) {
            base[property] = [].concat(_toConsumableArray(baseValue), _toConsumableArray(value));
          } else {
            base[property] = [].concat(_toConsumableArray(baseValue), [value]);
          }
          continue;
        }

        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !Array.isArray(value)) {
          base[property] = assignStyle({}, baseValue, value);
          continue;
        }
      }

      base[property] = value;
    }
  }

  return base;
}
module.exports = exports['default'];
});

var assignStyle$1 = (assignStyle && typeof assignStyle === 'object' && 'default' in assignStyle ? assignStyle['default'] : assignStyle);

function combineRules() {
  for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
    rules[_key] = arguments[_key];
  }

  return function (props) {
    return arrayReduce(rules, function (style, rule) {
      return assignStyle$1(style, rule(props));
    }, {});
  };
}

function enhance() {
  for (var _len = arguments.length, enhancers = Array(_len), _key = 0; _key < _len; _key++) {
    enhancers[_key] = arguments[_key];
  }

  return function (createRenderer) {
    return function (config) {
      return arrayReduce(enhancers, function (enhancedRenderer, enhancer) {
        enhancedRenderer = enhancer(enhancedRenderer);
        return enhancedRenderer;
      }, createRenderer(config));
    };
  };
}

var index = {
  createRenderer: createRenderer,
  combineRules: combineRules,
  enhance: enhance
};

export default index;