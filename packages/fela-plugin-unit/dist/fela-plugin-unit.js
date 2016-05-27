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

  babelHelpers;


  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

  var index = __commonjs(function (module) {
  var unitlessProperties = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
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
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
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

  var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

  function getPrefixedKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.slice(1);
  }

  // add all prefixed properties as well
  Object.keys(unitlessProperties).forEach(function (property) {
    prefixes.forEach(function (prefix) {
      unitlessProperties[getPrefixedKey(prefix, property)] = true;
    });
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

  function unit() {
    var unit = arguments.length <= 0 || arguments[0] === undefined ? 'px' : arguments[0];

    return function (pluginInterface) {
      var styles = pluginInterface.styles;
      var processStyles = pluginInterface.processStyles;


      Object.keys(styles).forEach(function (property) {
        if (!isUnitlessCSSProperty(property)) {

          var value = styles[property];
          if (Array.isArray(value)) {
            styles[property] = value.map(function (value) {
              return addUnitIfNeeded(property, value, unit);
            });
          } else if (value instanceof Object) {
            styles[property] = processStyles(babelHelpers.extends({}, pluginInterface, {
              styles: value
            }));
          } else {
            styles[property] = addUnitIfNeeded(property, value, unit);
          }
        }
      });

      return styles;
    };
  }

  return unit;

}));
//# sourceMappingURL=fela-plugin-unit.js.map