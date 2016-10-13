(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.FelaPluginPrefixer = factory());
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

    function hyphenateStyleName(string) {
        return string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
    }

    module.exports = hyphenateStyleName;
    });

    var require$$3 = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);

    var transition = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = transition;

    var _hyphenateStyleName = require$$3;

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

    var require$$3$1 = (gradient && typeof gradient === 'object' && 'default' in gradient ? gradient['default'] : gradient);

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

    var _calc = require$$7;

    var _calc2 = _interopRequireDefault(_calc);

    var _cursor = require$$6;

    var _cursor2 = _interopRequireDefault(_cursor);

    var _flex = require$$5;

    var _flex2 = _interopRequireDefault(_flex);

    var _sizing = require$$4;

    var _sizing2 = _interopRequireDefault(_sizing);

    var _gradient = require$$3$1;

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


    var plugins = [_calc2.default, _cursor2.default, _sizing2.default, _gradient2.default, _transition2.default, _flexboxIE2.default, _flexboxOld2.default, _flex2.default];

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

      return styles;
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

    var prefixer = (function () {
      return function (style) {
        return prefix(style);
      };
    });

    return prefixer;

}));
//# sourceMappingURL=fela-plugin-prefixer.js.map