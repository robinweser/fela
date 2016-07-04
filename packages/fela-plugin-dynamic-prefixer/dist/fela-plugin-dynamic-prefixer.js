(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.FelaPluginDynamicPrefixer = factory());
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
      wrap: 'multiple',
      flex: 'box',
      'inline-flex': 'inline-box'
    };

    var alternativeProps = {
      alignItems: 'WebkitBoxAlign',
      justifyContent: 'WebkitBoxPack',
      flexWrap: 'WebkitBoxLines'
    };

    var otherProps = ['alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection'];

    var properties = Object.keys(alternativeProps).concat(otherProps).reduce(function (result, prop) {
      result[prop] = true;
      return result;
    }, {});

    function flexboxOld(_ref) {
      var property = _ref.property;
      var value = _ref.value;
      var styles = _ref.styles;
      var _ref$browserInfo = _ref.browserInfo;
      var browser = _ref$browserInfo.browser;
      var version = _ref$browserInfo.version;
      var css = _ref.prefix.css;
      var keepUnprefixed = _ref.keepUnprefixed;

      if ((properties[property] || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browser === 'firefox' && version < 22 || browser === 'chrome' && version < 21 || (browser === 'safari' || browser === 'ios_saf') && version <= 6.1 || browser === 'android' && version < 4.4 || browser === 'and_uc')) {
        if (!keepUnprefixed) {
          delete styles[property];
        }
        if (property === 'flexDirection') {
          return {
            WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
            WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
          };
        }
        if (property === 'display' && alternativeValues[value]) {
          var prefixedValue = css + alternativeValues[value];
          return {
            display: keepUnprefixed ? [prefixedValue, value] : prefixedValue
          };
        }
        if (alternativeProps[property]) {
          return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
        }
      }
    }
    module.exports = exports['default'];
    });

    var require$$0 = (flexboxOld && typeof flexboxOld === 'object' && 'default' in flexboxOld ? flexboxOld['default'] : flexboxOld);

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
      'flex-end': 'end',
      flex: 'flexbox',
      'inline-flex': 'inline-flexbox'
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

    var properties = Object.keys(alternativeProps).reduce(function (result, prop) {
      result[prop] = true;
      return result;
    }, {});

    function flexboxIE(_ref) {
      var property = _ref.property;
      var value = _ref.value;
      var styles = _ref.styles;
      var _ref$browserInfo = _ref.browserInfo;
      var browser = _ref$browserInfo.browser;
      var version = _ref$browserInfo.version;
      var css = _ref.prefix.css;
      var keepUnprefixed = _ref.keepUnprefixed;

      if ((properties[property] || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browser === 'ie_mob' || browser === 'ie') && version == 10) {
        if (!keepUnprefixed) {
          delete styles[property];
        }
        if (property === 'display' && alternativeValues[value]) {
          var prefixedValue = css + alternativeValues[value];
          return {
            display: keepUnprefixed ? [prefixedValue, value] : prefixedValue
          };
        }
        if (alternativeProps[property]) {
          return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
        }
      }
    }
    module.exports = exports['default'];
    });

    var require$$1 = (flexboxIE && typeof flexboxIE === 'object' && 'default' in flexboxIE ? flexboxIE['default'] : flexboxIE);

    var unprefixProperty = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (property) {
      var unprefixed = property.replace(/^(ms|Webkit|Moz|O)/, '');
      return unprefixed.charAt(0).toLowerCase() + unprefixed.slice(1);
    };

    module.exports = exports['default'];
    });

    var require$$0$1 = (unprefixProperty && typeof unprefixProperty === 'object' && 'default' in unprefixProperty ? unprefixProperty['default'] : unprefixProperty);

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

    var _typeof = typeof Symbol === "function" && babelHelpers.typeof(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : babelHelpers.typeof(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : babelHelpers.typeof(obj);
    };

    exports.default = transition;

    var _hyphenateStyleName = require$$3;

    var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

    var _capitalizeString = require$$2$1;

    var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

    var _unprefixProperty = require$$0$1;

    var _unprefixProperty2 = _interopRequireDefault(_unprefixProperty);

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

    var properties = { transition: true, transitionProperty: true };

    function transition(_ref) {
      var property = _ref.property;
      var value = _ref.value;
      var css = _ref.prefix.css;
      var requiresPrefix = _ref.requiresPrefix;
      var keepUnprefixed = _ref.keepUnprefixed;

      // also check for already prefixed transitions
      var unprefixedProperty = (0, _unprefixProperty2.default)(property);

      if (typeof value === 'string' && properties[unprefixedProperty]) {
        var _ret = function () {
          var requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (prop) {
            return (0, _hyphenateStyleName2.default)(prop);
          });

          // only split multi values, not cubic beziers
          var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

          requiresPrefixDashCased.forEach(function (prop) {
            multipleValues.forEach(function (val, index) {
              if (val.indexOf(prop) > -1 && prop !== 'order') {
                multipleValues[index] = val.replace(prop, css + prop) + (keepUnprefixed ? ',' + val : '');
              }
            });
          });

          return {
            v: _defineProperty({}, property, multipleValues.join(','))
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    }
    module.exports = exports['default'];
    });

    var require$$2 = (transition && typeof transition === 'object' && 'default' in transition ? transition['default'] : transition);

    var gradient = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = gradient;

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }return obj;
    }

    var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

    function gradient(_ref) {
      var property = _ref.property;
      var value = _ref.value;
      var _ref$browserInfo = _ref.browserInfo;
      var browser = _ref$browserInfo.browser;
      var version = _ref$browserInfo.version;
      var css = _ref.prefix.css;
      var keepUnprefixed = _ref.keepUnprefixed;

      if (typeof value === 'string' && value.match(values) !== null && (browser === 'firefox' && version < 16 || browser === 'chrome' && version < 26 || (browser === 'safari' || browser === 'ios_saf') && version < 7 || (browser === 'opera' || browser === 'op_mini') && version < 12.1 || browser === 'android' && version < 4.4 || browser === 'and_uc')) {
        var prefixedValue = css + value;
        return _defineProperty({}, property, keepUnprefixed ? [prefixedValue, value] : prefixedValue);
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

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }return obj;
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

    function sizing(_ref) {
      var property = _ref.property;
      var value = _ref.value;
      var css = _ref.prefix.css;
      var keepUnprefixed = _ref.keepUnprefixed;

      // This might change in the future
      // Keep an eye on it
      if (properties[property] && values[value]) {
        var prefixedValue = css + value;
        return _defineProperty({}, property, keepUnprefixed ? [prefixedValue, value] : prefixedValue);
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

    function flex(_ref) {
      var property = _ref.property;
      var value = _ref.value;
      var _ref$browserInfo = _ref.browserInfo;
      var browser = _ref$browserInfo.browser;
      var version = _ref$browserInfo.version;
      var css = _ref.prefix.css;
      var keepUnprefixed = _ref.keepUnprefixed;

      if (property === 'display' && values[value] && (browser === 'chrome' && version < 29 && version > 20 || (browser === 'safari' || browser === 'ios_saf') && version < 9 && version > 6 || browser === 'opera' && (version == 15 || version == 16))) {
        var prefixedValue = css + value;
        return {
          display: keepUnprefixed ? [prefixedValue, value] : prefixedValue
        };
      }
    }
    module.exports = exports['default'];
    });

    var require$$5 = (flex && typeof flex === 'object' && 'default' in flex ? flex['default'] : flex);

    var grabCursor = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = grabCursor;
    var values = { grab: true, grabbing: true };

    function grabCursor(_ref) {
      var property = _ref.property;
      var value = _ref.value;
      var _ref$browserInfo = _ref.browserInfo;
      var browser = _ref$browserInfo.browser;
      var version = _ref$browserInfo.version;
      var css = _ref.prefix.css;
      var keepUnprefixed = _ref.keepUnprefixed;

      // adds prefixes for firefox, chrome, safari, and opera regardless of version until a reliable brwoser support info can be found (see: https://github.com/rofrischmann/inline-style-prefixer/issues/79)
      if (property === 'cursor' && values[value] && (browser === 'firefox' || browser === 'chrome' || browser === 'safari' || browser === 'opera')) {
        var prefixedValue = css + value;
        return {
          cursor: keepUnprefixed ? [prefixedValue, value] : prefixedValue
        };
      }
    }
    module.exports = exports['default'];
    });

    var require$$6 = (grabCursor && typeof grabCursor === 'object' && 'default' in grabCursor ? grabCursor['default'] : grabCursor);

    var zoomCursor = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = zoomCursor;
    var values = { 'zoom-in': true, 'zoom-out': true };

    function zoomCursor(_ref) {
      var property = _ref.property;
      var value = _ref.value;
      var _ref$browserInfo = _ref.browserInfo;
      var browser = _ref$browserInfo.browser;
      var version = _ref$browserInfo.version;
      var css = _ref.prefix.css;
      var keepUnprefixed = _ref.keepUnprefixed;

      if (property === 'cursor' && values[value] && (browser === 'firefox' && version < 24 || browser === 'chrome' && version < 37 || browser === 'safari' && version < 9 || browser === 'opera' && version < 24)) {
        var prefixedValue = css + value;
        return {
          cursor: keepUnprefixed ? [prefixedValue, value] : prefixedValue
        };
      }
    }
    module.exports = exports['default'];
    });

    var require$$7 = (zoomCursor && typeof zoomCursor === 'object' && 'default' in zoomCursor ? zoomCursor['default'] : zoomCursor);

    var calc = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = calc;

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }return obj;
    }

    function calc(_ref) {
      var property = _ref.property;
      var value = _ref.value;
      var _ref$browserInfo = _ref.browserInfo;
      var browser = _ref$browserInfo.browser;
      var version = _ref$browserInfo.version;
      var css = _ref.prefix.css;
      var keepUnprefixed = _ref.keepUnprefixed;

      if (typeof value === 'string' && value.indexOf('calc(') > -1 && (browser === 'firefox' && version < 15 || browser === 'chrome' && version < 25 || browser === 'safari' && version < 6.1 || browser === 'ios_saf' && version < 7)) {
        var prefixedValue = value.replace(/calc\(/g, css + 'calc(');
        return _defineProperty({}, property, keepUnprefixed ? [prefixedValue, value] : prefixedValue);
      }
    }
    module.exports = exports['default'];
    });

    var require$$8 = (calc && typeof calc === 'object' && 'default' in calc ? calc['default'] : calc);

    var prefixProps = __commonjs(function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = { "chrome": { "transform": 35, "transformOrigin": 35, "transformOriginX": 35, "transformOriginY": 35, "backfaceVisibility": 35, "perspective": 35, "perspectiveOrigin": 35, "transformStyle": 35, "transformOriginZ": 35, "animation": 42, "animationDelay": 42, "animationDirection": 42, "animationFillMode": 42, "animationDuration": 42, "animationIterationCount": 42, "animationName": 42, "animationPlayState": 42, "animationTimingFunction": 42, "appearance": 54, "userSelect": 54, "fontKerning": 32, "textEmphasisPosition": 54, "textEmphasis": 54, "textEmphasisStyle": 54, "textEmphasisColor": 54, "boxDecorationBreak": 54, "clipPath": 54, "maskImage": 54, "maskMode": 54, "maskRepeat": 54, "maskPosition": 54, "maskClip": 54, "maskOrigin": 54, "maskSize": 54, "maskComposite": 54, "mask": 54, "maskBorderSource": 54, "maskBorderMode": 54, "maskBorderSlice": 54, "maskBorderWidth": 54, "maskBorderOutset": 54, "maskBorderRepeat": 54, "maskBorder": 54, "maskType": 54, "textDecorationStyle": 54, "textDecorationSkip": 54, "textDecorationLine": 54, "textDecorationColor": 54, "filter": 54, "fontFeatureSettings": 47, "breakAfter": 49, "breakBefore": 49, "breakInside": 49, "columnCount": 49, "columnFill": 49, "columnGap": 49, "columnRule": 49, "columnRuleColor": 49, "columnRuleStyle": 49, "columnRuleWidth": 49, "columns": 49, "columnSpan": 49, "columnWidth": 49 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 10, "userSelect": 10, "backdropFilter": 10, "fontKerning": 9, "scrollSnapType": 10, "scrollSnapPointsX": 10, "scrollSnapPointsY": 10, "scrollSnapDestination": 10, "scrollSnapCoordinate": 10, "textEmphasisPosition": 7, "textEmphasis": 7, "textEmphasisStyle": 7, "textEmphasisColor": 7, "boxDecorationBreak": 10, "clipPath": 10, "maskImage": 10, "maskMode": 10, "maskRepeat": 10, "maskPosition": 10, "maskClip": 10, "maskOrigin": 10, "maskSize": 10, "maskComposite": 10, "mask": 10, "maskBorderSource": 10, "maskBorderMode": 10, "maskBorderSlice": 10, "maskBorderWidth": 10, "maskBorderOutset": 10, "maskBorderRepeat": 10, "maskBorder": 10, "maskType": 10, "textDecorationStyle": 10, "textDecorationSkip": 10, "textDecorationLine": 10, "textDecorationColor": 10, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 10, "flowInto": 10, "flowFrom": 10, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 10, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8 }, "firefox": { "appearance": 50, "userSelect": 50, "boxSizing": 28, "textAlignLast": 48, "textDecorationStyle": 35, "textDecorationSkip": 35, "textDecorationLine": 35, "textDecorationColor": 35, "tabSize": 50, "hyphens": 42, "fontFeatureSettings": 33, "breakAfter": 50, "breakBefore": 50, "breakInside": 50, "columnCount": 50, "columnFill": 50, "columnGap": 50, "columnRule": 50, "columnRuleColor": 50, "columnRuleStyle": 50, "columnRuleWidth": 50, "columns": 50, "columnSpan": 50, "columnWidth": 50 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 40, "userSelect": 40, "fontKerning": 19, "textEmphasisPosition": 40, "textEmphasis": 40, "textEmphasisStyle": 40, "textEmphasisColor": 40, "boxDecorationBreak": 40, "clipPath": 40, "maskImage": 40, "maskMode": 40, "maskRepeat": 40, "maskPosition": 40, "maskClip": 40, "maskOrigin": 40, "maskSize": 40, "maskComposite": 40, "mask": 40, "maskBorderSource": 40, "maskBorderMode": 40, "maskBorderSlice": 40, "maskBorderWidth": 40, "maskBorderOutset": 40, "maskBorderRepeat": 40, "maskBorder": 40, "maskType": 40, "textDecorationStyle": 40, "textDecorationSkip": 40, "textDecorationLine": 40, "textDecorationColor": 40, "filter": 40, "fontFeatureSettings": 34, "breakAfter": 36, "breakBefore": 36, "breakInside": 36, "columnCount": 36, "columnFill": 36, "columnGap": 36, "columnRule": 36, "columnRuleColor": 36, "columnRuleStyle": 36, "columnRuleWidth": 36, "columns": 36, "columnSpan": 36, "columnWidth": 36 }, "ie": { "flex": 10, "flexDirection": 10, "flexFlow": 10, "flexWrap": 10, "transform": 9, "transformOrigin": 9, "transformOriginX": 9, "transformOriginY": 9, "userSelect": 11, "wrapFlow": 11, "wrapThrough": 11, "wrapMargin": 11, "scrollSnapType": 11, "scrollSnapPointsX": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapCoordinate": 11, "touchAction": 10, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "gridTemplateColumns": 11, "gridTemplateRows": 11, "gridTemplateAreas": 11, "gridTemplate": 11, "gridAutoColumns": 11, "gridAutoRows": 11, "gridAutoFlow": 11, "grid": 11, "gridRowStart": 11, "gridColumnStart": 11, "gridRowEnd": 11, "gridRow": 11, "gridColumn": 11, "gridColumnEnd": 11, "gridColumnGap": 11, "gridRowGap": 11, "gridArea": 11, "gridGap": 11, "textSizeAdjust": 11 }, "edge": { "userSelect": 14, "wrapFlow": 14, "wrapThrough": 14, "wrapMargin": 14, "scrollSnapType": 14, "scrollSnapPointsX": 14, "scrollSnapPointsY": 14, "scrollSnapDestination": 14, "scrollSnapCoordinate": 14, "hyphens": 14, "flowInto": 14, "flowFrom": 14, "breakBefore": 14, "breakAfter": 14, "breakInside": 14, "regionFragment": 14, "gridTemplateColumns": 14, "gridTemplateRows": 14, "gridTemplateAreas": 14, "gridTemplate": 14, "gridAutoColumns": 14, "gridAutoRows": 14, "gridAutoFlow": 14, "grid": 14, "gridRowStart": 14, "gridColumnStart": 14, "gridRowEnd": 14, "gridRow": 14, "gridColumn": 14, "gridColumnEnd": 14, "gridColumnGap": 14, "gridRowGap": 14, "gridArea": 14, "gridGap": 14 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 9.3, "userSelect": 9.3, "backdropFilter": 9.3, "fontKerning": 9.3, "scrollSnapType": 9.3, "scrollSnapPointsX": 9.3, "scrollSnapPointsY": 9.3, "scrollSnapDestination": 9.3, "scrollSnapCoordinate": 9.3, "boxDecorationBreak": 9.3, "clipPath": 9.3, "maskImage": 9.3, "maskMode": 9.3, "maskRepeat": 9.3, "maskPosition": 9.3, "maskClip": 9.3, "maskOrigin": 9.3, "maskSize": 9.3, "maskComposite": 9.3, "mask": 9.3, "maskBorderSource": 9.3, "maskBorderMode": 9.3, "maskBorderSlice": 9.3, "maskBorderWidth": 9.3, "maskBorderOutset": 9.3, "maskBorderRepeat": 9.3, "maskBorder": 9.3, "maskType": 9.3, "textSizeAdjust": 9.3, "textDecorationStyle": 9.3, "textDecorationSkip": 9.3, "textDecorationLine": 9.3, "textDecorationColor": 9.3, "shapeImageThreshold": 9.3, "shapeImageMargin": 9.3, "shapeImageOutside": 9.3, "filter": 9, "hyphens": 9.3, "flowInto": 9.3, "flowFrom": 9.3, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 9.3, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1 }, "android": { "borderImage": 4.2, "borderImageOutset": 4.2, "borderImageRepeat": 4.2, "borderImageSlice": 4.2, "borderImageSource": 4.2, "borderImageWidth": 4.2, "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 50, "userSelect": 50, "fontKerning": 4.4, "textEmphasisPosition": 50, "textEmphasis": 50, "textEmphasisStyle": 50, "textEmphasisColor": 50, "boxDecorationBreak": 50, "clipPath": 50, "maskImage": 50, "maskMode": 50, "maskRepeat": 50, "maskPosition": 50, "maskClip": 50, "maskOrigin": 50, "maskSize": 50, "maskComposite": 50, "mask": 50, "maskBorderSource": 50, "maskBorderMode": 50, "maskBorderSlice": 50, "maskBorderWidth": 50, "maskBorderOutset": 50, "maskBorderRepeat": 50, "maskBorder": 50, "maskType": 50, "filter": 50, "fontFeatureSettings": 4.4, "breakAfter": 50, "breakBefore": 50, "breakInside": 50, "columnCount": 50, "columnFill": 50, "columnGap": 50, "columnRule": 50, "columnRuleColor": 50, "columnRuleStyle": 50, "columnRuleWidth": 50, "columns": 50, "columnSpan": 50, "columnWidth": 50 }, "and_chr": { "appearance": 50, "userSelect": 50, "textEmphasisPosition": 50, "textEmphasis": 50, "textEmphasisStyle": 50, "textEmphasisColor": 50, "boxDecorationBreak": 50, "clipPath": 50, "maskImage": 50, "maskMode": 50, "maskRepeat": 50, "maskPosition": 50, "maskClip": 50, "maskOrigin": 50, "maskSize": 50, "maskComposite": 50, "mask": 50, "maskBorderSource": 50, "maskBorderMode": 50, "maskBorderSlice": 50, "maskBorderWidth": 50, "maskBorderOutset": 50, "maskBorderRepeat": 50, "maskBorder": 50, "maskType": 50, "textDecorationStyle": 50, "textDecorationSkip": 50, "textDecorationLine": 50, "textDecorationColor": 50, "filter": 50, "fontFeatureSettings": 50 }, "and_uc": { "flex": 9.9, "flexBasis": 9.9, "flexDirection": 9.9, "flexGrow": 9.9, "flexFlow": 9.9, "flexShrink": 9.9, "flexWrap": 9.9, "alignContent": 9.9, "alignItems": 9.9, "alignSelf": 9.9, "justifyContent": 9.9, "order": 9.9, "transition": 9.9, "transitionDelay": 9.9, "transitionDuration": 9.9, "transitionProperty": 9.9, "transitionTimingFunction": 9.9, "transform": 9.9, "transformOrigin": 9.9, "transformOriginX": 9.9, "transformOriginY": 9.9, "backfaceVisibility": 9.9, "perspective": 9.9, "perspectiveOrigin": 9.9, "transformStyle": 9.9, "transformOriginZ": 9.9, "animation": 9.9, "animationDelay": 9.9, "animationDirection": 9.9, "animationFillMode": 9.9, "animationDuration": 9.9, "animationIterationCount": 9.9, "animationName": 9.9, "animationPlayState": 9.9, "animationTimingFunction": 9.9, "appearance": 9.9, "userSelect": 9.9, "fontKerning": 9.9, "textEmphasisPosition": 9.9, "textEmphasis": 9.9, "textEmphasisStyle": 9.9, "textEmphasisColor": 9.9, "maskImage": 9.9, "maskMode": 9.9, "maskRepeat": 9.9, "maskPosition": 9.9, "maskClip": 9.9, "maskOrigin": 9.9, "maskSize": 9.9, "maskComposite": 9.9, "mask": 9.9, "maskBorderSource": 9.9, "maskBorderMode": 9.9, "maskBorderSlice": 9.9, "maskBorderWidth": 9.9, "maskBorderOutset": 9.9, "maskBorderRepeat": 9.9, "maskBorder": 9.9, "maskType": 9.9, "textSizeAdjust": 9.9, "filter": 9.9, "hyphens": 9.9, "flowInto": 9.9, "flowFrom": 9.9, "breakBefore": 9.9, "breakAfter": 9.9, "breakInside": 9.9, "regionFragment": 9.9, "fontFeatureSettings": 9.9, "columnCount": 9.9, "columnFill": 9.9, "columnGap": 9.9, "columnRule": 9.9, "columnRuleColor": 9.9, "columnRuleStyle": 9.9, "columnRuleWidth": 9.9, "columns": 9.9, "columnSpan": 9.9, "columnWidth": 9.9 }, "op_mini": { "borderImage": 5, "borderImageOutset": 5, "borderImageRepeat": 5, "borderImageSlice": 5, "borderImageSource": 5, "borderImageWidth": 5, "tabSize": 5, "objectFit": 5, "objectPosition": 5 } };
    module.exports = exports["default"];
    });

    var require$$9 = (prefixProps && typeof prefixProps === 'object' && 'default' in prefixProps ? prefixProps['default'] : prefixProps);

    var assign = __commonjs(function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    // light polyfill for Object.assign

    exports.default = function (base) {
      var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      return Object.keys(extend).reduce(function (out, key) {
        out[key] = extend[key];
        return out;
      }, base);
    };

    module.exports = exports["default"];
    });

    var require$$8$1 = (assign && typeof assign === 'object' && 'default' in assign ? assign['default'] : assign);

    var getPrefixedKeyframes = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (_ref) {
      var browser = _ref.browser;
      var version = _ref.version;
      var prefix = _ref.prefix;

      var prefixedKeyframes = 'keyframes';

      if (browser === 'chrome' && version < 43 || (browser === 'safari' || browser === 'ios_saf') && version < 9 || browser === 'opera' && version < 30 || browser === 'android' && version <= 4.4 || browser === 'and_uc') {
        prefixedKeyframes = prefix.css + prefixedKeyframes;
      }
      return prefixedKeyframes;
    };

    module.exports = exports['default'];
    });

    var require$$12 = (getPrefixedKeyframes && typeof getPrefixedKeyframes === 'object' && 'default' in getPrefixedKeyframes ? getPrefixedKeyframes['default'] : getPrefixedKeyframes);

    var bowser = __commonjs(function (module) {
    /*!
     * Bowser - a browser detector
     * https://github.com/ded/bowser
     * MIT License | (c) Dustin Diaz 2015
     */

    !function (name, definition) {
      if (typeof module != 'undefined' && module.exports) module.exports = definition();else if (typeof define == 'function' && define.amd) define(definition);else this[name] = definition();
    }('bowser', function () {
      /**
        * See useragents.js for examples of navigator.userAgent
        */

      var t = true;

      function detect(ua) {

        function getFirstMatch(regex) {
          var match = ua.match(regex);
          return match && match.length > 1 && match[1] || '';
        }

        function getSecondMatch(regex) {
          var match = ua.match(regex);
          return match && match.length > 1 && match[2] || '';
        }

        var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase(),
            likeAndroid = /like android/i.test(ua),
            android = !likeAndroid && /android/i.test(ua),
            nexusMobile = /nexus\s*[0-6]\s*/i.test(ua),
            nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua),
            chromeos = /CrOS/.test(ua),
            silk = /silk/i.test(ua),
            sailfish = /sailfish/i.test(ua),
            tizen = /tizen/i.test(ua),
            webos = /(web|hpw)os/i.test(ua),
            windowsphone = /windows phone/i.test(ua),
            windows = !windowsphone && /windows/i.test(ua),
            mac = !iosdevice && !silk && /macintosh/i.test(ua),
            linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua),
            edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i),
            versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i),
            tablet = /tablet/i.test(ua),
            mobile = !tablet && /[^-]mobi/i.test(ua),
            xbox = /xbox/i.test(ua),
            result;

        if (/opera|opr|opios/i.test(ua)) {
          result = {
            name: 'Opera',
            opera: t,
            version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
          };
        } else if (/coast/i.test(ua)) {
          result = {
            name: 'Opera Coast',
            coast: t,
            version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
          };
        } else if (/yabrowser/i.test(ua)) {
          result = {
            name: 'Yandex Browser',
            yandexbrowser: t,
            version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
          };
        } else if (/ucbrowser/i.test(ua)) {
          result = {
            name: 'UC Browser',
            ucbrowser: t,
            version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
          };
        } else if (/mxios/i.test(ua)) {
          result = {
            name: 'Maxthon',
            maxthon: t,
            version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
          };
        } else if (/epiphany/i.test(ua)) {
          result = {
            name: 'Epiphany',
            epiphany: t,
            version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
          };
        } else if (/puffin/i.test(ua)) {
          result = {
            name: 'Puffin',
            puffin: t,
            version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
          };
        } else if (/sleipnir/i.test(ua)) {
          result = {
            name: 'Sleipnir',
            sleipnir: t,
            version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
          };
        } else if (/k-meleon/i.test(ua)) {
          result = {
            name: 'K-Meleon',
            kMeleon: t,
            version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
          };
        } else if (windowsphone) {
          result = {
            name: 'Windows Phone',
            windowsphone: t
          };
          if (edgeVersion) {
            result.msedge = t;
            result.version = edgeVersion;
          } else {
            result.msie = t;
            result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
          }
        } else if (/msie|trident/i.test(ua)) {
          result = {
            name: 'Internet Explorer',
            msie: t,
            version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
          };
        } else if (chromeos) {
          result = {
            name: 'Chrome',
            chromeos: t,
            chromeBook: t,
            chrome: t,
            version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
          };
        } else if (/chrome.+? edge/i.test(ua)) {
          result = {
            name: 'Microsoft Edge',
            msedge: t,
            version: edgeVersion
          };
        } else if (/vivaldi/i.test(ua)) {
          result = {
            name: 'Vivaldi',
            vivaldi: t,
            version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
          };
        } else if (sailfish) {
          result = {
            name: 'Sailfish',
            sailfish: t,
            version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
          };
        } else if (/seamonkey\//i.test(ua)) {
          result = {
            name: 'SeaMonkey',
            seamonkey: t,
            version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
          };
        } else if (/firefox|iceweasel|fxios/i.test(ua)) {
          result = {
            name: 'Firefox',
            firefox: t,
            version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
          };
          if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
            result.firefoxos = t;
          }
        } else if (silk) {
          result = {
            name: 'Amazon Silk',
            silk: t,
            version: getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
          };
        } else if (/phantom/i.test(ua)) {
          result = {
            name: 'PhantomJS',
            phantom: t,
            version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
          };
        } else if (/slimerjs/i.test(ua)) {
          result = {
            name: 'SlimerJS',
            slimer: t,
            version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
          };
        } else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
          result = {
            name: 'BlackBerry',
            blackberry: t,
            version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
          };
        } else if (webos) {
          result = {
            name: 'WebOS',
            webos: t,
            version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
          };
          /touchpad\//i.test(ua) && (result.touchpad = t);
        } else if (/bada/i.test(ua)) {
          result = {
            name: 'Bada',
            bada: t,
            version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
          };
        } else if (tizen) {
          result = {
            name: 'Tizen',
            tizen: t,
            version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
          };
        } else if (/qupzilla/i.test(ua)) {
          result = {
            name: 'QupZilla',
            qupzilla: t,
            version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
          };
        } else if (/chromium/i.test(ua)) {
          result = {
            name: 'Chromium',
            chromium: t,
            version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
          };
        } else if (/chrome|crios|crmo/i.test(ua)) {
          result = {
            name: 'Chrome',
            chrome: t,
            version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
          };
        } else if (android) {
          result = {
            name: 'Android',
            version: versionIdentifier
          };
        } else if (/safari|applewebkit/i.test(ua)) {
          result = {
            name: 'Safari',
            safari: t
          };
          if (versionIdentifier) {
            result.version = versionIdentifier;
          }
        } else if (iosdevice) {
          result = {
            name: iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
          };
          // WTF: version is not part of user agent in web apps
          if (versionIdentifier) {
            result.version = versionIdentifier;
          }
        } else if (/googlebot/i.test(ua)) {
          result = {
            name: 'Googlebot',
            googlebot: t,
            version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
          };
        } else {
          result = {
            name: getFirstMatch(/^(.*)\/(.*) /),
            version: getSecondMatch(/^(.*)\/(.*) /)
          };
        }

        // set webkit or gecko flag for browsers based on these engines
        if (!result.msedge && /(apple)?webkit/i.test(ua)) {
          if (/(apple)?webkit\/537\.36/i.test(ua)) {
            result.name = result.name || "Blink";
            result.blink = t;
          } else {
            result.name = result.name || "Webkit";
            result.webkit = t;
          }
          if (!result.version && versionIdentifier) {
            result.version = versionIdentifier;
          }
        } else if (!result.opera && /gecko\//i.test(ua)) {
          result.name = result.name || "Gecko";
          result.gecko = t;
          result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
        }

        // set OS flags for platforms that have multiple browsers
        if (!result.msedge && (android || result.silk)) {
          result.android = t;
        } else if (iosdevice) {
          result[iosdevice] = t;
          result.ios = t;
        } else if (mac) {
          result.mac = t;
        } else if (xbox) {
          result.xbox = t;
        } else if (windows) {
          result.windows = t;
        } else if (linux) {
          result.linux = t;
        }

        // OS version extraction
        var osVersion = '';
        if (result.windowsphone) {
          osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
        } else if (iosdevice) {
          osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
          osVersion = osVersion.replace(/[_\s]/g, '.');
        } else if (android) {
          osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
        } else if (result.webos) {
          osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
        } else if (result.blackberry) {
          osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
        } else if (result.bada) {
          osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
        } else if (result.tizen) {
          osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
        }
        if (osVersion) {
          result.osversion = osVersion;
        }

        // device type extraction
        var osMajorVersion = osVersion.split('.')[0];
        if (tablet || nexusTablet || iosdevice == 'ipad' || android && (osMajorVersion == 3 || osMajorVersion >= 4 && !mobile) || result.silk) {
          result.tablet = t;
        } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || nexusMobile || result.blackberry || result.webos || result.bada) {
          result.mobile = t;
        }

        // Graded Browser Support
        // http://developer.yahoo.com/yui/articles/gbs
        if (result.msedge || result.msie && result.version >= 10 || result.yandexbrowser && result.version >= 15 || result.vivaldi && result.version >= 1.0 || result.chrome && result.version >= 20 || result.firefox && result.version >= 20.0 || result.safari && result.version >= 6 || result.opera && result.version >= 10.0 || result.ios && result.osversion && result.osversion.split(".")[0] >= 6 || result.blackberry && result.version >= 10.1 || result.chromium && result.version >= 20) {
          result.a = t;
        } else if (result.msie && result.version < 10 || result.chrome && result.version < 20 || result.firefox && result.version < 20.0 || result.safari && result.version < 6 || result.opera && result.version < 10.0 || result.ios && result.osversion && result.osversion.split(".")[0] < 6 || result.chromium && result.version < 20) {
          result.c = t;
        } else result.x = t;

        return result;
      }

      var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '');

      bowser.test = function (browserList) {
        for (var i = 0; i < browserList.length; ++i) {
          var browserItem = browserList[i];
          if (typeof browserItem === 'string') {
            if (browserItem in bowser) {
              return true;
            }
          }
        }
        return false;
      };

      /**
       * Get version precisions count
       *
       * @example
       *   getVersionPrecision("1.10.3") // 3
       *
       * @param  {string} version
       * @return {number}
       */
      function getVersionPrecision(version) {
        return version.split(".").length;
      }

      /**
       * Array::map polyfill
       *
       * @param  {Array} arr
       * @param  {Function} iterator
       * @return {Array}
       */
      function map(arr, iterator) {
        var result = [],
            i;
        if (Array.prototype.map) {
          return Array.prototype.map.call(arr, iterator);
        }
        for (i = 0; i < arr.length; i++) {
          result = iterator(arr[i]);
        }
        return result;
      }

      /**
       * Calculate browser version weight
       *
       * @example
       *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
       *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
       *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
       *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
       *
       * @param  {Array<String>} versions versions to compare
       * @return {Number} comparison result
       */
      function compareVersions(versions) {
        // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
        var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
        var chunks = map(versions, function (version) {
          var delta = precision - getVersionPrecision(version);

          // 2) "9" -> "9.0" (for precision = 2)
          version = version + new Array(delta + 1).join(".0");

          // 3) "9.0" -> ["000000000"", "000000009"]
          return map(version.split("."), function (chunk) {
            return new Array(20 - chunk.length).join("0") + chunk;
          }).reverse();
        });

        // iterate in reverse order by reversed chunks array
        while (--precision >= 0) {
          // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
          if (chunks[0][precision] > chunks[1][precision]) {
            return 1;
          } else if (chunks[0][precision] === chunks[1][precision]) {
            if (precision === 0) {
              // all version chunks are same
              return 0;
            }
          } else {
            return -1;
          }
        }
      }

      /**
       * Check if browser is unsupported
       *
       * @example
       *   bowser.isUnsupportedBrowser({
       *     msie: "10",
       *     firefox: "23",
       *     chrome: "29",
       *     safari: "5.1",
       *     opera: "16",
       *     phantom: "534"
       *   });
       *
       * @param  {Object}  minVersions map of minimal version to browser
       * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
       * @param  {String}  [ua] user agent string
       * @return {Boolean}
       */
      function isUnsupportedBrowser(minVersions, strictMode, ua) {
        var _bowser = bowser;

        // make strictMode param optional with ua param usage
        if (typeof strictMode === 'string') {
          ua = strictMode;
          strictMode = void 0;
        }

        if (strictMode === void 0) {
          strictMode = false;
        }
        if (ua) {
          _bowser = detect(ua);
        }

        var version = "" + _bowser.version;
        for (var browser in minVersions) {
          if (minVersions.hasOwnProperty(browser)) {
            if (_bowser[browser]) {
              // browser version and min supported version.
              if (compareVersions([version, minVersions[browser]]) < 0) {
                return true; // unsupported
              }
            }
          }
        }
        return strictMode; // not found
      }

      /**
       * Check if browser is supported
       *
       * @param  {Object} minVersions map of minimal version to browser
       * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
       * @return {Boolean}
       */
      function check(minVersions, strictMode) {
        return !isUnsupportedBrowser(minVersions, strictMode);
      }

      bowser.isUnsupportedBrowser = isUnsupportedBrowser;
      bowser.compareVersions = compareVersions;
      bowser.check = check;

      /*
       * Set our detect method to the main bowser object so we can
       * reuse it to test other user agents.
       * This is needed to implement future tests.
       */
      bowser._detect = detect;

      return bowser;
    });
    });

    var require$$0$2 = (bowser && typeof bowser === 'object' && 'default' in bowser ? bowser['default'] : bowser);

    var getBrowserInformation = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _bowser = require$$0$2;

    var _bowser2 = _interopRequireDefault(_bowser);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var vendorPrefixes = {
      Webkit: ['chrome', 'safari', 'ios', 'android', 'phantom', 'opera', 'webos', 'blackberry', 'bada', 'tizen', 'chromium', 'vivaldi'],
      Moz: ['firefox', 'seamonkey', 'sailfish'],
      ms: ['msie', 'msedge']
    };

    var browsers = {
      chrome: [['chrome'], ['chromium']],
      safari: [['safari']],
      firefox: [['firefox']],
      ie: [['msie']],
      edge: [['msedge']],
      opera: [['opera'], ['vivaldi']],
      ios_saf: [['ios', 'mobile'], ['ios', 'tablet']],
      ie_mob: [['windowsphone', 'mobile', 'msie'], ['windowsphone', 'tablet', 'msie'], ['windowsphone', 'mobile', 'msedge'], ['windowsphone', 'tablet', 'msedge']],
      op_mini: [['opera', 'mobile'], ['opera', 'tablet']],
      and_uc: [['android', 'mobile'], ['android', 'tablet']],
      android: [['android', 'mobile'], ['android', 'tablet']]
    };

    /**
     * Uses bowser to get default browser information such as version and name
     * Evaluates bowser info and adds vendorPrefix information
     * @param {string} userAgent - userAgent that gets evaluated
     */

    exports.default = function (userAgent) {
      if (!userAgent) {
        return false;
      }

      var info = _bowser2.default._detect(userAgent);

      Object.keys(vendorPrefixes).forEach(function (prefix) {
        vendorPrefixes[prefix].forEach(function (browser) {
          if (info[browser]) {
            info.prefix = {
              inline: prefix,
              css: '-' + prefix.toLowerCase() + '-'
            };
          }
        });
      });

      var name = '';
      Object.keys(browsers).forEach(function (browser) {
        browsers[browser].forEach(function (condition) {
          var match = 0;
          condition.forEach(function (single) {
            if (info[single]) {
              match += 1;
            }
          });
          if (condition.length === match) {
            name = browser;
          }
        });
      });

      info.browser = name;
      // For cordova IOS 8 the version is missing, set truncated osversion to prevent NaN
      info.version = info.version ? parseFloat(info.version) : parseInt(parseFloat(info.osversion), 10);

      // seperate native android chrome
      // https://github.com/rofrischmann/inline-style-prefixer/issues/45
      if (info.browser === 'android' && info.chrome && info.version > 37) {
        info.browser = 'and_chr';
      }
      info.version = parseFloat(info.version);
      info.osversion = parseFloat(info.osversion);
      // For android < 4.4 we want to check the osversion
      // not the chrome version, see issue #26
      // https://github.com/rofrischmann/inline-style-prefixer/issues/26
      if (info.browser === 'android' && info.osversion < 5) {
        info.version = info.osversion;
      }

      return info;
    };

    module.exports = exports['default'];
    });

    var require$$13 = (getBrowserInformation && typeof getBrowserInformation === 'object' && 'default' in getBrowserInformation ? getBrowserInformation['default'] : getBrowserInformation);

    var flexboxOld$1 = __commonjs(function (module, exports) {
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

    var require$$0$3 = (flexboxOld$1 && typeof flexboxOld$1 === 'object' && 'default' in flexboxOld$1 ? flexboxOld$1['default'] : flexboxOld$1);

    var flexboxIE$1 = __commonjs(function (module, exports) {
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

    var require$$1$1 = (flexboxIE$1 && typeof flexboxIE$1 === 'object' && 'default' in flexboxIE$1 ? flexboxIE$1['default'] : flexboxIE$1);

    var prefixProps$1 = __commonjs(function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = { "Webkit": { "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "backfaceVisibility": true, "perspective": true, "perspectiveOrigin": true, "transformStyle": true, "transformOriginZ": true, "animation": true, "animationDelay": true, "animationDirection": true, "animationFillMode": true, "animationDuration": true, "animationIterationCount": true, "animationName": true, "animationPlayState": true, "animationTimingFunction": true, "appearance": true, "userSelect": true, "fontKerning": true, "textEmphasisPosition": true, "textEmphasis": true, "textEmphasisStyle": true, "textEmphasisColor": true, "boxDecorationBreak": true, "clipPath": true, "maskImage": true, "maskMode": true, "maskRepeat": true, "maskPosition": true, "maskClip": true, "maskOrigin": true, "maskSize": true, "maskComposite": true, "mask": true, "maskBorderSource": true, "maskBorderMode": true, "maskBorderSlice": true, "maskBorderWidth": true, "maskBorderOutset": true, "maskBorderRepeat": true, "maskBorder": true, "maskType": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "filter": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true, "flex": true, "flexBasis": true, "flexDirection": true, "flexGrow": true, "flexFlow": true, "flexShrink": true, "flexWrap": true, "alignContent": true, "alignItems": true, "alignSelf": true, "justifyContent": true, "order": true, "transition": true, "transitionDelay": true, "transitionDuration": true, "transitionProperty": true, "transitionTimingFunction": true, "backdropFilter": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "shapeImageThreshold": true, "shapeImageMargin": true, "shapeImageOutside": true, "hyphens": true, "flowInto": true, "flowFrom": true, "regionFragment": true, "textSizeAdjust": true, "borderImage": true, "borderImageOutset": true, "borderImageRepeat": true, "borderImageSlice": true, "borderImageSource": true, "borderImageWidth": true, "tabSize": true, "objectFit": true, "objectPosition": true }, "Moz": { "appearance": true, "userSelect": true, "boxSizing": true, "textAlignLast": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "tabSize": true, "hyphens": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true }, "ms": { "flex": true, "flexBasis": false, "flexDirection": true, "flexGrow": false, "flexFlow": true, "flexShrink": false, "flexWrap": true, "alignContent": false, "alignItems": false, "alignSelf": false, "justifyContent": false, "order": false, "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "userSelect": true, "wrapFlow": true, "wrapThrough": true, "wrapMargin": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "touchAction": true, "hyphens": true, "flowInto": true, "flowFrom": true, "breakBefore": true, "breakAfter": true, "breakInside": true, "regionFragment": true, "gridTemplateColumns": true, "gridTemplateRows": true, "gridTemplateAreas": true, "gridTemplate": true, "gridAutoColumns": true, "gridAutoRows": true, "gridAutoFlow": true, "grid": true, "gridRowStart": true, "gridColumnStart": true, "gridRowEnd": true, "gridRow": true, "gridColumn": true, "gridColumnEnd": true, "gridColumnGap": true, "gridRowGap": true, "gridArea": true, "gridGap": true, "textSizeAdjust": true } };
    module.exports = exports["default"];
    });

    var require$$0$4 = (prefixProps$1 && typeof prefixProps$1 === 'object' && 'default' in prefixProps$1 ? prefixProps$1['default'] : prefixProps$1);

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

    var require$$0$5 = (isPrefixedValue && typeof isPrefixedValue === 'object' && 'default' in isPrefixedValue ? isPrefixedValue['default'] : isPrefixedValue);

    var transition$1 = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = transition;

    var _hyphenateStyleName = require$$3;

    var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

    var _capitalizeString = require$$2$1;

    var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

    var _isPrefixedValue = require$$0$5;

    var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

    var _prefixProps = require$$0$4;

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

    var require$$2$2 = (transition$1 && typeof transition$1 === 'object' && 'default' in transition$1 ? transition$1['default'] : transition$1);

    var joinPrefixedRules = __commonjs(function (module, exports) {
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

    var require$$1$2 = (joinPrefixedRules && typeof joinPrefixedRules === 'object' && 'default' in joinPrefixedRules ? joinPrefixedRules['default'] : joinPrefixedRules);

    var gradient$1 = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = gradient;

    var _joinPrefixedRules = require$$1$2;

    var _joinPrefixedRules2 = _interopRequireDefault(_joinPrefixedRules);

    var _isPrefixedValue = require$$0$5;

    var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

    function gradient(property, value) {
      if (typeof value === 'string' && value.match(values) !== null) {
        if ((0, _isPrefixedValue2.default)(value)) {
          return;
        }

        return (0, _joinPrefixedRules2.default)(property, value);
      }
    }
    module.exports = exports['default'];
    });

    var require$$3$2 = (gradient$1 && typeof gradient$1 === 'object' && 'default' in gradient$1 ? gradient$1['default'] : gradient$1);

    var sizing$1 = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = sizing;

    var _joinPrefixedRules = require$$1$2;

    var _joinPrefixedRules2 = _interopRequireDefault(_joinPrefixedRules);

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
        return (0, _joinPrefixedRules2.default)(property, value);
      }
    }
    module.exports = exports['default'];
    });

    var require$$4$1 = (sizing$1 && typeof sizing$1 === 'object' && 'default' in sizing$1 ? sizing$1['default'] : sizing$1);

    var flex$1 = __commonjs(function (module, exports) {
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

    var require$$5$1 = (flex$1 && typeof flex$1 === 'object' && 'default' in flex$1 ? flex$1['default'] : flex$1);

    var cursor = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = cursor;

    var _joinPrefixedRules = require$$1$2;

    var _joinPrefixedRules2 = _interopRequireDefault(_joinPrefixedRules);

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
        return (0, _joinPrefixedRules2.default)(property, value);
      }
    }
    module.exports = exports['default'];
    });

    var require$$6$1 = (cursor && typeof cursor === 'object' && 'default' in cursor ? cursor['default'] : cursor);

    var calc$1 = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = calc;

    var _joinPrefixedRules = require$$1$2;

    var _joinPrefixedRules2 = _interopRequireDefault(_joinPrefixedRules);

    var _isPrefixedValue = require$$0$5;

    var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function calc(property, value) {
      if (typeof value === 'string' && value.indexOf('calc(') > -1) {
        if ((0, _isPrefixedValue2.default)(value)) {
          return;
        }

        return (0, _joinPrefixedRules2.default)(property, value, function (prefix, value) {
          return value.replace(/calc\(/g, prefix + 'calc(');
        });
      }
    }
    module.exports = exports['default'];
    });

    var require$$7$1 = (calc$1 && typeof calc$1 === 'object' && 'default' in calc$1 ? calc$1['default'] : calc$1);

    var prefixAll = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = prefixAll;

    var _prefixProps = require$$0$4;

    var _prefixProps2 = _interopRequireDefault(_prefixProps);

    var _capitalizeString = require$$2$1;

    var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

    var _assign = require$$8$1;

    var _assign2 = _interopRequireDefault(_assign);

    var _calc = require$$7$1;

    var _calc2 = _interopRequireDefault(_calc);

    var _cursor = require$$6$1;

    var _cursor2 = _interopRequireDefault(_cursor);

    var _flex = require$$5$1;

    var _flex2 = _interopRequireDefault(_flex);

    var _sizing = require$$4$1;

    var _sizing2 = _interopRequireDefault(_sizing);

    var _gradient = require$$3$2;

    var _gradient2 = _interopRequireDefault(_gradient);

    var _transition = require$$2$2;

    var _transition2 = _interopRequireDefault(_transition);

    var _flexboxIE = require$$1$1;

    var _flexboxIE2 = _interopRequireDefault(_flexboxIE);

    var _flexboxOld = require$$0$3;

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
        } else if (Array.isArray(value)) {
          // prefix fallback arrays
          (0, _assign2.default)(styles, prefixArray(property, value));
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
        var value = styles[property];
        // resolve every special plugins
        plugins.forEach(function (plugin) {
          return (0, _assign2.default)(styles, plugin(property, value));
        });
      });

      return styles;
    }

    function prefixArray(property, valueArray) {
      var result = {};
      valueArray.forEach(function (value) {
        plugins.forEach(function (plugin) {
          var prefixed = plugin(property, value);
          if (prefixed) {
            Object.keys(prefixed).forEach(function (prop) {
              var entry = prefixed[prop];
              result[prop] = result[prop] ? mergeValues(result[prop], entry) : entry;
            });
          }
        });
        if (!result[property]) {
          result[property] = value;
        }
      });
      return result;
    }

    function mergeValues(existing, toMerge) {
      var merged = existing;
      var valuesToMerge = Array.isArray(toMerge) ? toMerge : [toMerge];
      valuesToMerge.forEach(function (value) {
        if (Array.isArray(merged) && merged.indexOf(value) === -1) {
          merged.push(value);
        } else if (merged !== value) {
          merged = [merged, value];
        }
      });
      return merged;
    }
    module.exports = exports['default'];
    });

    var require$$14 = (prefixAll && typeof prefixAll === 'object' && 'default' in prefixAll ? prefixAll['default'] : prefixAll);

    var Prefixer = __commonjs(function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();
    // special flexbox specifications

    var _prefixAll2 = require$$14;

    var _prefixAll3 = _interopRequireDefault(_prefixAll2);

    var _getBrowserInformation = require$$13;

    var _getBrowserInformation2 = _interopRequireDefault(_getBrowserInformation);

    var _getPrefixedKeyframes = require$$12;

    var _getPrefixedKeyframes2 = _interopRequireDefault(_getPrefixedKeyframes);

    var _capitalizeString = require$$2$1;

    var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

    var _assign = require$$8$1;

    var _assign2 = _interopRequireDefault(_assign);

    var _prefixProps = require$$9;

    var _prefixProps2 = _interopRequireDefault(_prefixProps);

    var _calc = require$$8;

    var _calc2 = _interopRequireDefault(_calc);

    var _zoomCursor = require$$7;

    var _zoomCursor2 = _interopRequireDefault(_zoomCursor);

    var _grabCursor = require$$6;

    var _grabCursor2 = _interopRequireDefault(_grabCursor);

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

    var _flexboxOld = require$$0;

    var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var plugins = [_calc2.default, _zoomCursor2.default, _grabCursor2.default, _sizing2.default, _gradient2.default, _transition2.default, _flexboxIE2.default, _flexboxOld2.default,
    // this must be run AFTER the flexbox specs
    _flex2.default];

    var Prefixer = function () {
      /**
       * Instantiante a new prefixer
       * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
       * @param {string} keepUnprefixed - keeps unprefixed properties and values
       */

      function Prefixer() {
        var _this = this;

        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Prefixer);

        var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

        this._userAgent = options.userAgent || defaultUserAgent;
        this._keepUnprefixed = options.keepUnprefixed || false;

        this._browserInfo = (0, _getBrowserInformation2.default)(this._userAgent);

        // Checks if the userAgent was resolved correctly
        if (this._browserInfo && this._browserInfo.prefix) {
          // set additional prefix information
          this.cssPrefix = this._browserInfo.prefix.css;
          this.jsPrefix = this._browserInfo.prefix.inline;
          this.prefixedKeyframes = (0, _getPrefixedKeyframes2.default)(this._browserInfo);
        } else {
          this._usePrefixAllFallback = true;
          return false;
        }

        var data = this._browserInfo.browser && _prefixProps2.default[this._browserInfo.browser];
        if (data) {
          this._requiresPrefix = Object.keys(data).filter(function (key) {
            return data[key] >= _this._browserInfo.version;
          }).reduce(function (result, name) {
            result[name] = true;
            return result;
          }, {});
          this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
        } else {
          this._usePrefixAllFallback = true;
        }
      }

      /**
       * Returns a prefixed version of the style object
       * @param {Object} styles - Style object that gets prefixed properties added
       * @returns {Object} - Style object with prefixed properties and values
       */

      _createClass(Prefixer, [{
        key: 'prefix',
        value: function prefix(styles) {
          var _this2 = this;

          // use prefixAll as fallback if userAgent can not be resolved
          if (this._usePrefixAllFallback) {
            return (0, _prefixAll3.default)(styles);
          }

          // only add prefixes if needed
          if (!this._hasPropsRequiringPrefix) {
            return styles;
          }

          styles = (0, _assign2.default)({}, styles);

          Object.keys(styles).forEach(function (property) {
            var value = styles[property];
            if (value instanceof Object) {
              // recurse through nested style objects
              styles[property] = _this2.prefix(value);
            } else {
              // add prefixes if needed
              if (_this2._requiresPrefix[property]) {
                styles[_this2.jsPrefix + (0, _capitalizeString2.default)(property)] = value;
                if (!_this2._keepUnprefixed) {
                  delete styles[property];
                }
              }
            }
          });

          Object.keys(styles).forEach(function (property) {
            var value = styles[property];
            // resolve plugins
            plugins.forEach(function (plugin) {
              // generates a new plugin interface with current data
              var resolvedStyles = plugin({
                property: property,
                value: value,
                styles: styles,
                browserInfo: _this2._browserInfo,
                prefix: {
                  js: _this2.jsPrefix,
                  css: _this2.cssPrefix,
                  keyframes: _this2.prefixedKeyframes
                },
                keepUnprefixed: _this2._keepUnprefixed,
                requiresPrefix: _this2._requiresPrefix
              });
              (0, _assign2.default)(styles, resolvedStyles);
            });
          });

          return styles;
        }

        /**
         * Returns a prefixed version of the style object using all vendor prefixes
         * @param {Object} styles - Style object that gets prefixed properties added
         * @returns {Object} - Style object with prefixed properties and values
         */

      }], [{
        key: 'prefixAll',
        value: function prefixAll(styles) {
          return (0, _prefixAll3.default)(styles);
        }
      }]);

      return Prefixer;
    }();

    exports.default = Prefixer;
    module.exports = exports['default'];
    });

    var Prefixer$1 = (Prefixer && typeof Prefixer === 'object' && 'default' in Prefixer ? Prefixer['default'] : Prefixer);

    var dynamicPrefixer = (function (options) {
      var prefixer = new Prefixer$1(options);

      return function (style) {
        return prefixer.prefix(style);
      };
    });

    return dynamicPrefixer;

}));
//# sourceMappingURL=fela-plugin-dynamic-prefixer.js.map