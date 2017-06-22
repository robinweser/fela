'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createRenderer;

var _cssifyDeclaration = require('css-in-js-utils/lib/cssifyDeclaration');

var _cssifyDeclaration2 = _interopRequireDefault(_cssifyDeclaration);

var _felaUtils = require('fela-utils');

var _felaTools = require('fela-tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    mediaRules: (0, _felaUtils.applyMediaRulesInOrder)(config.mediaQueryOrder || []),
    uniqueRuleIdentifier: 0,
    uniqueKeyframeIdentifier: 0,
    // use a flat cache object with pure string references
    // to achieve maximal lookup performance and memoization speed
    cache: {},
    styleNodes: {},

    renderRule: function renderRule(rule) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var processedStyle = (0, _felaUtils.processStyleWithPlugins)(renderer, rule(props), _felaUtils.RULE_TYPE, props);
      return renderer._renderStyleToClassNames(processedStyle).slice(1);
    },
    renderKeyframe: function renderKeyframe(keyframe) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var resolvedKeyframe = keyframe(props);
      var keyframeReference = JSON.stringify(resolvedKeyframe);

      if (!renderer.cache.hasOwnProperty(keyframeReference)) {
        // use another unique identifier to ensure minimal css markup
        var animationName = (0, _felaUtils.generateAnimationName)(++renderer.uniqueKeyframeIdentifier);

        var processedKeyframe = (0, _felaUtils.processStyleWithPlugins)(renderer, resolvedKeyframe, _felaUtils.KEYFRAME_TYPE, props);

        var cssKeyframe = (0, _felaUtils.cssifyKeyframe)(processedKeyframe, animationName, renderer.keyframePrefixes);

        renderer.cache[keyframeReference] = animationName;
        renderer.keyframes += cssKeyframe;

        renderer._emitChange({
          name: animationName,
          keyframe: cssKeyframe,
          type: _felaUtils.KEYFRAME_TYPE
        });
      }

      return renderer.cache[keyframeReference];
    },
    renderFont: function renderFont(family, files) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var fontReference = family + JSON.stringify(properties);

      if (!renderer.cache.hasOwnProperty(fontReference)) {
        var fontFamily = (0, _felaUtils.toCSSString)(family);

        // TODO: proper font family generation with error proofing
        var fontFace = _extends({}, properties, {
          src: files.map(function (src) {
            return 'url(' + (0, _felaUtils.checkFontUrl)(src) + ') format(\'' + (0, _felaUtils.checkFontFormat)(src) + '\')';
          }).join(','),
          fontFamily: fontFamily
        });

        var cssFontFace = (0, _felaUtils.cssifyFontFace)(fontFace);
        renderer.cache[fontReference] = fontFamily;
        renderer.fontFaces += cssFontFace;

        renderer._emitChange({
          fontFamily: fontFamily,
          fontFace: cssFontFace,
          type: _felaUtils.FONT_TYPE
        });
      }

      return renderer.cache[fontReference];
    },
    renderStatic: function renderStatic(staticStyle, selector) {
      var staticReference = (0, _felaUtils.generateStaticReference)(staticStyle, selector);

      if (!renderer.cache.hasOwnProperty(staticReference)) {
        var cssDeclarations = (0, _felaUtils.cssifyStaticStyle)(staticStyle, renderer);
        renderer.cache[staticReference] = '';

        if (typeof staticStyle === 'string') {
          renderer.statics += cssDeclarations;

          renderer._emitChange({
            type: _felaUtils.STATIC_TYPE,
            css: cssDeclarations
          });
        } else if (selector) {
          renderer.statics += (0, _felaUtils.generateCSSRule)(selector, cssDeclarations);
        }

        renderer._emitChange({
          type: _felaUtils.STATIC_TYPE,
          css: cssDeclarations
        });
      }
    },
    renderToString: function renderToString() {
      return (0, _felaTools.renderToString)(renderer);
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
      renderer.mediaRules = (0, _felaUtils.applyMediaRulesInOrder)(renderer.mediaQueryOrder);
      renderer.uniqueRuleIdentifier = 0;
      renderer.uniqueKeyframeIdentifier = 0;
      renderer.cache = {};

      renderer._emitChange({ type: _felaUtils.CLEAR_TYPE });
    },
    _renderStyleToClassNames: function _renderStyleToClassNames(style) {
      var pseudo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var media = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var classNames = '';

      for (var property in style) {
        var value = style[property];

        if ((0, _felaUtils.isObject)(value)) {
          if ((0, _felaUtils.isNestedSelector)(property)) {
            classNames += renderer._renderStyleToClassNames(value, pseudo + (0, _felaUtils.normalizeNestedProperty)(property), media);
          } else if ((0, _felaUtils.isMediaQuery)(property)) {
            var combinedMediaQuery = (0, _felaUtils.generateCombinedMediaQuery)(media, property.slice(6).trim());

            classNames += renderer._renderStyleToClassNames(value, pseudo, combinedMediaQuery);
          } else {
            // TODO: warning
          }
        } else {
          var declarationReference = media + pseudo + property + value;

          if (!renderer.cache.hasOwnProperty(declarationReference)) {
            // we remove undefined values to enable
            // usage of optional props without side-effects
            if ((0, _felaUtils.isUndefinedValue)(value)) {
              renderer.cache[declarationReference] = '';
              /* eslint-disable no-continue */
              continue;
              /* eslint-enable */
            }

            var className = renderer.selectorPrefix + (0, _felaUtils.generateClassName)(++renderer.uniqueRuleIdentifier);

            renderer.cache[declarationReference] = className;

            var cssDeclaration = (0, _cssifyDeclaration2.default)(property, value);
            var selector = (0, _felaUtils.generateCSSSelector)(className, pseudo);
            var cssRule = (0, _felaUtils.generateCSSRule)(selector, cssDeclaration);

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
              type: _felaUtils.RULE_TYPE
            });
          }

          classNames += ' ' + renderer.cache[declarationReference];
        }
      }

      return classNames;
    },
    _emitChange: function _emitChange(change) {
      (0, _felaUtils.arrayEach)(renderer.listeners, function (listener) {
        return listener(change);
      });
    }
  };

  // initial setup
  renderer.keyframePrefixes.push('');
  renderer.clear();

  if (config.enhancers) {
    (0, _felaUtils.arrayEach)(config.enhancers, function (enhancer) {
      renderer = enhancer(renderer);
    });
  }

  return renderer;
}