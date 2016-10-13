(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPresetDev = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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

  function validateStyleObject(style, logInvalid, deleteInvalid) {
    Object.keys(style).forEach(function (property) {
      var value = style[property];
      if (value instanceof Object && !Array.isArray(value)) {
        if (/^(@media|:|\[|>)/.test(property)) {
          validateStyleObject(value, logInvalid, deleteInvalid);
        } else {
          if (deleteInvalid) {
            delete style[property];
          }
          if (logInvalid) {
            console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid nested property. Only use nested `@media` queries or `:` pseudo classes. Maybe you forgot to add a plugin that resolves `' + property + '`.', { // eslint-disable-line
              property: property,
              value: value
            });
          }
        }
      }
    });
  }

  function validator(style, meta, options) {
    var logInvalid = options.logInvalid;
    var deleteInvalid = options.deleteInvalid;


    if (meta.type === 'keyframe') {
      Object.keys(style).forEach(function (percentage) {
        var percentageValue = parseFloat(percentage);
        var value = style[percentage];
        if (value instanceof Object === false) {
          if (logInvalid) {
            console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid keyframe value. An object was expected.', { // eslint-disable-line
              percentage: percentage,
              style: value
            });
          }
          if (deleteInvalid) {
            delete style[percentage];
          }
        } else {
          // check for invalid percentage values, it only allows from, to or 0% - 100%
          if (!percentage.match(/from|to|%/) || percentage.indexOf('%') > -1 && (percentageValue < 0 || percentageValue > 100)) {
            if (logInvalid) {
              console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid keyframe property. Expected either `to`, `from` or a percentage value between 0 and 100.', { // eslint-disable-line
                percentage: percentage,
                style: value
              });
            }
            if (deleteInvalid) {
              delete style[percentage];
            }
          }
        }
      });
    } else if (meta.type === 'rule') {
      validateStyleObject(style, logInvalid, deleteInvalid);
    }

    return style;
  }

  var defaultOptions = { logInvalid: true, deleteInvalid: false };
  var validator$1 = (function (options) {
    return function (style, meta) {
      return validator(style, meta, babelHelpers.extends({}, defaultOptions, options));
    };
  });

  var dev = [logger({ logMetaData: true }), validator$1()];

  return dev;

}));
//# sourceMappingURL=fela-preset-dev.js.map