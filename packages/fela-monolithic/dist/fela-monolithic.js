(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('hyphenate-style-name')) :
  typeof define === 'function' && define.amd ? define(['hyphenate-style-name'], factory) :
  (global.FelaMonolithic = factory(global.hyphenateStyleName));
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

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers;

  /*  weak */
  function cssifyMediaQueryRules(mediaQuery, mediaQueryRules) {
    if (mediaQueryRules) {
      return '@media ' + mediaQuery + '{' + mediaQueryRules + '}';
    }

    return '';
  }

  /*  weak */
  function generateCombinedMediaQuery(currentMediaQuery, nestedMediaQuery) {
    if (currentMediaQuery.length === 0) {
      return nestedMediaQuery;
    }
    return currentMediaQuery + " and " + nestedMediaQuery;
  }

  function generateCSSDeclaration(property, value) {
    return hyphenateStyleName(property) + ':' + value;
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
  var RULE_TYPE = 1;

  function generateClassName(str, prefix) {
    var val = 5381;
    var i = str.length;

    while (i) {
      val = val * 33 ^ str.charCodeAt(--i);
    }

    return prefix + (val >>> 0).toString(36);
  }

  function addMonolithicClassNames(renderer) {
    renderer._parseMonolithicRules = function (selector, styles) {
      var mediaSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var decs = [];
      var rules = [];
      var media = [];

      var _loop = function _loop(key) {
        var value = styles[key];
        var type = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);

        if (isUndefinedValue(value)) {
          return 'continue';
        } else if (type === 'number' || type === 'string') {
          decs.push(generateCSSDeclaration(key, value));
          return 'continue';
        } else if (Array.isArray(value)) {
          value.forEach(function (val) {
            return decs.push(generateCSSDeclaration(key, val));
          });
          return 'continue';
        } else if (isNestedSelector(key)) {
          renderer._parseMonolithicRules(selector + normalizeNestedProperty(key), value, mediaSelector).rules.forEach(function (r) {
            return rules.push(r);
          });
          return 'continue';
        } else if (isMediaQuery(key)) {
          var mediaKey = generateCombinedMediaQuery(mediaSelector, key.slice(6).trim());
          var mediaRules = renderer._parseMonolithicRules(selector, value, mediaKey);
          media.push({
            rules: mediaRules.rules,
            media: mediaKey
          });
          mediaRules.media.forEach(function (r) {
            return media.push(r);
          });
          return 'continue';
        } else {
          renderer._parseMonolithicRules(selector + ' ' + key, value, mediaSelector).rules.forEach(function (r) {
            return rules.push(r);
          });
          return 'continue';
        }
      };

      for (var key in styles) {
        var _ret = _loop(key);

        if (_ret === 'continue') continue;
      }

      rules.unshift(generateCSSRule(selector, decs.join(';')));

      return {
        rules: rules,
        media: media
      };
    };

    renderer._renderStyleToClassNames = function (style) {
      if (!Object.keys(style).length) {
        return '';
      }
      var className = generateClassName(JSON.stringify(style), renderer.selectorPrefix || 'fela-');
      var selector = getCSSSelector(className);

      if (renderer.cache[className]) return ' ' + className;

      var _renderer$_parseMonol = renderer._parseMonolithicRules(selector, style),
          rules = _renderer$_parseMonol.rules,
          media = _renderer$_parseMonol.media;

      var cssRules = rules.join('');

      if (!renderer.cache[className]) {
        renderer.cache[className] = '';
      }

      if (rules.length) {
        renderer.rules += cssRules;
        renderer.cache[className] += cssRules;

        renderer._emitChange({
          selector: selector,
          declaration: cssRules,
          type: RULE_TYPE
        });
      }
      if (media.length) {
        media.forEach(function (r) {
          var mediaKey = r.media;
          var mediaRules = r.rules.join('');
          if (!renderer.mediaRules.hasOwnProperty(mediaKey)) {
            renderer.mediaRules[mediaKey] = '';
          }
          renderer.mediaRules[mediaKey] += mediaRules;
          renderer.cache[className] += cssifyMediaQueryRules(mediaKey, mediaRules);

          renderer._emitChange({
            selector: selector,
            declaration: mediaRules,
            media: mediaKey,
            type: RULE_TYPE
          });
        });
      }

      return ' ' + className;
    };

    return renderer;
  }

  var monolithic = (function () {
    return function (renderer) {
      return addMonolithicClassNames(renderer);
    };
  });

  return monolithic;

}));
//# sourceMappingURL=fela-monolithic.js.map