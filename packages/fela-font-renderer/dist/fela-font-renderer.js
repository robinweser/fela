(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('hyphenate-style-name')) :
  typeof define === 'function' && define.amd ? define(['hyphenate-style-name'], factory) :
  (global.FelaFontRenderer = factory(global.hyphenateStyleName));
}(this, function (hyphenateStyleName) { 'use strict';

  hyphenateStyleName = 'default' in hyphenateStyleName ? hyphenateStyleName['default'] : hyphenateStyleName;

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

  function generateCSSDeclaration(property, value) {
    return hyphenateStyleName(property) + ':' + value;
  }

  /*  weak */
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
    return '@media ' + mediaQuery + '{' + mediaQueryRules + '}';
  }

  /*  weak */
  function generateAnimationName(id) {
    return 'k' + id;
  }

  /*  weak */
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function generateClassName(id) {
    var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (id <= 52) {
      return chars[id - 1] + className;
    }

    // Bitwise floor as safari performs much faster https://jsperf.com/math-floor-vs-math-round-vs-parseint/55
    return generateClassName(id / 52 | 0, chars[id % 52] + className);
  }

  /*  weak */
  function generateCombinedMediaQuery(currentMediaQuery, nestedMediaQuery) {
    if (currentMediaQuery.length === 0) {
      return nestedMediaQuery;
    }
    return currentMediaQuery + ' and ' + nestedMediaQuery;
  }

  /*  weak */
  function generateCSSRule(selector, cssDeclaration) {
    return selector + '{' + cssDeclaration + '}';
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

  /*  weak */
  function processStyleWithPlugins(style, plugins, type) {
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

    var processedStaticStyle = processStyleWithPlugins(staticStyle, plugins, STATIC_TYPE);
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
  function isAttributeSelector(property) {
    return property.charAt(0) === '[';
  }

  /*  weak */
  function isPseudoSelector(property) {
    return property.charAt(0) === ':';
  }

  /*  weak */
  function isMediaQuery(property) {
    return property.substr(0, 6) === '@media';
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

        var processedStyle = processStyleWithPlugins(rule(props), renderer.plugins, RULE_TYPE);
        return renderer._renderStyleToClassNames(processedStyle).slice(1);
      },
      _renderStyleToClassNames: function _renderStyleToClassNames(style) {
        var pseudo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var media = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        var classNames = '';

        for (var property in style) {
          var value = style[property];
          if (value instanceof Object) {
            if (isPseudoSelector(property) || isAttributeSelector(property)) {
              classNames += renderer._renderStyleToClassNames(value, pseudo + property, media);
            } else if (isMediaQuery(property)) {
              var combinedMediaQuery = generateCombinedMediaQuery(media, property.slice(6).trim());
              classNames += renderer._renderStyleToClassNames(value, pseudo, combinedMediaQuery);
            } else {
              // TODO: warning
            }
          } else {
            var delcarationReference = media + pseudo + property + value;
            if (!renderer.cache[delcarationReference]) {
              var className = generateClassName(++renderer.uniqueRuleIdentifier);

              renderer.cache[delcarationReference] = className;

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

            classNames += ' ' + renderer.cache[delcarationReference];
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

          var processedKeyframe = processStyleWithPlugins(resolvedKeyframe, renderer.plugins, KEYFRAME_TYPE);
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
        return {
          unsubscribe: function unsubscribe() {
            return renderer.listeners.splice(renderer.listeners.indexOf(callback), 1);
          }
        };
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

    // warns if the DOM node either is not a valid <style> element thus the styles do not get applied as Expected
    // or if the node already got the data-fela-stylesheet attribute applied suggesting it is already used by another Renderer
    warning$1(mountNode.nodeName === 'STYLE', 'You are using a node other than `<style>`. Your styles might not get applied correctly.');
    warning$1(!mountNode.hasAttribute('data-fela-stylesheet'), 'This node is already used by another renderer. Rendering might overwrite other styles.');

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

  var fontRenderer = (function (mountNode) {
    return function (renderer) {
      return addFontRenderer(renderer, mountNode);
    };
  });

  return fontRenderer;

}));
//# sourceMappingURL=fela-font-renderer.js.map