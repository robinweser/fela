(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginPrefixer = factory());
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

  var camelToDashCase = __commonjs(function (module, exports) {
  /**
   * Converts a camel-case string to a dash-case string
   * @param {string} str - str that gets converted to dash-case
   */
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  exports['default'] = function (str) {
    return str.replace(/([a-z]|^)([A-Z])/g, function (match, p1, p2) {
      return p1 + '-' + p2.toLowerCase();
    }).replace('ms-', '-ms-');
  };

  module.exports = exports['default'];
  });

  var require$$0$1 = (camelToDashCase && typeof camelToDashCase === 'object' && 'default' in camelToDashCase ? camelToDashCase['default'] : camelToDashCase);

  var flexboxOld = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = flexboxOld;

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  var _utilsCamelToDashCase = require$$0$1;

  var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

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
    if (property === 'flexDirection') {
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

  var require$$0 = (flexboxOld && typeof flexboxOld === 'object' && 'default' in flexboxOld ? flexboxOld['default'] : flexboxOld);

  var flexboxIE = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = flexboxIE;

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
  exports["default"] = { "Webkit": { "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "backfaceVisibility": true, "perspective": true, "perspectiveOrigin": true, "transformStyle": true, "transformOriginZ": true, "animation": true, "animationDelay": true, "animationDirection": true, "animationFillMode": true, "animationDuration": true, "animationIterationCount": true, "animationName": true, "animationPlayState": true, "animationTimingFunction": true, "appearance": true, "userSelect": true, "fontKerning": true, "textEmphasisPosition": true, "textEmphasis": true, "textEmphasisStyle": true, "textEmphasisColor": true, "boxDecorationBreak": true, "clipPath": true, "maskImage": true, "maskMode": true, "maskRepeat": true, "maskPosition": true, "maskClip": true, "maskOrigin": true, "maskSize": true, "maskComposite": true, "mask": true, "maskBorderSource": true, "maskBorderMode": true, "maskBorderSlice": true, "maskBorderWidth": true, "maskBorderOutset": true, "maskBorderRepeat": true, "maskBorder": true, "maskType": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "filter": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true, "flex": true, "flexBasis": true, "flexDirection": true, "flexGrow": true, "flexFlow": true, "flexShrink": true, "flexWrap": true, "alignContent": true, "alignItems": true, "alignSelf": true, "justifyContent": true, "order": true, "transition": true, "transitionDelay": true, "transitionDuration": true, "transitionProperty": true, "transitionTimingFunction": true, "backdropFilter": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "shapeImageThreshold": true, "shapeImageMargin": true, "shapeImageOutside": true, "hyphens": true, "flowInto": true, "flowFrom": true, "regionFragment": true, "textSizeAdjust": true, "borderImage": true, "borderImageOutset": true, "borderImageRepeat": true, "borderImageSlice": true, "borderImageSource": true, "borderImageWidth": true, "tabSize": true, "objectFit": true, "objectPosition": true }, "Moz": { "appearance": true, "userSelect": true, "boxSizing": true, "textAlignLast": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "tabSize": true, "hyphens": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true }, "ms": { "flex": true, "flexBasis": false, "flexDirection": true, "flexGrow": false, "flexFlow": true, "flexShrink": false, "flexWrap": true, "alignContent": false, "alignItems": false, "alignSelf": false, "justifyContent": false, "order": false, "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "userSelect": true, "wrapFlow": true, "wrapThrough": true, "wrapMargin": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "touchAction": true, "hyphens": true, "flowInto": true, "flowFrom": true, "breakBefore": true, "breakAfter": true, "breakInside": true, "regionFragment": true, "gridTemplateColumns": true, "gridTemplateRows": true, "gridTemplateAreas": true, "gridTemplate": true, "gridAutoColumns": true, "gridAutoRows": true, "gridAutoFlow": true, "grid": true, "gridRowStart": true, "gridColumnStart": true, "gridRowEnd": true, "gridRow": true, "gridColumn": true, "gridColumnEnd": true, "gridColumnGap": true, "gridRowGap": true, "gridArea": true, "gridGap": true, "textSizeAdjust": true } };
  module.exports = exports["default"];
  });

  var require$$0$2 = (prefixProps && typeof prefixProps === 'object' && 'default' in prefixProps ? prefixProps['default'] : prefixProps);

  var isPrefixedValue = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  exports['default'] = function (value) {
    if (Array.isArray(value)) value = value.join(',');

    return value.match(/-webkit-|-moz-|-ms-/) !== null;
  };

  module.exports = exports['default'];
  });

  var require$$0$3 = (isPrefixedValue && typeof isPrefixedValue === 'object' && 'default' in isPrefixedValue ? isPrefixedValue['default'] : isPrefixedValue);

  var capitalizeString = __commonjs(function (module, exports) {
  // helper to capitalize strings
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports["default"] = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  module.exports = exports["default"];
  });

  var require$$2$1 = (capitalizeString && typeof capitalizeString === 'object' && 'default' in capitalizeString ? capitalizeString['default'] : capitalizeString);

  var transition = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = transition;

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  var _utilsCamelToDashCase = require$$0$1;

  var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

  var _utilsCapitalizeString = require$$2$1;

  var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

  var _utilsIsPrefixedValue = require$$0$3;

  var _utilsIsPrefixedValue2 = _interopRequireDefault(_utilsIsPrefixedValue);

  var _prefixProps = require$$0$2;

  var _prefixProps2 = _interopRequireDefault(_prefixProps);

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
      var webkitOutput = outputValue.split(',').filter(function (value) {
        return value.match(/-moz-|-ms-/) === null;
      }).join(',');

      // if the property is already prefixed
      if (property.indexOf('Webkit') > -1) {
        return _defineProperty({}, property, webkitOutput);
      }

      return _ref2 = {}, _defineProperty(_ref2, 'Webkit' + (0, _utilsCapitalizeString2['default'])(property), webkitOutput), _defineProperty(_ref2, property, outputValue), _ref2;
    }
  }

  function prefixValue(value) {
    if ((0, _utilsIsPrefixedValue2['default'])(value)) {
      return value;
    }

    // only split multi values, not cubic beziers
    var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

    // iterate each single value and check for transitioned properties
    // that need to be prefixed as well
    multipleValues.forEach(function (val, index) {
      multipleValues[index] = Object.keys(_prefixProps2['default']).reduce(function (out, prefix) {
        var dashCasePrefix = '-' + prefix.toLowerCase() + '-';

        Object.keys(_prefixProps2['default'][prefix]).forEach(function (prop) {
          var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(prop);

          if (val.indexOf(dashCaseProperty) > -1) {
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

  var joinPrefixedRules = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }

  var _camelToDashCase = require$$0$1;

  var _camelToDashCase2 = _interopRequireDefault(_camelToDashCase);

  // returns a style object with a single concated prefixed value string

  exports['default'] = function (property, value) {
    var replacer = arguments.length <= 2 || arguments[2] === undefined ? function (prefix, value) {
      return prefix + value;
    } : arguments[2];
    return function () {
      return _defineProperty({}, property, ['-webkit-', '-moz-', ''].map(function (prefix) {
        return replacer(prefix, value);
      }));
    }();
  };

  module.exports = exports['default'];
  });

  var require$$1$1 = (joinPrefixedRules && typeof joinPrefixedRules === 'object' && 'default' in joinPrefixedRules ? joinPrefixedRules['default'] : joinPrefixedRules);

  var gradient = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = gradient;

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
  }

  var _utilsJoinPrefixedRules = require$$1$1;

  var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

  var _utilsIsPrefixedValue = require$$0$3;

  var _utilsIsPrefixedValue2 = _interopRequireDefault(_utilsIsPrefixedValue);

  var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

  function gradient(property, value) {
    if (typeof value === 'string' && value.match(values) !== null) {
      if ((0, _utilsIsPrefixedValue2['default'])(value)) return;

      return (0, _utilsJoinPrefixedRules2['default'])(property, value);
    }
  }

  module.exports = exports['default'];
  });

  var require$$3 = (gradient && typeof gradient === 'object' && 'default' in gradient ? gradient['default'] : gradient);

  var sizing = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = sizing;

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
  }

  var _utilsJoinPrefixedRules = require$$1$1;

  var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

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
      return (0, _utilsJoinPrefixedRules2['default'])(property, value);
    }
  }

  module.exports = exports['default'];
  });

  var require$$4 = (sizing && typeof sizing === 'object' && 'default' in sizing ? sizing['default'] : sizing);

  var flex = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = flex;

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
  }

  var _utilsCamelToDashCase = require$$0$1;

  var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

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

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = cursor;

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
  }

  var _utilsJoinPrefixedRules = require$$1$1;

  var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

  var values = {
    'zoom-in': true,
    'zoom-out': true,
    'grab': true,
    'grabbing': true
  };

  function cursor(property, value) {
    if (property === 'cursor' && values[value]) {
      return (0, _utilsJoinPrefixedRules2['default'])(property, value);
    }
  }

  module.exports = exports['default'];
  });

  var require$$6 = (cursor && typeof cursor === 'object' && 'default' in cursor ? cursor['default'] : cursor);

  var calc = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = calc;

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
  }

  var _utilsJoinPrefixedRules = require$$1$1;

  var _utilsJoinPrefixedRules2 = _interopRequireDefault(_utilsJoinPrefixedRules);

  var _utilsIsPrefixedValue = require$$0$3;

  var _utilsIsPrefixedValue2 = _interopRequireDefault(_utilsIsPrefixedValue);

  function calc(property, value) {
    if (typeof value === 'string' && value.indexOf('calc(') > -1) {
      if ((0, _utilsIsPrefixedValue2['default'])(value)) return;

      return (0, _utilsJoinPrefixedRules2['default'])(property, value, function (prefix, value) {
        return value.replace(/calc\(/g, prefix + 'calc(');
      });
    }
  }

  module.exports = exports['default'];
  });

  var require$$7 = (calc && typeof calc === 'object' && 'default' in calc ? calc['default'] : calc);

  var assign = __commonjs(function (module, exports) {
  // leight polyfill for Object.assign
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports["default"] = function (base) {
    var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    return Object.keys(extend).reduce(function (out, key) {
      base[key] = extend[key];
      return out;
    }, {});
  };

  module.exports = exports["default"];
  });

  var require$$8 = (assign && typeof assign === 'object' && 'default' in assign ? assign['default'] : assign);

  var prefixAll = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = prefixAll;

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
  }

  var _prefixProps = require$$0$2;

  var _prefixProps2 = _interopRequireDefault(_prefixProps);

  var _utilsCapitalizeString = require$$2$1;

  var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

  var _utilsAssign = require$$8;

  var _utilsAssign2 = _interopRequireDefault(_utilsAssign);

  var _pluginsCalc = require$$7;

  var _pluginsCalc2 = _interopRequireDefault(_pluginsCalc);

  var _pluginsCursor = require$$6;

  var _pluginsCursor2 = _interopRequireDefault(_pluginsCursor);

  var _pluginsFlex = require$$5;

  var _pluginsFlex2 = _interopRequireDefault(_pluginsFlex);

  var _pluginsSizing = require$$4;

  var _pluginsSizing2 = _interopRequireDefault(_pluginsSizing);

  var _pluginsGradient = require$$3;

  var _pluginsGradient2 = _interopRequireDefault(_pluginsGradient);

  var _pluginsTransition = require$$2;

  var _pluginsTransition2 = _interopRequireDefault(_pluginsTransition);

  // special flexbox specifications

  var _pluginsFlexboxIE = require$$1;

  var _pluginsFlexboxIE2 = _interopRequireDefault(_pluginsFlexboxIE);

  var _pluginsFlexboxOld = require$$0;

  var _pluginsFlexboxOld2 = _interopRequireDefault(_pluginsFlexboxOld);

  var plugins = [_pluginsCalc2['default'], _pluginsCursor2['default'], _pluginsSizing2['default'], _pluginsGradient2['default'], _pluginsTransition2['default'], _pluginsFlexboxIE2['default'], _pluginsFlexboxOld2['default'], _pluginsFlex2['default']];

  /**
   * Returns a prefixed version of the style object using all vendor prefixes
   * @param {Object} styles - Style object that gets prefixed properties added
   * @returns {Object} - Style object with prefixed properties and values
   */

  function prefixAll(styles) {
    return Object.keys(styles).reduce(function (prefixedStyles, property) {
      var value = styles[property];
      if (value instanceof Object && !Array.isArray(value)) {
        // recurse through nested style objects
        prefixedStyles[property] = prefixAll(value);
      } else {
        Object.keys(_prefixProps2['default']).forEach(function (prefix) {
          var properties = _prefixProps2['default'][prefix];
          // add prefixes if needed
          if (properties[property]) {
            prefixedStyles[prefix + (0, _utilsCapitalizeString2['default'])(property)] = value;
          }
        });

        // resolve every special plugins
        plugins.forEach(function (plugin) {
          return (0, _utilsAssign2['default'])(prefixedStyles, plugin(property, value));
        });
      }

      return prefixedStyles;
    }, styles);
  }

  module.exports = exports['default'];
  });

  var prefix = (prefixAll && typeof prefixAll === 'object' && 'default' in prefixAll ? prefixAll['default'] : prefixAll);

  var prefixer = (function () {
    return function (style) {
      return prefix(style);
    };
  })

  return prefixer;

}));
//# sourceMappingURL=fela-plugin-prefixer.js.map