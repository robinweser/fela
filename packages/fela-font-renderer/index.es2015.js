import cssifyDeclaration from 'css-in-js-utils/lib/cssifyDeclaration';
import cssifyObject from 'css-in-js-utils/lib/cssifyObject';

var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

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

babelHelpers;

function cssifyFontFace(fontFace) {
  return '@font-face{' + cssifyObject(fontFace) + '}';
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
    return '' + css + percentage + '{' + cssifyObject(frame) + '}';
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
  return cssifyObject(processedStaticStyle);
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

            var cssDeclaration = cssifyDeclaration(property, value);
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

function createDOMInterface(renderer, node) {
  return function (change) {
    // only use insertRule in production as browser devtools might have
    // weird behavior if used together with insertRule at runtime
    if (true && change.type === RULE_TYPE && !change.media) {
      try {
        node.sheet.insertRule(change.selector + '{' + change.declaration + '}', node.sheet.cssRules.length);
      } catch (error) {
        // TODO: MAYBE WARN IN DEV MODE
      }
    } else {
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
  void 0;

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

function addFontRenderer(renderer, mountNode) {
  renderer.fontRenderer = createRenderer();

  // mount font styles into the mountNode
  if (mountNode) {
    render(renderer.fontRenderer, mountNode);
  }

  renderer.renderFont = function (family, files, properties) {
    return renderer.fontRenderer.renderFont(family, files, properties);
  };

  return renderer;
}

function fontRenderer(mountNode) {
  return function (renderer) {
    return addFontRenderer(renderer, mountNode);
  };
}

export default fontRenderer;