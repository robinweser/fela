(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginLVHA = factory());
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

  var precedence = {
    ':link': 4,
    ':visited': 3,
    ':hover': 2,
    ':focus': 1.5,
    ':active': 1
  };

  function sortPseudoClasses(left, right) {
    var precedenceLeft = precedence[left]; // eslint-disable-line
    var precedenceRight = precedence[right];
    // Only sort if both properties are listed
    // This prevents other pseudos from reordering
    if (precedenceLeft && precedenceRight) {
      return precedenceLeft < precedenceRight ? 1 : -1;
    }
    return 0;
  }

  function LVHA(style) {
    return Object.keys(style).sort(sortPseudoClasses).reduce(function (out, pseudo) {
      out[pseudo] = style[pseudo];
      return out;
    }, {});
  }

  var LVHA$1 = (function () {
    return LVHA;
  })

  return LVHA$1;

}));
//# sourceMappingURL=fela-plugin-lvha.js.map