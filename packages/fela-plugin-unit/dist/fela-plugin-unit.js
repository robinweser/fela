(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginUnit = factory());
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

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers;


  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

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

  function addUnit(style, unit, propertyMap) {
    Object.keys(style).forEach(function (property) {
      if (!isUnitlessCSSProperty(property)) {
        (function () {

          var value = style[property];
          var propertyUnit = propertyMap[property] || unit;
          if (Array.isArray(value)) {
            style[property] = value.map(function (value) {
              return addUnitIfNeeded(property, value, propertyUnit);
            });
          } else if (value instanceof Object) {
            style[property] = addUnit(value, unit, propertyMap);
          } else {
            style[property] = addUnitIfNeeded(property, value, propertyUnit);
          }
        })();
      }
    });

    return style;
  }

  var unit = (function () {
    var unit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'px';
    var propertyMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    warning$1(unit.match(/ch|em|ex|rem|vh|vw|vmin|vmax|px|cm|mm|in|pc|pt|mozmm|%/) !== null, 'You are using an invalid unit `' + unit + '`. Consider using one of the following ch, em, ex, rem, vh, vw, vmin, vmax, px, cm, mm, in, pc, pt, mozmm or %.');

    return function (style) {
      return addUnit(style, unit, propertyMap);
    };
  });

  return unit;

}));
//# sourceMappingURL=fela-plugin-unit.js.map