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

  /*  weak */
  /**
   * generates a hashcode from a string
   * taken from http://stackoverflow.com/a/7616484
   *
   * @param {string} str - str used to generate the unique hash code
   * @return {string} compressed content hash
   */
  function generateContentHash(str) {
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
   * generates an unique reference hash
   *
   * @param {Object} style - style that get hashed
   * @return {string} hash - unique style hash
   */
  var generateStyleHash = (function (style) {
    return generateContentHash(JSON.stringify(style));
  });

  /*  weak */
  var formats = {
    '.woff': 'woff',
    '.eot': 'eot',
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

  /*  weak */
  /**
   * pipes a style object through a list of plugins
   *
   * @param {Object} style - style object to process
   * @param {Object} meta - additional meta data
   * @param {Function[]} plugins - plugins used to process style
   * @return {Object} processed style
   */
  function processStyle(style, meta, plugins) {
    return plugins.reduce(function (processedStyle, plugin) {
      return plugin(processedStyle, meta);
    }, style);
  }

  /**
   * diffs a style object against a base style object
   *
   * @param {Object} style - style object which is diffed
   * @param {Object?} base - base style object
   */
  function diffStyle(style) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Object.keys(style).reduce(function (diff, property) {
      var value = style[property];
      // recursive object iteration in order to render
      // pseudo class and media class declarations
      if (value instanceof Object && !Array.isArray(value)) {
        var nestedDiff = diffStyle(value, base[property]);
        if (Object.keys(nestedDiff).length > 0) {
          diff[property] = nestedDiff;
        }
      } else {
        // diff styles with the base styles to only extract dynamic styles
        if (value !== undefined && base[property] !== value) {
          // remove concatenated string values including `undefined`
          if (typeof value === 'string' && value.indexOf('undefined') > -1) {
            return diff;
          }
          diff[property] = value;
        }
      }
      return diff;
    }, {});
  }

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

  var hypenateStyleName = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

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

  /**
   * generates a valid CSS string containing style
   *
   * @param {Object} style - object containing CSS declarations
   * @returns {string} valid CSS string with dash cased properties
   */
  function cssifyObject(style) {
    return Object.keys(style).reduce(function (css, prop) {
      // warn if invalid values are rendered
      warning$1(typeof style[prop] === 'string' || typeof style[prop] === 'number', 'The invalid value `' + style[prop] + '` has been used as `' + prop + '`.');

      // prevents the semicolon after
      // the last rule declaration
      if (css.length > 0) {
        css += ';';
      }

      css += hypenateStyleName(prop) + ':' + style[prop];
      return css;
    }, '');
  }

  /**
   * renders keyframes into a CSS string with all prefixes
   *
   * @param {Object} frames - validated frame declarations
   * @param {string} animationName - animation reference naming
   * @param {string[]} prefixes - list of used vendor prefixes
   * @return {string} valid CSS string
   */
  function cssifyKeyframe(frames, animationName) {
    var prefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [''];

    var keyframe = Object.keys(frames).reduce(function (css, percentage) {
      return css + percentage + '{' + cssifyObject(frames[percentage]) + '}';
    }, '');

    return prefixes.reduce(function (css, prefix) {
      return css + '@' + prefix + 'keyframes ' + animationName + '{' + keyframe + '}';
    }, '');
  }

  /**
   * creates a new renderer instance
   *
   * @param {Object} config - renderer configuration
   * @return {Object} new renderer instance
   */
  function createRenderer() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // the renderer is the key
    var renderer = {
      listeners: [],
      keyframePrefixes: config.keyframePrefixes || ['-webkit-', '-moz-'],
      plugins: config.plugins || [],

      // try and use readable selectors when
      // prettySelectors is on and not in a prod environment
      prettySelectors: config.prettySelectors && true,
      mediaQueryOrder: config.mediaQueryOrder || [],

      /**
       * clears the sheet's cache but keeps all listeners
       */
      clear: function clear() {
        renderer.fontFaces = '';
        renderer.keyframes = '';
        renderer.statics = '';
        renderer.rules = '';
        renderer.mediaRules = renderer.mediaQueryOrder.reduce(function (rules, media) {
          rules[media] = '';
          return rules;
        }, {});

        renderer.rendered = {};
        renderer.base = [];
        renderer.ids = [];
        renderer.baseClassName = {};
        renderer.callStack = [];

        // emit changes to notify subscribers
        renderer._emitChange({ type: 'clear' });
      },


      /**
       * renders a new rule variation and caches the result
       *
       * @param {Function} rule - rule which gets rendered
       * @param {Object?} props - properties used to render
       * @param {Object?} defaultProps - properties used to render the static style
       * @return {string} className to reference the rendered rule
       */
      renderRule: function renderRule(rule) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var defaultProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        // rendering a rule for the first time
        // will create an ID reference
        if (renderer.ids.indexOf(rule) === -1) {
          renderer.ids.push(rule);

          // directly render the static base style to be able
          // to diff future dynamic style with those
          try {
            renderer.renderRule(rule, defaultProps, defaultProps);
          } catch (error) {
            warning$1(false, 'Nested props have been used without passing \'defaultProps\'. This will disable static style splitting for \'' + (rule.name ? rule.name : 'unkown_rule') + '\'.');
          }
        }

        var ruleProps = babelHelpers.extends({}, defaultProps, props);

        var style = rule(ruleProps);
        var styleId = renderer._generateStyleId(style);

        var className = 'c' + styleId;

        // extend the className with prefixes in development
        // this enables better debugging and className readability
        if (true) {
          className = (renderer._selectorPrefix ? renderer._selectorPrefix + '__' : '') + (renderer.prettySelectors && rule.name ? rule.name + '__' : '') + className;
        }

        // only if the rule has not already been rendered
        // with a specific set of properties it actually renders
        if (!renderer.rendered.hasOwnProperty(className)) {
          // process style using each plugin
          var processedStyle = processStyle(style, {
            type: 'rule',
            className: className,
            props: ruleProps,
            rule: rule
          }, renderer.plugins);

          var ruleId = renderer.ids.indexOf(rule);

          // diff style objects with base styles
          var diffedStyle = diffStyle(processedStyle, renderer.base[ruleId]);
          renderer.rendered[className] = false;

          if (Object.keys(diffedStyle).length > 0) {
            renderer._renderStyle(className, diffedStyle);
          }

          renderer.callStack.push(renderer.renderRule.bind(renderer, rule, props, defaultProps));

          // keep static style to diff dynamic onces later on
          if (props === defaultProps) {
            renderer.base[ruleId] = diffedStyle;
            renderer.baseClassName[ruleId] = className;
            return renderer.rendered[className] ? className : '';
          } else {
            renderer.baseClassName[styleId] = renderer.baseClassName[ruleId];
          }
        }

        var baseClassName = renderer.baseClassName[styleId];

        // if current className is empty
        // return either the static class or empty string
        if (!renderer.rendered[className]) {
          return renderer.rendered[baseClassName] ? baseClassName : '';
        }

        // if the current className is a dynamic rule
        // return both classNames if static subset is not empty
        if (className !== baseClassName) {
          return (renderer.rendered[baseClassName] ? baseClassName + ' ' : '') + className;
        }

        return className;
      },


      /**
       * renders a new keyframe variation and caches the result
       *
       * @param {Keyframe} keyframe - Keyframe which gets rendered
       * @param {Object?} props - properties used to render
       * @return {string} animationName to reference the rendered keyframe
       */
      renderKeyframe: function renderKeyframe(keyframe) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var style = keyframe(props);
        var styleId = renderer._generateStyleId(style);

        var animationName = 'k' + styleId;

        // extend the animationName with prefixes in development
        // this enables better debugging and className readability
        if (true) {
          animationName = (renderer.prettySelectors && keyframe.name ? keyframe.name + '__' : '') + animationName;
        }

        // only if the keyframe has not already been rendered
        // with a specific set of properties it actually renders
        if (!renderer.rendered.hasOwnProperty(animationName)) {
          var processedKeyframe = processStyle(style, {
            type: 'keyframe',
            keyframe: keyframe,
            props: props,
            animationName: animationName
          }, renderer.plugins);

          var css = cssifyKeyframe(processedKeyframe, animationName, renderer.keyframePrefixes);
          renderer.rendered[animationName] = true;
          renderer.keyframes += css;

          renderer.callStack.push(renderer.renderKeyframe.bind(renderer, keyframe, props));
          renderer._emitChange({
            name: animationName,
            style: processedKeyframe,
            css: css,
            type: 'keyframe'
          });
        }

        return animationName;
      },


      /**
       * renders a new font-face and caches it
       *
       * @param {FontFace} fontFace - fontFace which gets rendered
       * @return {string} fontFamily reference
       */
      renderFont: function renderFont(family, files) {
        var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var key = family + generateStyleHash(properties);

        if (!renderer.rendered.hasOwnProperty(key)) {
          (function () {
            var fontFace = {
              fontFamily: '\'' + family + '\'',
              src: files.map(function (src) {
                return 'url(\'' + src + '\') format(\'' + getFontFormat(src) + '\')';
              }).join(',')
            };

            var fontProperties = ['fontVariant', 'fontWeight', 'fontStretch', 'fontStyle', 'unicodeRange'];
            Object.keys(properties).filter(function (prop) {
              return fontProperties.indexOf(prop) > -1;
            }).forEach(function (fontProp) {
              return fontFace[fontProp] = properties[fontProp];
            });

            var css = '@font-face{' + cssifyObject(fontFace) + '}';

            renderer.rendered[key] = true;
            renderer.fontFaces += css;

            renderer.callStack.push(renderer.renderFont.bind(renderer, family, files, properties));

            renderer._emitChange({
              fontFamily: family,
              fontFace: fontFace,
              css: css,
              type: 'font'
            });
          })();
        }

        return family;
      },


      /**
       * renders static style and caches them
       *
       * @param {string|Object} style - static style to be rendered
       * @param {string?} selector - selector used to render the styles
       * @return {string} rendered CSS output
       */
      renderStatic: function renderStatic(style, selector) {
        var reference = typeof style === 'string' ? style : selector + JSON.stringify(style);

        if (!renderer.rendered.hasOwnProperty(reference)) {
          if (typeof style === 'string') {
            var css = style.replace(/\s{2,}/g, '');
            // remove new lines from template strings
            renderer.statics += css;
            renderer._emitChange({
              selector: selector,
              type: 'static',
              css: css
            });
          } else {
            var processedStyle = processStyle(style, {
              selector: selector,
              type: 'static'
            }, renderer.plugins);

            var _css = cssifyObject(processedStyle);
            renderer.statics += selector + '{' + _css + '}';

            renderer.callStack.push(renderer.renderStatic.bind(renderer, style, selector));

            renderer._emitChange({
              selector: selector,
              style: processedStyle,
              css: _css,
              type: 'rule'
            });
          }

          renderer.rendered[reference] = true;
        }
      },


      /**
       * renders all cached styles into a single valid CSS string
       * clusters media query styles into groups to reduce output size
        * @return single concatenated CSS string
       */
      renderToString: function renderToString() {
        var css = renderer.fontFaces + renderer.statics + renderer.rules;

        for (var media in renderer.mediaRules) {
          var rules = renderer.mediaRules[media];
          if (rules.length > 0) {
            css += '@media ' + media + '{' + rules + '}';
          }
        }

        return css + renderer.keyframes;
      },


      /**
       * Adds a new subscription to get notified on every rerender
       *
       * @param {Function} callback - callback function which will be executed
       * @return {Object} equivalent unsubscribe method
       */
      subscribe: function subscribe(callback) {
        renderer.listeners.push(callback);
        return {
          unsubscribe: function unsubscribe() {
            return renderer.listeners.splice(renderer.listeners.indexOf(callback), 1);
          }
        };
      },


      /**
       * rehydrates the whole cache using the callStack
       */
      rehydrate: function rehydrate() {
        var callStack = renderer.callStack.slice(0);

        // clears the current callStack
        renderer.clear();

        renderer._emitChange({ type: 'rehydrate', done: false });
        callStack.forEach(function (fn) {
          return fn();
        });
        renderer._emitChange({ type: 'rehydrate', done: true });
      },


      /**
       * generates a unique style id
       *
       * @param {Object} style - style object
       * @return {string} minimal string id
       */
      _generateStyleId: function _generateStyleId(style) {
        var styleHash = generateStyleHash(style);

        if (renderer.ids.indexOf(styleHash) === -1) {
          renderer.ids.push(styleHash);
        }

        return renderer.ids.indexOf(styleHash).toString(36);
      },


      /**
       * calls each listener with a change object
       * gets only called if something actually changes
       *
       * @param {Function} callback - callback function which will be executed
       * @return {Object} equivalent unsubscribe method
       */
      _emitChange: function _emitChange(change) {
        renderer.listeners.forEach(function (listener) {
          return listener(change, renderer);
        });
      },


      /**
       * iterates a style object and renders each rule to the cache
       *
       * @param {string} className - className reference to be rendered to
       * @param {Object} style - style object which is rendered
       */
      _renderStyle: function _renderStyle(className, style) {
        var pseudo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var media = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

        var ruleset = Object.keys(style).reduce(function (ruleset, property) {
          var value = style[property];
          // recursive object iteration in order to render
          // pseudo class and media class declarations
          if (value instanceof Object && !Array.isArray(value)) {
            // allow pseudo classes, attribute selectors and the child selector
            if (property.match(/^(:|\[|>)/) !== null) {
              renderer._renderStyle(className, value, pseudo + property, media);
            } else if (property.substr(0, 6) === '@media') {
              // combine media query rules with an `and`
              var query = property.slice(6).trim();
              var combinedMedia = media.length > 0 ? media + ' and ' + query : query;
              renderer._renderStyle(className, value, pseudo, combinedMedia);
            }
          } else {
            ruleset[property] = value;
          }
          return ruleset;
        }, {});

        // add styles to the cache
        if (Object.keys(ruleset).length > 0) {
          renderer.rendered[className] = true;

          var css = cssifyObject(ruleset);
          var selector = '.' + className + pseudo;
          var cssRule = selector + '{' + css + '}';

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
            style: ruleset,
            css: css,
            media: media,
            type: 'rule'
          });
        }
      }
    };

    // initial setup
    renderer.keyframePrefixes.push('');
    renderer.clear();

    // enhance renderer with passed set of enhancers
    if (config.enhancers) {
      config.enhancers.forEach(function (enhancer) {
        return renderer = enhancer(renderer);
      });
    }

    return renderer;
  }

  /*  weak */
  function assign(base) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return args.reduce(function (extend, obj) {
      for (var property in obj) {
        var value = obj[property];
        if (extend[property] instanceof Object && value instanceof Object) {
          extend[property] = assign({}, extend[property], value);
        } else {
          extend[property] = value;
        }
      }
      return extend;
    }, base);
  }

  function combineRules() {
    for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
      rules[_key] = arguments[_key];
    }

    return function combined(props) {
      return rules.reduce(function (style, rule) {
        return assign(style, rule(props));
      }, {});
    };
  }

  /*  weak */
  function enhance() {
    for (var _len = arguments.length, enhancers = Array(_len), _key = 0; _key < _len; _key++) {
      enhancers[_key] = arguments[_key];
    }

    return function (createRenderer) {
      return function () {
        return enhancers.reduce(function (renderer, enhancer) {
          return enhancer(renderer);
        }, createRenderer.apply(undefined, arguments));
      };
    };
  }

  /*  weak */
  function createDOMInterface(renderer, node) {
    var isHydrating = false;

    var DOMInterface = {
      /**
       * updates DOM node styles performantly
       *
       * @param {Function} node - DOM node
       * @param {Object} change - object describing the changes
       * @param {Object} renderer - the renderer which triggered the change
       */
      updateNode: function updateNode() {
        var change = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        // setting the hydration flag to prevent DOM updates will immediately
        // get unset as soon as the rehydration process is done
        if (change.type === 'hydrate') {
          isHydrating = !change.done;
        }

        // only update DOM if the renderer is not hydrating at the moment
        if (!isHydrating) {
          // only use insertRule in production as browser devtools might have
          // weird behavior if used together with insertRule at runtime
          if (change.type === 'rule' && !change.media && false) {
            var sheet = node.sheet;
            // directly append new rules before media rules
            sheet.insertRule(change.selector + '{' + change.css + '}', sheet.cssRules.length);
          } else {
            node.textContent = renderer.renderToString();
          }
        }
      }
    };

    return DOMInterface;
  }

  function render(renderer, mountNode) {
    // check if the passed node is a valid element node which allows
    // setting the `textContent` property to update the node's content
    if (!mountNode || mountNode.nodeType !== 1) {
      throw new Error('You need to specify a valid element node (nodeType = 1) to render into.');
    }

    // warns if the DOM node either is not a valid <style> element thus the styles do not get applied as Expected
    // or if the node already got the data-fela-stylesheet attribute applied suggesting it is already used by another Renderer
    warning$1(mountNode.nodeName === 'STYLE', 'You are using a node other than `<style>`. Your styles might not get applied correctly.');
    warning$1(!mountNode.hasAttribute('data-fela-stylesheet'), 'This node is already used by another renderer. Rendering might overwrite other styles.');

    // mark and clean the DOM node to prevent side-effects
    mountNode.setAttribute('data-fela-stylesheet', '');

    var DOMInterface = createDOMInterface(renderer, mountNode);
    renderer.subscribe(DOMInterface.updateNode);

    // render currently rendered styles to the DOM once
    // if it is not already in DOM
    var css = renderer.renderToString();

    if (mountNode.textContent !== css) {
      mountNode.textContent = css;
    }
  }

  var index = {
    createRenderer: createRenderer,
    combineRules: combineRules,
    enhance: enhance,
    render: render
  };

  return index;

}));
//# sourceMappingURL=fela.js.map