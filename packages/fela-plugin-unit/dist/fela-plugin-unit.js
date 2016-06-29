(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.FelaPluginUnit = factory());
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

    var index$1 = __commonjs(function (module) {
    'use strict';

    var uppercasePattern = /[A-Z]/g;
    var msPattern = /^ms-/;

    function hyphenateStyleName(string) {
        return string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
    }

    module.exports = hyphenateStyleName;
    });

    var require$$0 = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

    var index = __commonjs(function (module) {
    var hyphenateStyleName = require$$0;

    var unitlessProperties = {
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      fontWeight: true,
      lineHeight: true,
      opacity: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,

      // SVG-related properties
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };

    var prefixedUnitlessProperties = {
      animationIterationCount: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridRow: true,
      gridColumn: true,
      order: true,
      lineClamp: true
    };

    var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

    function getPrefixedKey(prefix, key) {
      return prefix + key.charAt(0).toUpperCase() + key.slice(1);
    }

    // add all prefixed properties to the unitless properties
    Object.keys(prefixedUnitlessProperties).forEach(function (property) {
      unitlessProperties[property] = true;

      prefixes.forEach(function (prefix) {
        unitlessProperties[getPrefixedKey(prefix, property)] = true;
      });
    });

    // add all hypenated properties as well
    Object.keys(unitlessProperties).forEach(function (property) {
      unitlessProperties[hyphenateStyleName(property)] = true;
    });

    module.exports = function (property) {
      return unitlessProperties[property];
    };
    });

    var isUnitlessCSSProperty = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);

    function addUnitIfNeeded(property, value, unit) {
      var valueType = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
      if (valueType === 'number' || valueType === 'string' && value == parseFloat(value)) {
        // eslint-disable-line
        value += unit;
      }

      return value;
    }

    function addUnit(style, unit) {
      Object.keys(style).forEach(function (property) {
        if (!isUnitlessCSSProperty(property)) {

          var value = style[property];
          if (Array.isArray(value)) {
            style[property] = value.map(function (value) {
              return addUnitIfNeeded(property, value, unit);
            });
          } else if (value instanceof Object) {
            style[property] = addUnit(value, unit);
          } else {
            style[property] = addUnitIfNeeded(property, value, unit);
          }
        }
      });

      return style;
    }

    var unit = (function () {
      var unit = arguments.length <= 0 || arguments[0] === undefined ? 'px' : arguments[0];

      warning$1(unit.match(/ch|em|ex|rem|vh|vw|vmin|vmax|px|cm|mm|in|pc|pt|mozmm|%/) !== null, 'You are using an invalid unit `' + unit + '`. Consider using one of the following ch, em, ex, rem, vh, vw, vmin, vmax, px, cm, mm, in, pc, pt, mozmm or %.');

      return function (style) {
        return addUnit(style, unit);
      };
    });

    return unit;

}));
//# sourceMappingURL=fela-plugin-unit.js.map