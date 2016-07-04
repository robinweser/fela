(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginLogger = factory());
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

  var logger = (function () {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    return function (style, meta) {
      var logMetaData = options.logMetaData || false;

      var currentStyle = assign({}, style);

      if (logMetaData) {
        var reference = meta.className || meta.selector || meta.animationName;
        console.log(meta.type.toUpperCase() + ' ' + reference, currentStyle, meta); // eslint-disable-line
      } else {
        console.log(currentStyle); // eslint-disable-line
      }

      return style;
    };
  });

  return logger;

}));
//# sourceMappingURL=fela-plugin-logger.js.map