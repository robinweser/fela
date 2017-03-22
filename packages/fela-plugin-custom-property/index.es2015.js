import assignStyle from 'css-in-js-utils/lib/assignStyle';

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

function isObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object' && !Array.isArray(value);
}

function resolveCustomProperty(style, properties) {
  for (var property in style) {
    var value = style[property];

    if (properties.hasOwnProperty(property)) {
      assignStyle(style, properties[property](value));
      delete style[property];
    }

    if (isObject(value)) {
      style[property] = resolveCustomProperty(value, properties);
    }
  }

  return style;
}

function customProperty(properties) {
  return function (style) {
    return resolveCustomProperty(style, properties);
  };
}

export default customProperty;