(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Fela = factory());
}(this, function () { 'use strict';

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

  var hyphenateStyleName = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

  function generateCSSDeclaration(property, value) {
    return hyphenateStyleName(property) + ':' + value;
  }

  /*  weak */
  /* eslint-disable import/no-mutable-exports */
  var warning = function warning() {
    return true;
  };

  if (true) {
    warning = function warning(condition, message) {
      if (!condition) {
        if (typeof console !== 'undefined') {
          console.error(message); // eslint-disable-line
        }
      }
    };
  }

  var warning$1 = warning;

  function cssifyObject(style) {
    var css = '';

    for (var property in style) {
      warning$1(typeof style[property] === 'string' || typeof style[property] === 'number', 'The invalid value `' + style[property] + '` has been used as `' + property + '`.');

      // prevents the semicolon after
      // the last rule declaration
      if (css) {
        css += ';';
      }

      css += generateCSSDeclaration(property, style[property]);
    }

    return css;
  }

  function cssifyFontFace(fontFace) {
    return '@font-face{' + cssifyObject(fontFace) + '}';
  }

  function cssifyKeyframe(frames, animationName) {
    var prefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [''];

    var keyframe = Object.keys(frames).reduce(function (css, percentage) {
      return css + percentage + '{' + cssifyObject(frames[percentage]) + '}';
    }, '');

    return prefixes.reduce(function (css, prefix) {
      return css + '@' + prefix + 'keyframes ' + animationName + '{' + keyframe + '}';
    }, '');
  }

  /*  weak */
  function cssifyMediaQueryRules(mediaQuery, mediaQueryRules) {
    if (mediaQueryRules) {
      return '@media ' + mediaQuery + '{' + mediaQueryRules + '}';
    }

    return '';
  }

  /*  weak */
  function generateAnimationName(id) {
    return "k" + id;
  }

  /*  weak */
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

  /*  weak */
  function generateCombinedMediaQuery(currentMediaQuery, nestedMediaQuery) {
    if (currentMediaQuery.length === 0) {
      return nestedMediaQuery;
    }
    return currentMediaQuery + " and " + nestedMediaQuery;
  }

  /*  weak */
  function generateCSSRule(selector, cssDeclaration) {
    return selector + "{" + cssDeclaration + "}";
  }

  /*  weak */
  function getCSSSelector(className) {
    var pseudo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return '.' + className + pseudo;
  }

  /*  weak */
  function minifyCSSString(style) {
    return style.replace(/\s{2,}/g, '');
  }

  function processStyleWithPlugins(plugins, style, type) {
    for (var i = 0; i < plugins.length; ++i) {
      style = plugins[i](style, type);
    }

    return style;
  }

  /*  weak */
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
    return cssifyObject(processedStaticStyle);
  }

  /*  weak */
  function generateStaticReference(style, selector) {
    if (typeof style === 'string') {
      return style;
    }

    return selector + JSON.stringify(style);
  }

  /*  weak */
  function isMediaQuery(property) {
    return property.substr(0, 6) === '@media';
  }

  /*  weak */
  function isNestedSelector(property) {
    return property.match(/^(:|\[|>|&)/g) !== null;
  }

  function isUndefinedValue(value) {
    return value === undefined || typeof value === 'string' && value.indexOf('undefined') > -1;
  }

  /*  weak */
  function normalizeNestedProperty(nestedProperty) {
    if (nestedProperty.charAt(0) === '&') {
      return nestedProperty.slice(1);
    }

    return nestedProperty;
  }

  /*  weak */
  function applyMediaRulesInOrder(order) {
    var mediaRules = {};

    for (var i = 0, len = order.length; i < len; ++i) {
      mediaRules[order[i]] = '';
    }

    return mediaRules;
  }

  /*  weak */
  function toCSSString(value) {
    if (value.charAt(0) === '"') {
      return value;
    }
    return '"' + value + '"';
  }

  /*  weak */
  var formats = {
    '.woff': 'woff',
    '.eot': 'eot',
    '.ttf': 'truetype',
    '.svg': 'svg'
  };

  var extensions = Object.keys(formats);

  function checkFontFormat(src) {
    for (var i = 0, len = extensions.length; i < len; ++i) {
      var extension = extensions[i];
      if (src.indexOf(extension) !== -1) {
        return formats[extension];
      }
    }
    // TODO: warning: wrong font format
    return undefined;
  }

  function createRenderer() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var renderer = {
      listeners: [],
      keyframePrefixes: config.keyframePrefixes || ['-webkit-', '-moz-'],
      plugins: config.plugins || [],
      // prettySelectors is currently useless, might reimplement better DX classNames later
      // prettySelectors: config.prettySelectors && process.env.NODE_ENV !== 'production',
      mediaQueryOrder: config.mediaQueryOrder || [],
      selectorPrefix: config.selectorPrefix || '',
      clear: function clear() {
        renderer.fontFaces = '';
        renderer.keyframes = '';
        renderer.statics = '';
        renderer.rules = '';
        // apply media rules in an explicit order to ensure
        // correct media query execution order
        renderer.mediaRules = applyMediaRulesInOrder(renderer.mediaQueryOrder);
        renderer.rendered = [];
        renderer.uniqueRuleIdentifier = 0;
        renderer.uniqueKeyframeIdentifier = 0;
        // use a flat cache object with pure string references
        // to achieve maximal lookup performance and memoization speed
        renderer.cache = {};

        // initial change emit to enforce a clear start
        renderer._emitChange({ type: CLEAR_TYPE });
      },
      renderRule: function renderRule(rule) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var processedStyle = processStyleWithPlugins(renderer.plugins, rule(props), RULE_TYPE);
        return renderer._renderStyleToClassNames(processedStyle).slice(1);
      },
      _renderStyleToClassNames: function _renderStyleToClassNames(style) {
        var pseudo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var media = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        var classNames = '';

        for (var property in style) {
          var value = style[property];
          if (value instanceof Object) {
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
            if (!renderer.cache[declarationReference]) {
              // we remove undefined values to enable
              // usage of optional props without side-effects
              if (isUndefinedValue(value)) {
                renderer.cache[declarationReference] = '';
                continue;
              }

              var className = renderer.selectorPrefix + generateClassName(++renderer.uniqueRuleIdentifier);

              renderer.cache[declarationReference] = className;

              var cssDeclaration = generateCSSDeclaration(property, value);
              var selector = getCSSSelector(className, pseudo);
              var cssRule = generateCSSRule(selector, cssDeclaration);

              if (media) {
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
      renderKeyframe: function renderKeyframe(keyframe) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var resolvedKeyframe = keyframe(props);
        var keyframeReference = JSON.stringify(resolvedKeyframe);

        if (!renderer.cache[keyframeReference]) {
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

        if (!renderer.cache[fontReference]) {
          var fontFamily = toCSSString(family);

          // TODO: proper font family generation with error proofing
          var fontFace = babelHelpers.extends({}, properties, {
            src: files.map(function (src) {
              return 'url(\'' + src + '\') format(\'' + checkFontFormat(src) + '\')';
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

        if (!renderer.cache[staticReference]) {
          var cssDeclarations = cssifyStaticStyle(staticStyle, renderer.plugins);
          renderer.cache[staticReference] = true;

          if (typeof staticStyle === 'string') {
            renderer.statics += cssDeclarations;
            renderer._emitChange({
              type: STATIC_TYPE,
              css: cssDeclarations
            });
          } else {
            renderer.statics += generateCSSRule(selector, cssDeclarations);
            renderer._emitChange({
              selector: selector,
              declaration: cssDeclarations,
              type: RULE_TYPE,
              media: ''
            });
          }
        }
      },
      renderToString: function renderToString() {
        var css = renderer.fontFaces + renderer.statics + renderer.keyframes + renderer.rules;

        for (var media in renderer.mediaRules) {
          css += cssifyMediaQueryRules(media, renderer.mediaRules[media]);
        }

        return css;
      },
      subscribe: function subscribe(callback) {
        renderer.listeners.push(callback);
        return { unsubscribe: function unsubscribe() {
            return renderer.listeners.splice(renderer.listeners.indexOf(callback), 1);
          } };
      },
      _emitChange: function _emitChange(change) {
        for (var i = 0, len = renderer.listeners.length; i < len; ++i) {
          renderer.listeners[i](change);
        }
      }
    };

    // initial setup
    renderer.keyframePrefixes.push('');
    renderer.clear();

    if (config.enhancers) {
      for (var i = 0, len = config.enhancers.length; i < len; ++i) {
        renderer = config.enhancers[i](renderer);
      }
    }

    return renderer;
  }

  /*  weak */
  function assign(base) {
    for (var _len = arguments.length, extendingStyles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      extendingStyles[_key - 1] = arguments[_key];
    }

    for (var i = 0, len = extendingStyles.length; i < len; ++i) {
      var style = extendingStyles[i];

      for (var property in style) {
        var value = style[property];

        if (base[property] instanceof Object && value instanceof Object) {
          base[property] = assign({}, base[property], value);
        } else {
          base[property] = value;
        }
      }
    }

    return base;
  }

  function combineRules() {
    for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
      rules[_key] = arguments[_key];
    }

    return function (props) {
      var style = {};

      for (var i = 0, len = rules.length; i < len; ++i) {
        assign(style, rules[i](props));
      }

      return style;
    };
  }

  /*  weak */
  function enhance() {
    for (var _len = arguments.length, enhancers = Array(_len), _key = 0; _key < _len; _key++) {
      enhancers[_key] = arguments[_key];
    }

    return function (createRenderer) {
      return function (config) {
        var renderer = createRenderer(config);

        for (var i = 0, len = enhancers.length; i < len; ++i) {
          renderer = enhancers[i](renderer);
        }

        return renderer;
      };
    };
  }

  function createDOMInterface(renderer, node) {
    return function (change) {
      // only use insertRule in production as browser devtools might have
      // weird behavior if used together with insertRule at runtime
      if (false && change.type === RULE_TYPE && !change.media) {} else {
        node.textContent = renderer.renderToString();
      }
    };
  }

  function isValidHTMLElement(mountNode) {
    return mountNode && mountNode.nodeType === 1;
  }

  function render(renderer, mountNode) {
    // mountNode must be a valid HTML element to be able
    // to set mountNode.textContent later on
    if (!isValidHTMLElement(mountNode)) {
      throw new Error('You need to specify a valid element node (nodeType = 1) to render into.');
    }

    // warns if the DOM node either is not a valid <style> element
    // thus the styles do not get applied as Expected
    // or if the node already got the data-fela-stylesheet attribute applied
    // suggesting it is already used by another Renderer
    warning$1(mountNode.nodeName === 'STYLE', 'You are using a node other than `<style>`. Your styles might not get applied correctly.');

    // mark and clean the DOM node to prevent side-effects
    mountNode.setAttribute('data-fela-stylesheet', '');

    var updateNode = createDOMInterface(renderer, mountNode);
    renderer.subscribe(updateNode);

    var css = renderer.renderToString();

    if (mountNode.textContent !== css) {
      // render currently rendered styles to the DOM once
      mountNode.textContent = css;
    }
  }

  function deprecatedRender(renderer, mountNode) {
    console.warn('Importing `render` from `fela` is deprecated. Use `fela-dom` to import `render` instead.');
    // eslint-disable-line
    return render(renderer, mountNode);
  }

  var index = {
    createRenderer: createRenderer,
    combineRules: combineRules,
    enhance: enhance,
    render: deprecatedRender
  };

  return index;

}));
//# sourceMappingURL=fela.js.map