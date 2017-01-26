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
  function assign(base) {
    for (var _len = arguments.length, extendingStyles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      extendingStyles[_key - 1] = arguments[_key];
    }

    for (var i = 0, len = extendingStyles.length; i < len; ++i) {
      var style = extendingStyles[i];

      for (var property in style) {
        var value = style[property];

        if (base[property] instanceof Object && value instanceof Object) {
          base[property] = assign({}, base[property], value);
        } else {
          base[property] = value;
        }
      }
    }

    return base;
  }

  function addLogger(style, props, type) {
    if (true) {
      console.log(type, assign({}, style)); // eslint-disable-line
    }

    return style;
  }

  var logger = (function () {
    return addLogger;
  });

  /*  weak */
  var RULE_TYPE = 1;
  var KEYFRAME_TYPE = 2;

  function validateStyleObject(style, logInvalid, deleteInvalid) {
    for (var property in style) {
      var value = style[property];
      if (value instanceof Object && !Array.isArray(value)) {
        if (/^(@media|:|\[|>)/.test(property)) {
          validateStyleObject(value, logInvalid, deleteInvalid);
        } else {
          if (deleteInvalid) {
            delete style[property];
          }
          if (logInvalid) {
            console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid nested property. Only use nested `@media` queries or `:` pseudo classes.\n              Maybe you forgot to add a plugin that resolves `' + property + '`.', {
              // eslint-disable-line
              property: property,
              value: value
            });
          }
        }
      }
    }
  }

  function validator(style, type, options) {
    var logInvalid = options.logInvalid,
        deleteInvalid = options.deleteInvalid;


    if (type === KEYFRAME_TYPE) {
      for (var percentage in style) {
        var percentageValue = parseFloat(percentage);
        var value = style[percentage];
        if (value instanceof Object === false) {
          if (logInvalid) {
            console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid keyframe value. An object was expected.', {
              // eslint-disable-line
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
              console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid keyframe property.\n                Expected either `to`, `from` or a percentage value between 0 and 100.', {
                percentage: percentage,
                style: value
              });
            }
            if (deleteInvalid) {
              delete style[percentage];
            }
          }
        }
      }
    } else if (type === RULE_TYPE) {
      validateStyleObject(style, logInvalid, deleteInvalid);
    }

    return style;
  }

  var defaultOptions = {
    logInvalid: true,
    deleteInvalid: false
  };
  var validator$1 = (function (options) {
    return function (style, props, type) {
      return validator(style, type, babelHelpers.extends({}, defaultOptions, options));
    };
  });

  var dev = [logger({ logMetaData: true }), validator$1()];

  return dev;

}));
//# sourceMappingURL=fela-preset-dev.js.map