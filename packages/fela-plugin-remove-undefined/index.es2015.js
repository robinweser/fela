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

babelHelpers;

function isUndefinedValue(value) {
  return value === undefined || typeof value === 'string' && value.indexOf('undefined') !== -1;
}

function isObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && !Array.isArray(value);
}

function removeUndefined(style) {
  for (var property in style) {
    var value = style[property];

    if (isObject(value)) {
      style[property] = removeUndefined(value);
    } else if (Array.isArray(value)) {
      style[property] = value.filter(function (val) {
        return !isUndefinedValue(val);
      });
    } else if (isUndefinedValue(value)) {
      delete style[property];
    }
  }

  return style;
}

var removeUndefined$1 = (function () {
  return removeUndefined;
});

export default removeUndefined$1;