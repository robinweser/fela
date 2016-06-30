(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Fela = factory());
}(this, function () { 'use strict';

    var babelHelpers = {};
    babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
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


    function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

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
      return Object.keys(obj).sort().reduce(function (str, prop) {
        // only concatenate property and value
        // without any special characters
        return str + prop + obj[prop];
      }, '');
    }

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

    var index$1 = __commonjs(function (module) {
    'use strict';

    var uppercasePattern = /[A-Z]/g;
    var msPattern = /^ms-/;

    function hyphenateStyleName(string) {
        return string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
    }

    module.exports = hyphenateStyleName;
    });

    var hypenateStyleName = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

    /**
     * generates a valid CSS string containing style
     *
     * @param {Object} style - object containing CSS declarations
     * @returns {string} valid CSS string with dash cased properties
     */
    function cssifyObject(style) {
      return Object.keys(style).reduce(function (css, prop) {
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
      var prefixes = arguments.length <= 2 || arguments[2] === undefined ? [''] : arguments[2];

      var keyframe = Object.keys(frames).reduce(function (css, percentage) {
        return css + percentage + '{' + cssifyObject(frames[percentage]) + '}';
      }, '');

      return prefixes.reduce(function (css, prefix) {
        return css + '@' + prefix + 'keyframes ' + animationName + '{' + keyframe + '}';
      }, '');
    }

    function createRenderer() {
      var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var renderer = {
        listeners: [],
        keyframePrefixes: config.keyframePrefixes || ['-webkit-', '-moz-'],
        plugins: config.plugins || [],

        /**
         * clears the sheet's cache but keeps all listeners
         */
        clear: function clear() {
          renderer.fontFaces = '';
          renderer.keyframes = '';
          renderer.statics = '';
          renderer.rules = '';
          renderer.mediaRules = {};
          renderer.rendered = {};
          renderer.base = {};
          renderer.ids = [];

          // emit changes to notify subscribers
          renderer._emitChange();
        },


        /**
         * renders a new rule variation and caches the result
         *
         * @param {Function} rule - rule which gets rendered
         * @param {Object?} props - properties used to render
         * @return {string} className to reference the rendered rule
         */
        renderRule: function renderRule(rule) {
          var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          // rendering a rule for the first time
          // will create an ID reference
          if (renderer.ids.indexOf(rule) < 0) {
            renderer.ids.push(rule);

            // directly render the static base style to be able
            // to diff future dynamic style with those
            renderer.renderRule(rule, {});
          }

          // uses the reference ID and the props to generate an unique className
          var ruleId = renderer.ids.indexOf(rule);
          var className = 'c' + ruleId + renderer._generatePropsReference(props);

          // only if the cached rule has not already been rendered
          // with a specific set of properties it actually renders
          if (!renderer.rendered.hasOwnProperty(className)) {
            var style = renderer._processStyle(rule(props));
            renderer._renderStyle(className, style, renderer.base[ruleId]);

            renderer.rendered[className] = renderer._didChange;

            if (renderer._didChange) {
              renderer._didChange = false;
              renderer._emitChange();
            }

            // keep static style to diff dynamic onces later on
            if (className === 'c' + ruleId) {
              renderer.base[ruleId] = style;
            }
          }

          var baseClassName = 'c' + ruleId;
          if (!renderer.rendered[className]) {
            return baseClassName;
          }

          // returns either the base className or both the base and the dynamic part
          return className !== baseClassName ? baseClassName + ' ' + className : className;
        },


        /**
         * renders a new keyframe variation and caches the result
         *
         * @param {Keyframe} keyframe - Keyframe which gets rendered
         * @param {Object?} props - properties used to render
         * @return {string} animationName to reference the rendered keyframe
         */
        renderKeyframe: function renderKeyframe(keyframe) {
          var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          // rendering a Keyframe for the first time
          // will create cache entries and an ID reference
          if (renderer.ids.indexOf(keyframe) < 0) {
            renderer.ids.push(keyframe);
          }

          var propsReference = renderer._generatePropsReference(props);
          var animationName = 'k' + renderer.ids.indexOf(keyframe) + propsReference;

          // only if the cached keyframe has not already been rendered
          // with a specific set of properties it actually renders
          if (!renderer.rendered.hasOwnProperty(animationName)) {
            var processedKeyframe = renderer._processStyle(keyframe(props));
            var css = cssifyKeyframe(processedKeyframe, animationName, renderer.keyframePrefixes);
            renderer.rendered[animationName] = true;
            renderer.keyframes += css;
            renderer._emitChange();
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
          var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

          if (!renderer.rendered.hasOwnProperty(family)) {
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
              renderer.rendered[family] = true;
              renderer.fontFaces += css;
              renderer._emitChange();
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
          var reference = typeof style === 'string' ? style : selector + sortedStringify(style);

          if (!renderer.rendered.hasOwnProperty(reference)) {
            if (typeof style === 'string') {
              // remove new lines from template strings
              renderer.statics += style.replace(/\s{2,}/g, '');
            } else {
              renderer.statics += selector + '{' + cssifyObject(renderer._processStyle(style)) + '}';
            }

            renderer.rendered[reference] = true;
            renderer._emitChange();
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
            css += '@media ' + media + '{' + renderer.mediaRules[media] + '}';
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
         * calls each listener with the current CSS markup of all caches
         * gets only called if the markup actually changes
         *
         * @param {Function} callback - callback function which will be executed
         * @return {Object} equivalent unsubscribe method
         */
        _emitChange: function _emitChange() {
          var css = renderer.renderToString();
          renderer.listeners.forEach(function (listener) {
            return listener(css);
          });
        },


        /**
         * generates an unique reference id by content hashing props
         *
         * @param {Object} props - props that get hashed
         * @return {string} reference - unique props reference
         */
        _generatePropsReference: function _generatePropsReference(props) {
          return generateHash(sortedStringify(props));
        },


        /**
         * pipes a style object through a list of plugins
         *
         * @param {Object} style - style object to process
         * @return {Object} processed style
         */
        _processStyle: function _processStyle(style) {
          return renderer.plugins.reduce(function (processedStyle, plugin) {
            return plugin(processedStyle);
          }, style);
        },


        /**
         * iterates a style object and renders each rule to the cache
         *
         * @param {string} className - className reference to be rendered to
         * @param {Object} style - style object which is rendered
         * @param {Object`} base - base style subset for diffing
         */
        _renderStyle: function _renderStyle(className, style) {
          var base = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
          var pseudo = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
          var media = arguments.length <= 4 || arguments[4] === undefined ? '' : arguments[4];

          var ruleset = Object.keys(style).reduce(function (ruleset, property) {
            var value = style[property];
            // recursive object iteration in order to render
            // pseudo class and media class declarations
            if (value instanceof Object && !Array.isArray(value)) {
              if (property.charAt(0) === ':') {
                renderer._renderStyle(className, value, base[property], pseudo + property, media);
              } else if (property.substr(0, 6) === '@media') {
                // combine media query rules with an `and`
                var query = property.slice(6).trim();
                var combinedMedia = media.length > 0 ? media + ' and ' + query : query;
                renderer._renderStyle(className, value, base[property], pseudo, combinedMedia);
              }
            } else {
              // diff styles with the base styles to only extract dynamic styles
              if (value !== undefined && !base.hasOwnProperty(property) || base[property] !== value) {
                // remove concatenated string values including `undefined`
                if (typeof value === 'string' && value.indexOf('undefined') > -1) {
                  return ruleset;
                }
                ruleset[property] = value;
              }
            }
            return ruleset;
          }, {});

          // add styles to the cache
          if (Object.keys(ruleset).length > 0) {
            var css = '.' + className + pseudo + '{' + cssifyObject(ruleset) + '}';
            renderer._didChange = true;

            if (media.length > 0) {
              if (!renderer.mediaRules.hasOwnProperty(media)) {
                renderer.mediaRules[media] = '';
              }

              renderer.mediaRules[media] += css;
            } else {
              renderer.rules += css;
            }
          }
        }
      };

      // initial setup
      renderer.keyframePrefixes.push('');
      renderer.clear();

      return renderer;
    }

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

      return function (props) {
        return rules.reduce(function (style, rule) {
          return assign(style, rule(props));
        }, {});
      };
    }

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

    var warning = function warning() {
      return true;
    };

    if (true) {
      warning = function warning(condition, message) {
        if (!condition) {
          if (typeof console !== 'undefined') {
            console.error(message); // eslint-disable-line
          }
          throw new Error(message);
        }
      };
    }

    var warning$1 = warning;

    var NODE_TYPE = 1;
    var NODE_NAME = 'STYLE';

    function render(renderer, mountNode) {
      // check if the passed node is a valid element node which allows
      // setting the `textContent` property to update the node's content
      if (!mountNode || mountNode.nodeType !== NODE_TYPE) {
        throw new Error('You need to specify a valid element node (nodeType = 1) to render into.');
      }

      // warns if the DOM node either is not a valid <style> element thus the styles do not get applied as Expected
      // or if the node already got the data-fela-stylesheet attribute applied suggesting it is already used by another Renderer
      warning$1(mountNode.nodeName === NODE_NAME, 'You are using a node other than `<style>`. Your styles might not get applied correctly.');
      warning$1(!mountNode.hasAttribute('data-fela-stylesheet'), 'This node is already used by another renderer. Rendering might overwrite other styles.');

      // mark and clean the DOM node to prevent side-effects
      mountNode.setAttribute('data-fela-stylesheet', '');

      // updated the DOM node's textContent with newly rendered markup
      renderer.subscribe(function (css) {
        return mountNode.textContent = css;
      });

      // render currently rendered styles to the DOM once when it is not already in DOM
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