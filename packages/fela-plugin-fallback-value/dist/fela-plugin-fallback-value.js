(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.FelaPluginFallbackValue = factory());
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

    var index = __commonjs(function (module) {
    'use strict';

    var uppercasePattern = /[A-Z]/g;
    var msPattern = /^ms-/;

    function hyphenateStyleName(string) {
        return string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
    }

    module.exports = hyphenateStyleName;
    });

    var hypenateStyleName = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);

    function fallbackValue(style) {
      Object.keys(style).forEach(function (property) {
        var value = style[property];
        if (Array.isArray(value)) {
          style[property] = value.join(';' + hypenateStyleName(property) + ':');
        } else if (value instanceof Object) {
          style[property] = fallbackValue(value);
        }
      });

      return style;
    }

    var fallbackValue$1 = (function () {
      return fallbackValue;
    });

    return fallbackValue$1;

}));
//# sourceMappingURL=fela-plugin-fallback-value.js.map