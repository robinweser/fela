(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPresetWeb = factory());
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

  babelHelpers.objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
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

  function extendStyle(style, extension) {
    // extend conditional style objects
    if (extension.hasOwnProperty('condition')) {
      if (extension.condition) {
        assign(style, extend(extension.style));
      }
    } else {
      // extend basic style objects
      assign(style, extension);
    }
  }

  function extend(style) {
    for (var property in style) {
      var value = style[property];
      if (property === 'extend') {
        // arrayify to loop each extension to support arrays and single extends
        var extensions = [].concat(value);
        for (var i = 0, len = extensions.length; i < len; ++i) {
          extendStyle(style, extensions[i]);
        }
        delete style[property];
      } else if (value instanceof Object && !Array.isArray(value)) {
        // support nested extend as well
        style[property] = extend(value);
      }
    }

    return style;
  }

  var extend$1 = (function () {
    return extend;
  });

  var flexboxOld = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = flexboxOld;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  var alternativeValues = {
    'space-around': 'justify',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end',
    'wrap-reverse': 'multiple',
    wrap: 'multiple'
  };

  var alternativeProps = {
    alignItems: 'WebkitBoxAlign',
    justifyContent: 'WebkitBoxPack',
    flexWrap: 'WebkitBoxLines'
  };

  function flexboxOld(property, value) {
    if (property === 'flexDirection' && typeof value === 'string') {
      return {
        WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
        WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
      };
    }
    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
  }
  module.exports = exports['default'];
  });

  var require$$0$1 = (flexboxOld && typeof flexboxOld === 'object' && 'default' in flexboxOld ? flexboxOld['default'] : flexboxOld);

  var flexboxIE = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = flexboxIE;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  var alternativeValues = {
    'space-around': 'distribute',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end'
  };
  var alternativeProps = {
    alignContent: 'msFlexLinePack',
    alignSelf: 'msFlexItemAlign',
    alignItems: 'msFlexAlign',
    justifyContent: 'msFlexPack',
    order: 'msFlexOrder',
    flexGrow: 'msFlexPositive',
    flexShrink: 'msFlexNegative',
    flexBasis: 'msPreferredSize'
  };

  function flexboxIE(property, value) {
    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
  }
  module.exports = exports['default'];
  });

  var require$$1 = (flexboxIE && typeof flexboxIE === 'object' && 'default' in flexboxIE ? flexboxIE['default'] : flexboxIE);

  var prefixProps = __commonjs(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = { "Webkit": { "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "backfaceVisibility": true, "perspective": true, "perspectiveOrigin": true, "transformStyle": true, "transformOriginZ": true, "animation": true, "animationDelay": true, "animationDirection": true, "animationFillMode": true, "animationDuration": true, "animationIterationCount": true, "animationName": true, "animationPlayState": true, "animationTimingFunction": true, "appearance": true, "userSelect": true, "fontKerning": true, "textEmphasisPosition": true, "textEmphasis": true, "textEmphasisStyle": true, "textEmphasisColor": true, "boxDecorationBreak": true, "clipPath": true, "maskImage": true, "maskMode": true, "maskRepeat": true, "maskPosition": true, "maskClip": true, "maskOrigin": true, "maskSize": true, "maskComposite": true, "mask": true, "maskBorderSource": true, "maskBorderMode": true, "maskBorderSlice": true, "maskBorderWidth": true, "maskBorderOutset": true, "maskBorderRepeat": true, "maskBorder": true, "maskType": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "filter": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true, "flex": true, "flexBasis": true, "flexDirection": true, "flexGrow": true, "flexFlow": true, "flexShrink": true, "flexWrap": true, "alignContent": true, "alignItems": true, "alignSelf": true, "justifyContent": true, "order": true, "transition": true, "transitionDelay": true, "transitionDuration": true, "transitionProperty": true, "transitionTimingFunction": true, "backdropFilter": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "shapeImageThreshold": true, "shapeImageMargin": true, "shapeImageOutside": true, "hyphens": true, "flowInto": true, "flowFrom": true, "regionFragment": true, "textSizeAdjust": true }, "Moz": { "appearance": true, "userSelect": true, "boxSizing": true, "textAlignLast": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "tabSize": true, "hyphens": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true }, "ms": { "flex": true, "flexBasis": false, "flexDirection": true, "flexGrow": false, "flexFlow": true, "flexShrink": false, "flexWrap": true, "alignContent": false, "alignItems": false, "alignSelf": false, "justifyContent": false, "order": false, "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "userSelect": true, "wrapFlow": true, "wrapThrough": true, "wrapMargin": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "touchAction": true, "hyphens": true, "flowInto": true, "flowFrom": true, "breakBefore": true, "breakAfter": true, "breakInside": true, "regionFragment": true, "gridTemplateColumns": true, "gridTemplateRows": true, "gridTemplateAreas": true, "gridTemplate": true, "gridAutoColumns": true, "gridAutoRows": true, "gridAutoFlow": true, "grid": true, "gridRowStart": true, "gridColumnStart": true, "gridRowEnd": true, "gridRow": true, "gridColumn": true, "gridColumnEnd": true, "gridColumnGap": true, "gridRowGap": true, "gridArea": true, "gridGap": true, "textSizeAdjust": true } };
  module.exports = exports["default"];
  });

  var require$$0$2 = (prefixProps && typeof prefixProps === 'object' && 'default' in prefixProps ? prefixProps['default'] : prefixProps);

  var isPrefixedValue = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (value) {
    if (Array.isArray(value)) value = value.join(',');

    return value.match(/-webkit-|-moz-|-ms-/) !== null;
  };

  module.exports = exports['default'];
  });

  var require$$0$3 = (isPrefixedValue && typeof isPrefixedValue === 'object' && 'default' in isPrefixedValue ? isPrefixedValue['default'] : isPrefixedValue);

  var capitalizeString = __commonjs(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  // helper to capitalize strings

  exports.default = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  module.exports = exports["default"];
  });

  var require$$2$1 = (capitalizeString && typeof capitalizeString === 'object' && 'default' in capitalizeString ? capitalizeString['default'] : capitalizeString);

  var index = __commonjs(function (module) {
  'use strict';

  var uppercasePattern = /[A-Z]/g;
  var msPattern = /^ms-/;
  var cache = {};

  function hyphenateStyleName(string) {
    return string in cache ? cache[string] : cache[string] = string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
  }

  module.exports = hyphenateStyleName;
  });

  var require$$0$4 = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);

  var transition = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = transition;

  var _hyphenateStyleName = require$$0$4;

  var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

  var _capitalizeString = require$$2$1;

  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

  var _isPrefixedValue = require$$0$3;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  var _prefixProps = require$$0$2;

  var _prefixProps2 = _interopRequireDefault(_prefixProps);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  var properties = {
    transition: true,
    transitionProperty: true,
    WebkitTransition: true,
    WebkitTransitionProperty: true
  };

  function transition(property, value) {
    // also check for already prefixed transitions
    if (typeof value === 'string' && properties[property]) {
      var _ref2;

      var outputValue = prefixValue(value);
      var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (value) {
        return value.match(/-moz-|-ms-/) === null;
      }).join(',');

      // if the property is already prefixed
      if (property.indexOf('Webkit') > -1) {
        return _defineProperty({}, property, webkitOutput);
      }

      return _ref2 = {}, _defineProperty(_ref2, 'Webkit' + (0, _capitalizeString2.default)(property), webkitOutput), _defineProperty(_ref2, property, outputValue), _ref2;
    }
  }

  function prefixValue(value) {
    if ((0, _isPrefixedValue2.default)(value)) {
      return value;
    }

    // only split multi values, not cubic beziers
    var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

    // iterate each single value and check for transitioned properties
    // that need to be prefixed as well
    multipleValues.forEach(function (val, index) {
      multipleValues[index] = Object.keys(_prefixProps2.default).reduce(function (out, prefix) {
        var dashCasePrefix = '-' + prefix.toLowerCase() + '-';

        Object.keys(_prefixProps2.default[prefix]).forEach(function (prop) {
          var dashCaseProperty = (0, _hyphenateStyleName2.default)(prop);

          if (val.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
            // join all prefixes and create a new value
            out = val.replace(dashCaseProperty, dashCasePrefix + dashCaseProperty) + ',' + out;
          }
        });
        return out;
      }, val);
    });

    return multipleValues.join(',');
  }
  module.exports = exports['default'];
  });

  var require$$2 = (transition && typeof transition === 'object' && 'default' in transition ? transition['default'] : transition);

  var joinPrefixedValue = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  // returns a style object with a single concated prefixed value string

  exports.default = function (property, value) {
    var replacer = arguments.length <= 2 || arguments[2] === undefined ? function (prefix, value) {
      return prefix + value;
    } : arguments[2];
    return _defineProperty({}, property, ['-webkit-', '-moz-', ''].map(function (prefix) {
      return replacer(prefix, value);
    }));
  };

  module.exports = exports['default'];
  });

  var require$$1$1 = (joinPrefixedValue && typeof joinPrefixedValue === 'object' && 'default' in joinPrefixedValue ? joinPrefixedValue['default'] : joinPrefixedValue);

  var gradient = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = gradient;

  var _joinPrefixedValue = require$$1$1;

  var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

  var _isPrefixedValue = require$$0$3;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

  function gradient(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.match(values) !== null) {
      return (0, _joinPrefixedValue2.default)(property, value);
    }
  }
  module.exports = exports['default'];
  });

  var require$$3 = (gradient && typeof gradient === 'object' && 'default' in gradient ? gradient['default'] : gradient);

  var sizing = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = sizing;

  var _joinPrefixedValue = require$$1$1;

  var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var properties = {
    maxHeight: true,
    maxWidth: true,
    width: true,
    height: true,
    columnWidth: true,
    minWidth: true,
    minHeight: true
  };
  var values = {
    'min-content': true,
    'max-content': true,
    'fill-available': true,
    'fit-content': true,
    'contain-floats': true
  };

  function sizing(property, value) {
    if (properties[property] && values[value]) {
      return (0, _joinPrefixedValue2.default)(property, value);
    }
  }
  module.exports = exports['default'];
  });

  var require$$4 = (sizing && typeof sizing === 'object' && 'default' in sizing ? sizing['default'] : sizing);

  var flex = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = flex;
  var values = { flex: true, 'inline-flex': true };

  function flex(property, value) {
    if (property === 'display' && values[value]) {
      return {
        display: ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value]
      };
    }
  }
  module.exports = exports['default'];
  });

  var require$$5 = (flex && typeof flex === 'object' && 'default' in flex ? flex['default'] : flex);

  var cursor = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = cursor;

  var _joinPrefixedValue = require$$1$1;

  var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var values = {
    'zoom-in': true,
    'zoom-out': true,
    grab: true,
    grabbing: true
  };

  function cursor(property, value) {
    if (property === 'cursor' && values[value]) {
      return (0, _joinPrefixedValue2.default)(property, value);
    }
  }
  module.exports = exports['default'];
  });

  var require$$6 = (cursor && typeof cursor === 'object' && 'default' in cursor ? cursor['default'] : cursor);

  var calc = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = calc;

  var _joinPrefixedValue = require$$1$1;

  var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

  var _isPrefixedValue = require$$0$3;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function calc(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('calc(') > -1) {
      return (0, _joinPrefixedValue2.default)(property, value, function (prefix, value) {
        return value.replace(/calc\(/g, prefix + 'calc(');
      });
    }
  }
  module.exports = exports['default'];
  });

  var require$$7 = (calc && typeof calc === 'object' && 'default' in calc ? calc['default'] : calc);

  var position = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = position;
  function position(property, value) {
    if (property === 'position' && value === 'sticky') {
      return { position: ['-webkit-sticky', 'sticky'] };
    }
  }
  module.exports = exports['default'];
  });

  var require$$8 = (position && typeof position === 'object' && 'default' in position ? position['default'] : position);

  var isPrefixedProperty = __commonjs(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (property) {
    return property.match(/^(Webkit|Moz|O|ms)/) !== null;
  };

  module.exports = exports["default"];
  });

  var require$$0$5 = (isPrefixedProperty && typeof isPrefixedProperty === 'object' && 'default' in isPrefixedProperty ? isPrefixedProperty['default'] : isPrefixedProperty);

  var sortPrefixedStyle = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = sortPrefixedStyle;

  var _isPrefixedProperty = require$$0$5;

  var _isPrefixedProperty2 = _interopRequireDefault(_isPrefixedProperty);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function sortPrefixedStyle(style) {
    return Object.keys(style).sort(function (left, right) {
      if ((0, _isPrefixedProperty2.default)(left) && !(0, _isPrefixedProperty2.default)(right)) {
        return -1;
      } else if (!(0, _isPrefixedProperty2.default)(left) && (0, _isPrefixedProperty2.default)(right)) {
        return 1;
      }
      return 0;
    }).reduce(function (sortedStyle, prop) {
      sortedStyle[prop] = style[prop];
      return sortedStyle;
    }, {});
  }
  module.exports = exports['default'];
  });

  var require$$9 = (sortPrefixedStyle && typeof sortPrefixedStyle === 'object' && 'default' in sortPrefixedStyle ? sortPrefixedStyle['default'] : sortPrefixedStyle);

  var prefixAll = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = prefixAll;

  var _prefixProps = require$$0$2;

  var _prefixProps2 = _interopRequireDefault(_prefixProps);

  var _capitalizeString = require$$2$1;

  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

  var _sortPrefixedStyle = require$$9;

  var _sortPrefixedStyle2 = _interopRequireDefault(_sortPrefixedStyle);

  var _position = require$$8;

  var _position2 = _interopRequireDefault(_position);

  var _calc = require$$7;

  var _calc2 = _interopRequireDefault(_calc);

  var _cursor = require$$6;

  var _cursor2 = _interopRequireDefault(_cursor);

  var _flex = require$$5;

  var _flex2 = _interopRequireDefault(_flex);

  var _sizing = require$$4;

  var _sizing2 = _interopRequireDefault(_sizing);

  var _gradient = require$$3;

  var _gradient2 = _interopRequireDefault(_gradient);

  var _transition = require$$2;

  var _transition2 = _interopRequireDefault(_transition);

  var _flexboxIE = require$$1;

  var _flexboxIE2 = _interopRequireDefault(_flexboxIE);

  var _flexboxOld = require$$0$1;

  var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  // special flexbox specifications


  var plugins = [_position2.default, _calc2.default, _cursor2.default, _sizing2.default, _gradient2.default, _transition2.default, _flexboxIE2.default, _flexboxOld2.default, _flex2.default];

  /**
   * Returns a prefixed version of the style object using all vendor prefixes
   * @param {Object} styles - Style object that gets prefixed properties added
   * @returns {Object} - Style object with prefixed properties and values
   */
  function prefixAll(styles) {
    Object.keys(styles).forEach(function (property) {
      var value = styles[property];
      if (value instanceof Object && !Array.isArray(value)) {
        // recurse through nested style objects
        styles[property] = prefixAll(value);
      } else {
        Object.keys(_prefixProps2.default).forEach(function (prefix) {
          var properties = _prefixProps2.default[prefix];
          // add prefixes if needed
          if (properties[property]) {
            styles[prefix + (0, _capitalizeString2.default)(property)] = value;
          }
        });
      }
    });

    Object.keys(styles).forEach(function (property) {
      [].concat(styles[property]).forEach(function (value, index) {
        // resolve every special plugins
        plugins.forEach(function (plugin) {
          return assignStyles(styles, plugin(property, value));
        });
      });
    });

    return (0, _sortPrefixedStyle2.default)(styles);
  }

  function assignStyles(base) {
    var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    Object.keys(extend).forEach(function (property) {
      var baseValue = base[property];
      if (Array.isArray(baseValue)) {
        [].concat(extend[property]).forEach(function (value) {
          var valueIndex = baseValue.indexOf(value);
          if (valueIndex > -1) {
            base[property].splice(valueIndex, 1);
          }
          base[property].push(value);
        });
      } else {
        base[property] = extend[property];
      }
    });
  }
  module.exports = exports['default'];
  });

  var require$$0 = (prefixAll && typeof prefixAll === 'object' && 'default' in prefixAll ? prefixAll['default'] : prefixAll);

  var _static = __commonjs(function (module) {
  module.exports = require$$0;
  });

  var prefix = (_static && typeof _static === 'object' && 'default' in _static ? _static['default'] : _static);

  function resolveFallbackValues$1(style) {
    for (var property in style) {
      var value = style[property];
      if (Array.isArray(value)) {
        style[property] = value.join(';' + require$$0$4(property) + ':');
      } else if (value instanceof Object) {
        style[property] = resolveFallbackValues$1(value);
      }
    }

    return style;
  }

  var fallbackValue = (function () {
    return resolveFallbackValues$1;
  });

  function generateCSSDeclaration(property, value) {
    return require$$0$4(property) + ':' + value;
  }

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

  function cssifyObject(style) {
    var css = '';

    for (var property in style) {
      warning$1(typeof style[property] === 'string' || typeof style[property] === 'number', 'The invalid value `' + style[property] + '` has been used as `' + property + '`.');

      // prevents the semicolon after
      // the last rule declaration
      if (css) {
        css += ';';
      }

      css += generateCSSDeclaration(property, style[property]);
    }

    return css;
  }

  var resolveFallbackValues = fallbackValue();

  // TODO: refactor this messy piece of code
  // into clean, performant equivalent
  function addVendorPrefixes(style) {
    var prefixedStyle = {};

    for (var property in style) {
      var value = style[property];
      if (value instanceof Object && !Array.isArray(value)) {
        prefixedStyle[property] = addVendorPrefixes(value);
      } else {
        var declaration = babelHelpers.defineProperty({}, property, style[property]);
        var prefixedDeclaration = resolveFallbackValues(prefix(declaration));

        var referenceProperty = Object.keys(prefixedDeclaration)[0];
        var referenceValue = prefixedDeclaration[referenceProperty];
        delete prefixedDeclaration[referenceProperty];
        var inlinedProperties = cssifyObject(prefixedDeclaration);
        prefixedStyle[referenceProperty] = referenceValue + (inlinedProperties ? ';' + inlinedProperties : '');
      }
    }

    return prefixedStyle;
  }

  var prefixer = (function () {
    return addVendorPrefixes;
  });

  /*  weak */
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
  });

  var index$1 = __commonjs(function (module) {
  var hyphenateStyleName = require$$0$4;

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

  var isUnitlessCSSProperty = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

  function addUnitIfNeeded(property, value, unit) {
    var valueType = typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value);
    if (valueType === 'number' || valueType === 'string' && value == parseFloat(value)) {
      // eslint-disable-line
      value += unit;
    }

    return value;
  }

  function addUnit(style, unit, propertyMap) {
    var _loop = function _loop(property) {
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
    };

    for (var property in style) {
      _loop(property);
    }

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

  var web = [extend$1(), prefixer(), fallbackValue(), LVHA$1(), unit()];

  return web;

}));
//# sourceMappingURL=fela-preset-web.js.map