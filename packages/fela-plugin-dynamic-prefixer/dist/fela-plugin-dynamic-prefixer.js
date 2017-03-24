(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FelaPluginDynamicPrefixer = factory());
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


  var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports; }

  var dynamicData = __commonjs(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    plugins: [],
    prefixMap: { "chrome": { "appearance": 59, "userSelect": 53, "textEmphasisPosition": 59, "textEmphasis": 59, "textEmphasisStyle": 59, "textEmphasisColor": 59, "boxDecorationBreak": 59, "clipPath": 54, "maskImage": 59, "maskMode": 59, "maskRepeat": 59, "maskPosition": 59, "maskClip": 59, "maskOrigin": 59, "maskSize": 59, "maskComposite": 59, "mask": 59, "maskBorderSource": 59, "maskBorderMode": 59, "maskBorderSlice": 59, "maskBorderWidth": 59, "maskBorderOutset": 59, "maskBorderRepeat": 59, "maskBorder": 59, "maskType": 59, "textDecorationStyle": 56, "textDecorationSkip": 56, "textDecorationLine": 56, "textDecorationColor": 56, "filter": 52, "fontFeatureSettings": 47, "breakAfter": 49, "breakBefore": 49, "breakInside": 49, "columnCount": 49, "columnFill": 49, "columnGap": 49, "columnRule": 49, "columnRuleColor": 49, "columnRuleStyle": 49, "columnRuleWidth": 49, "columns": 49, "columnSpan": 49, "columnWidth": 49 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 10.1, "userSelect": 10.1, "backdropFilter": 10.1, "fontKerning": 9, "scrollSnapType": 10.1, "scrollSnapPointsX": 10.1, "scrollSnapPointsY": 10.1, "scrollSnapDestination": 10.1, "scrollSnapCoordinate": 10.1, "boxDecorationBreak": 10.1, "clipPath": 10.1, "maskImage": 10.1, "maskMode": 10.1, "maskRepeat": 10.1, "maskPosition": 10.1, "maskClip": 10.1, "maskOrigin": 10.1, "maskSize": 10.1, "maskComposite": 10.1, "mask": 10.1, "maskBorderSource": 10.1, "maskBorderMode": 10.1, "maskBorderSlice": 10.1, "maskBorderWidth": 10.1, "maskBorderOutset": 10.1, "maskBorderRepeat": 10.1, "maskBorder": 10.1, "maskType": 10.1, "textDecorationStyle": 10.1, "textDecorationSkip": 10.1, "textDecorationLine": 10.1, "textDecorationColor": 10.1, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 10.1, "flowInto": 10.1, "flowFrom": 10.1, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 10.1, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8 }, "firefox": { "appearance": 54, "userSelect": 54, "textAlignLast": 48, "tabSize": 54, "hyphens": 42, "breakAfter": 51, "breakBefore": 51, "breakInside": 51, "columnCount": 51, "columnFill": 51, "columnGap": 51, "columnRule": 51, "columnRuleColor": 51, "columnRuleStyle": 51, "columnRuleWidth": 51, "columns": 51, "columnSpan": 51, "columnWidth": 51 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 44, "userSelect": 40, "fontKerning": 19, "textEmphasisPosition": 44, "textEmphasis": 44, "textEmphasisStyle": 44, "textEmphasisColor": 44, "boxDecorationBreak": 44, "clipPath": 41, "maskImage": 44, "maskMode": 44, "maskRepeat": 44, "maskPosition": 44, "maskClip": 44, "maskOrigin": 44, "maskSize": 44, "maskComposite": 44, "mask": 44, "maskBorderSource": 44, "maskBorderMode": 44, "maskBorderSlice": 44, "maskBorderWidth": 44, "maskBorderOutset": 44, "maskBorderRepeat": 44, "maskBorder": 44, "maskType": 44, "textDecorationStyle": 43, "textDecorationSkip": 43, "textDecorationLine": 43, "textDecorationColor": 43, "filter": 39, "fontFeatureSettings": 34, "breakAfter": 36, "breakBefore": 36, "breakInside": 36, "columnCount": 36, "columnFill": 36, "columnGap": 36, "columnRule": 36, "columnRuleColor": 36, "columnRuleStyle": 36, "columnRuleWidth": 36, "columns": 36, "columnSpan": 36, "columnWidth": 36 }, "ie": { "userSelect": 11, "wrapFlow": 11, "wrapThrough": 11, "wrapMargin": 11, "scrollSnapType": 11, "scrollSnapPointsX": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapCoordinate": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "gridTemplateColumns": 11, "gridTemplateRows": 11, "gridTemplateAreas": 11, "gridTemplate": 11, "gridAutoColumns": 11, "gridAutoRows": 11, "gridAutoFlow": 11, "grid": 11, "gridRowStart": 11, "gridColumnStart": 11, "gridRowEnd": 11, "gridRow": 11, "gridColumn": 11, "gridColumnEnd": 11, "gridColumnGap": 11, "gridRowGap": 11, "gridArea": 11, "gridGap": 11, "textSizeAdjust": 11 }, "edge": { "userSelect": 15, "wrapFlow": 15, "wrapThrough": 15, "wrapMargin": 15, "scrollSnapType": 15, "scrollSnapPointsX": 15, "scrollSnapPointsY": 15, "scrollSnapDestination": 15, "scrollSnapCoordinate": 15, "hyphens": 15, "flowInto": 15, "flowFrom": 15, "breakBefore": 15, "breakAfter": 15, "breakInside": 15, "regionFragment": 15, "gridTemplateColumns": 15, "gridTemplateRows": 15, "gridTemplateAreas": 15, "gridTemplate": 15, "gridAutoColumns": 15, "gridAutoRows": 15, "gridAutoFlow": 15, "grid": 15, "gridRowStart": 15, "gridColumnStart": 15, "gridRowEnd": 15, "gridRow": 15, "gridColumn": 15, "gridColumnEnd": 15, "gridColumnGap": 15, "gridRowGap": 15, "gridArea": 15, "gridGap": 15 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 10, "userSelect": 10, "backdropFilter": 10, "fontKerning": 10, "scrollSnapType": 10, "scrollSnapPointsX": 10, "scrollSnapPointsY": 10, "scrollSnapDestination": 10, "scrollSnapCoordinate": 10, "boxDecorationBreak": 10, "clipPath": 10, "maskImage": 10, "maskMode": 10, "maskRepeat": 10, "maskPosition": 10, "maskClip": 10, "maskOrigin": 10, "maskSize": 10, "maskComposite": 10, "mask": 10, "maskBorderSource": 10, "maskBorderMode": 10, "maskBorderSlice": 10, "maskBorderWidth": 10, "maskBorderOutset": 10, "maskBorderRepeat": 10, "maskBorder": 10, "maskType": 10, "textSizeAdjust": 10, "textDecorationStyle": 10, "textDecorationSkip": 10, "textDecorationLine": 10, "textDecorationColor": 10, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 10, "flowInto": 10, "flowFrom": 10, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 10, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1 }, "android": { "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 53, "userSelect": 53, "fontKerning": 4.4, "textEmphasisPosition": 53, "textEmphasis": 53, "textEmphasisStyle": 53, "textEmphasisColor": 53, "boxDecorationBreak": 53, "clipPath": 53, "maskImage": 53, "maskMode": 53, "maskRepeat": 53, "maskPosition": 53, "maskClip": 53, "maskOrigin": 53, "maskSize": 53, "maskComposite": 53, "mask": 53, "maskBorderSource": 53, "maskBorderMode": 53, "maskBorderSlice": 53, "maskBorderWidth": 53, "maskBorderOutset": 53, "maskBorderRepeat": 53, "maskBorder": 53, "maskType": 53, "filter": 4.4, "fontFeatureSettings": 4.4, "breakAfter": 53, "breakBefore": 53, "breakInside": 53, "columnCount": 53, "columnFill": 53, "columnGap": 53, "columnRule": 53, "columnRuleColor": 53, "columnRuleStyle": 53, "columnRuleWidth": 53, "columns": 53, "columnSpan": 53, "columnWidth": 53 }, "and_chr": { "appearance": 55, "textEmphasisPosition": 55, "textEmphasis": 55, "textEmphasisStyle": 55, "textEmphasisColor": 55, "boxDecorationBreak": 55, "maskImage": 55, "maskMode": 55, "maskRepeat": 55, "maskPosition": 55, "maskClip": 55, "maskOrigin": 55, "maskSize": 55, "maskComposite": 55, "mask": 55, "maskBorderSource": 55, "maskBorderMode": 55, "maskBorderSlice": 55, "maskBorderWidth": 55, "maskBorderOutset": 55, "maskBorderRepeat": 55, "maskBorder": 55, "maskType": 55, "textDecorationStyle": 55, "textDecorationSkip": 55, "textDecorationLine": 55, "textDecorationColor": 55 }, "and_uc": { "flex": 11, "flexBasis": 11, "flexDirection": 11, "flexGrow": 11, "flexFlow": 11, "flexShrink": 11, "flexWrap": 11, "alignContent": 11, "alignItems": 11, "alignSelf": 11, "justifyContent": 11, "order": 11, "transition": 11, "transitionDelay": 11, "transitionDuration": 11, "transitionProperty": 11, "transitionTimingFunction": 11, "transform": 11, "transformOrigin": 11, "transformOriginX": 11, "transformOriginY": 11, "backfaceVisibility": 11, "perspective": 11, "perspectiveOrigin": 11, "transformStyle": 11, "transformOriginZ": 11, "animation": 11, "animationDelay": 11, "animationDirection": 11, "animationFillMode": 11, "animationDuration": 11, "animationIterationCount": 11, "animationName": 11, "animationPlayState": 11, "animationTimingFunction": 11, "appearance": 11, "userSelect": 11, "fontKerning": 11, "textEmphasisPosition": 11, "textEmphasis": 11, "textEmphasisStyle": 11, "textEmphasisColor": 11, "maskImage": 11, "maskMode": 11, "maskRepeat": 11, "maskPosition": 11, "maskClip": 11, "maskOrigin": 11, "maskSize": 11, "maskComposite": 11, "mask": 11, "maskBorderSource": 11, "maskBorderMode": 11, "maskBorderSlice": 11, "maskBorderWidth": 11, "maskBorderOutset": 11, "maskBorderRepeat": 11, "maskBorder": 11, "maskType": 11, "textSizeAdjust": 11, "filter": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "fontFeatureSettings": 11, "columnCount": 11, "columnFill": 11, "columnGap": 11, "columnRule": 11, "columnRuleColor": 11, "columnRuleStyle": 11, "columnRuleWidth": 11, "columns": 11, "columnSpan": 11, "columnWidth": 11 }, "op_mini": {} }
  };
  module.exports = exports["default"];
  });

  var require$$0 = (dynamicData && typeof dynamicData === 'object' && 'default' in dynamicData ? dynamicData['default'] : dynamicData);

  var capitalizeString = __commonjs(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = capitalizeString;
  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  module.exports = exports["default"];
  });

  var require$$3 = (capitalizeString && typeof capitalizeString === 'object' && 'default' in capitalizeString ? capitalizeString['default'] : capitalizeString);

  var isPrefixedValue = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isPrefixedValue;

  var regex = /-webkit-|-moz-|-ms-/;

  function isPrefixedValue(value) {
    return typeof value === 'string' && regex.test(value);
  }
  module.exports = exports['default'];
  });

  var require$$0$2 = (isPrefixedValue && typeof isPrefixedValue === 'object' && 'default' in isPrefixedValue ? isPrefixedValue['default'] : isPrefixedValue);

  var index$2 = __commonjs(function (module) {
  'use strict';

  var uppercasePattern = /[A-Z]/g;
  var msPattern = /^ms-/;
  var cache = {};

  function hyphenateStyleName(string) {
    return string in cache ? cache[string] : cache[string] = string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
  }

  module.exports = hyphenateStyleName;
  });

  var require$$0$4 = (index$2 && typeof index$2 === 'object' && 'default' in index$2 ? index$2['default'] : index$2);

  var hyphenateProperty = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = hyphenateProperty;

  var _hyphenateStyleName = require$$0$4;

  var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function hyphenateProperty(property) {
    return (0, _hyphenateStyleName2.default)(property);
  }
  module.exports = exports['default'];
  });

  var require$$0$3 = (hyphenateProperty && typeof hyphenateProperty === 'object' && 'default' in hyphenateProperty ? hyphenateProperty['default'] : hyphenateProperty);

  var transition = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = transition;

  var _hyphenateProperty = require$$0$3;

  var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

  var _isPrefixedValue = require$$0$2;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  var _capitalizeString = require$$3;

  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var properties = {
    transition: true,
    transitionProperty: true,
    WebkitTransition: true,
    WebkitTransitionProperty: true,
    MozTransition: true,
    MozTransitionProperty: true
  };

  var prefixMapping = {
    Webkit: '-webkit-',
    Moz: '-moz-',
    ms: '-ms-'
  };

  function prefixValue(value, propertyPrefixMap) {
    if ((0, _isPrefixedValue2.default)(value)) {
      return value;
    }

    // only split multi values, not cubic beziers
    var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

    for (var i = 0, len = multipleValues.length; i < len; ++i) {
      var singleValue = multipleValues[i];
      var values = [singleValue];
      for (var property in propertyPrefixMap) {
        var dashCaseProperty = (0, _hyphenateProperty2.default)(property);

        if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
          var prefixes = propertyPrefixMap[property];
          for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
            // join all prefixes and create a new value
            values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
          }
        }
      }

      multipleValues[i] = values.join(',');
    }

    return multipleValues.join(',');
  }

  function transition(property, value, style, propertyPrefixMap) {
    // also check for already prefixed transitions
    if (typeof value === 'string' && properties.hasOwnProperty(property)) {
      var outputValue = prefixValue(value, propertyPrefixMap);
      // if the property is already prefixed
      var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
        return !/-moz-|-ms-/.test(val);
      }).join(',');

      if (property.indexOf('Webkit') > -1) {
        return webkitOutput;
      }

      var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
        return !/-webkit-|-ms-/.test(val);
      }).join(',');

      if (property.indexOf('Moz') > -1) {
        return mozOutput;
      }

      style['Webkit' + (0, _capitalizeString2.default)(property)] = webkitOutput;
      style['Moz' + (0, _capitalizeString2.default)(property)] = mozOutput;
      return outputValue;
    }
  }
  module.exports = exports['default'];
  });

  var require$$0$1 = (transition && typeof transition === 'object' && 'default' in transition ? transition['default'] : transition);

  var sizing = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = sizing;
  var prefixes = ['-webkit-', '-moz-', ''];

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
    if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
      return prefixes.map(function (prefix) {
        return prefix + value;
      });
    }
  }
  module.exports = exports['default'];
  });

  var require$$1$1 = (sizing && typeof sizing === 'object' && 'default' in sizing ? sizing['default'] : sizing);

  var position = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = position;
  function position(property, value) {
    if (property === 'position' && value === 'sticky') {
      return ['-webkit-sticky', 'sticky'];
    }
  }
  module.exports = exports['default'];
  });

  var require$$2 = (position && typeof position === 'object' && 'default' in position ? position['default'] : position);

  var imageSet = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = imageSet;

  var _isPrefixedValue = require$$0$2;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  // http://caniuse.com/#feat=css-image-set
  var prefixes = ['-webkit-', ''];
  function imageSet(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('image-set(') > -1) {
      return prefixes.map(function (prefix) {
        return value.replace(/image-set\(/g, prefix + 'image-set(');
      });
    }
  }
  module.exports = exports['default'];
  });

  var require$$3$1 = (imageSet && typeof imageSet === 'object' && 'default' in imageSet ? imageSet['default'] : imageSet);

  var gradient = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = gradient;

  var _isPrefixedValue = require$$0$2;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var prefixes = ['-webkit-', '-moz-', ''];

  var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

  function gradient(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && values.test(value)) {
      return prefixes.map(function (prefix) {
        return prefix + value;
      });
    }
  }
  module.exports = exports['default'];
  });

  var require$$4 = (gradient && typeof gradient === 'object' && 'default' in gradient ? gradient['default'] : gradient);

  var flexboxOld = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = flexboxOld;
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

  function flexboxOld(property, value, style) {
    if (property === 'flexDirection' && typeof value === 'string') {
      if (value.indexOf('column') > -1) {
        style.WebkitBoxOrient = 'vertical';
      } else {
        style.WebkitBoxOrient = 'horizontal';
      }
      if (value.indexOf('reverse') > -1) {
        style.WebkitBoxDirection = 'reverse';
      } else {
        style.WebkitBoxDirection = 'normal';
      }
    }
    if (alternativeProps.hasOwnProperty(property)) {
      style[alternativeProps[property]] = alternativeValues[value] || value;
    }
  }
  module.exports = exports['default'];
  });

  var require$$5 = (flexboxOld && typeof flexboxOld === 'object' && 'default' in flexboxOld ? flexboxOld['default'] : flexboxOld);

  var flex = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = flex;
  var values = {
    flex: true,
    'inline-flex': true
  };

  function flex(property, value) {
    if (property === 'display' && values.hasOwnProperty(value)) {
      return ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value];
    }
  }
  module.exports = exports['default'];
  });

  var require$$6 = (flex && typeof flex === 'object' && 'default' in flex ? flex['default'] : flex);

  var filter = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = filter;

  var _isPrefixedValue = require$$0$2;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  // http://caniuse.com/#feat=css-filter-function
  var prefixes = ['-webkit-', ''];
  function filter(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('filter(') > -1) {
      return prefixes.map(function (prefix) {
        return value.replace(/filter\(/g, prefix + 'filter(');
      });
    }
  }
  module.exports = exports['default'];
  });

  var require$$7 = (filter && typeof filter === 'object' && 'default' in filter ? filter['default'] : filter);

  var crossFade = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = crossFade;

  var _isPrefixedValue = require$$0$2;

  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  // http://caniuse.com/#search=cross-fade
  var prefixes = ['-webkit-', ''];
  function crossFade(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('cross-fade(') > -1) {
      return prefixes.map(function (prefix) {
        return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
      });
    }
  }
  module.exports = exports['default'];
  });

  var require$$8 = (crossFade && typeof crossFade === 'object' && 'default' in crossFade ? crossFade['default'] : crossFade);

  var cursor = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = cursor;
  var prefixes = ['-webkit-', '-moz-', ''];

  var values = {
    'zoom-in': true,
    'zoom-out': true,
    grab: true,
    grabbing: true
  };

  function cursor(property, value) {
    if (property === 'cursor' && values.hasOwnProperty(value)) {
      return prefixes.map(function (prefix) {
        return prefix + value;
      });
    }
  }
  module.exports = exports['default'];
  });

  var require$$9 = (cursor && typeof cursor === 'object' && 'default' in cursor ? cursor['default'] : cursor);

  var staticData = __commonjs(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    plugins: [],
    prefixMap: { "appearance": ["Webkit", "Moz"], "userSelect": ["Webkit", "Moz", "ms"], "textEmphasisPosition": ["Webkit"], "textEmphasis": ["Webkit"], "textEmphasisStyle": ["Webkit"], "textEmphasisColor": ["Webkit"], "boxDecorationBreak": ["Webkit"], "clipPath": ["Webkit"], "maskImage": ["Webkit"], "maskMode": ["Webkit"], "maskRepeat": ["Webkit"], "maskPosition": ["Webkit"], "maskClip": ["Webkit"], "maskOrigin": ["Webkit"], "maskSize": ["Webkit"], "maskComposite": ["Webkit"], "mask": ["Webkit"], "maskBorderSource": ["Webkit"], "maskBorderMode": ["Webkit"], "maskBorderSlice": ["Webkit"], "maskBorderWidth": ["Webkit"], "maskBorderOutset": ["Webkit"], "maskBorderRepeat": ["Webkit"], "maskBorder": ["Webkit"], "maskType": ["Webkit"], "textDecorationStyle": ["Webkit"], "textDecorationSkip": ["Webkit"], "textDecorationLine": ["Webkit"], "textDecorationColor": ["Webkit"], "filter": ["Webkit"], "fontFeatureSettings": ["Webkit"], "breakAfter": ["Webkit", "Moz", "ms"], "breakBefore": ["Webkit", "Moz", "ms"], "breakInside": ["Webkit", "Moz", "ms"], "columnCount": ["Webkit", "Moz"], "columnFill": ["Webkit", "Moz"], "columnGap": ["Webkit", "Moz"], "columnRule": ["Webkit", "Moz"], "columnRuleColor": ["Webkit", "Moz"], "columnRuleStyle": ["Webkit", "Moz"], "columnRuleWidth": ["Webkit", "Moz"], "columns": ["Webkit", "Moz"], "columnSpan": ["Webkit", "Moz"], "columnWidth": ["Webkit", "Moz"], "flex": ["Webkit"], "flexBasis": ["Webkit"], "flexDirection": ["Webkit"], "flexGrow": ["Webkit"], "flexFlow": ["Webkit"], "flexShrink": ["Webkit"], "flexWrap": ["Webkit"], "alignContent": ["Webkit"], "alignItems": ["Webkit"], "alignSelf": ["Webkit"], "justifyContent": ["Webkit"], "order": ["Webkit"], "transform": ["Webkit"], "transformOrigin": ["Webkit"], "transformOriginX": ["Webkit"], "transformOriginY": ["Webkit"], "backfaceVisibility": ["Webkit"], "perspective": ["Webkit"], "perspectiveOrigin": ["Webkit"], "transformStyle": ["Webkit"], "transformOriginZ": ["Webkit"], "animation": ["Webkit"], "animationDelay": ["Webkit"], "animationDirection": ["Webkit"], "animationFillMode": ["Webkit"], "animationDuration": ["Webkit"], "animationIterationCount": ["Webkit"], "animationName": ["Webkit"], "animationPlayState": ["Webkit"], "animationTimingFunction": ["Webkit"], "backdropFilter": ["Webkit"], "fontKerning": ["Webkit"], "scrollSnapType": ["Webkit", "ms"], "scrollSnapPointsX": ["Webkit", "ms"], "scrollSnapPointsY": ["Webkit", "ms"], "scrollSnapDestination": ["Webkit", "ms"], "scrollSnapCoordinate": ["Webkit", "ms"], "shapeImageThreshold": ["Webkit"], "shapeImageMargin": ["Webkit"], "shapeImageOutside": ["Webkit"], "hyphens": ["Webkit", "Moz", "ms"], "flowInto": ["Webkit", "ms"], "flowFrom": ["Webkit", "ms"], "regionFragment": ["Webkit", "ms"], "textAlignLast": ["Moz"], "tabSize": ["Moz"], "wrapFlow": ["ms"], "wrapThrough": ["ms"], "wrapMargin": ["ms"], "gridTemplateColumns": ["ms"], "gridTemplateRows": ["ms"], "gridTemplateAreas": ["ms"], "gridTemplate": ["ms"], "gridAutoColumns": ["ms"], "gridAutoRows": ["ms"], "gridAutoFlow": ["ms"], "grid": ["ms"], "gridRowStart": ["ms"], "gridColumnStart": ["ms"], "gridRowEnd": ["ms"], "gridRow": ["ms"], "gridColumn": ["ms"], "gridColumnEnd": ["ms"], "gridColumnGap": ["ms"], "gridRowGap": ["ms"], "gridArea": ["ms"], "gridGap": ["ms"], "textSizeAdjust": ["Webkit", "ms"], "transitionDelay": ["Webkit"], "transitionDuration": ["Webkit"], "transitionProperty": ["Webkit"], "transitionTimingFunction": ["Webkit"] }
  };
  module.exports = exports["default"];
  });

  var require$$10 = (staticData && typeof staticData === 'object' && 'default' in staticData ? staticData['default'] : staticData);

  var isObject = __commonjs(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isObject;
  function isObject(value) {
    return value instanceof Object && !Array.isArray(value);
  }
  module.exports = exports["default"];
  });

  var require$$1$2 = (isObject && typeof isObject === 'object' && 'default' in isObject ? isObject['default'] : isObject);

  var addNewValuesOnly = __commonjs(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = addNewValuesOnly;
  function addIfNew(list, value) {
    if (list.indexOf(value) === -1) {
      list.push(value);
    }
  }

  function addNewValuesOnly(list, values) {
    if (Array.isArray(values)) {
      for (var i = 0, len = values.length; i < len; ++i) {
        addIfNew(list, values[i]);
      }
    } else {
      addIfNew(list, values);
    }
  }
  module.exports = exports["default"];
  });

  var require$$2$1 = (addNewValuesOnly && typeof addNewValuesOnly === 'object' && 'default' in addNewValuesOnly ? addNewValuesOnly['default'] : addNewValuesOnly);

  var prefixValue = __commonjs(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = prefixValue;
  function prefixValue(plugins, property, value, style, metaData) {
    for (var i = 0, len = plugins.length; i < len; ++i) {
      var processedValue = plugins[i](property, value, style, metaData);

      // we can stop processing if a value is returned
      // as all plugin criteria are unique
      if (processedValue) {
        return processedValue;
      }
    }
  }
  module.exports = exports["default"];
  });

  var require$$0$5 = (prefixValue && typeof prefixValue === 'object' && 'default' in prefixValue ? prefixValue['default'] : prefixValue);

  var prefixProperty = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = prefixProperty;

  var _capitalizeString = require$$3;

  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function prefixProperty(prefixProperties, property, style) {
    if (prefixProperties.hasOwnProperty(property)) {
      var requiredPrefixes = prefixProperties[property];
      for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
        style[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
      }
    }
  }
  module.exports = exports['default'];
  });

  var require$$3$2 = (prefixProperty && typeof prefixProperty === 'object' && 'default' in prefixProperty ? prefixProperty['default'] : prefixProperty);

  var createPrefixer = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createPrefixer;

  var _prefixProperty = require$$3$2;

  var _prefixProperty2 = _interopRequireDefault(_prefixProperty);

  var _prefixValue = require$$0$5;

  var _prefixValue2 = _interopRequireDefault(_prefixValue);

  var _addNewValuesOnly = require$$2$1;

  var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

  var _isObject = require$$1$2;

  var _isObject2 = _interopRequireDefault(_isObject);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function createPrefixer(_ref) {
    var prefixMap = _ref.prefixMap,
        plugins = _ref.plugins;

    function prefixAll(style) {
      for (var property in style) {
        var value = style[property];

        // handle nested objects
        if ((0, _isObject2.default)(value)) {
          style[property] = prefixAll(value);
          // handle array values
        } else if (Array.isArray(value)) {
          var combinedValue = [];

          for (var i = 0, len = value.length; i < len; ++i) {
            var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, prefixMap);
            (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
          }

          // only modify the value if it was touched
          // by any plugin to prevent unnecessary mutations
          if (combinedValue.length > 0) {
            style[property] = combinedValue;
          }
        } else {
          var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, prefixMap);

          // only modify the value if it was touched
          // by any plugin to prevent unnecessary mutations
          if (_processedValue) {
            style[property] = _processedValue;
          }

          (0, _prefixProperty2.default)(prefixMap, property, style);
        }
      }

      return style;
    }

    return prefixAll;
  }
  module.exports = exports['default'];
  });

  var require$$11 = (createPrefixer && typeof createPrefixer === 'object' && 'default' in createPrefixer ? createPrefixer['default'] : createPrefixer);

  var index$1 = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createPrefixer = require$$11;

  var _createPrefixer2 = _interopRequireDefault(_createPrefixer);

  var _staticData = require$$10;

  var _staticData2 = _interopRequireDefault(_staticData);

  var _cursor = require$$9;

  var _cursor2 = _interopRequireDefault(_cursor);

  var _crossFade = require$$8;

  var _crossFade2 = _interopRequireDefault(_crossFade);

  var _filter = require$$7;

  var _filter2 = _interopRequireDefault(_filter);

  var _flex = require$$6;

  var _flex2 = _interopRequireDefault(_flex);

  var _flexboxOld = require$$5;

  var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

  var _gradient = require$$4;

  var _gradient2 = _interopRequireDefault(_gradient);

  var _imageSet = require$$3$1;

  var _imageSet2 = _interopRequireDefault(_imageSet);

  var _position = require$$2;

  var _position2 = _interopRequireDefault(_position);

  var _sizing = require$$1$1;

  var _sizing2 = _interopRequireDefault(_sizing);

  var _transition = require$$0$1;

  var _transition2 = _interopRequireDefault(_transition);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];

  exports.default = (0, _createPrefixer2.default)({
    prefixMap: _staticData2.default.prefixMap,
    plugins: plugins
  });
  module.exports = exports['default'];
  });

  var require$$1 = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

  var transition$1 = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && babelHelpers.typeof(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : babelHelpers.typeof(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : babelHelpers.typeof(obj);
  };

  exports.default = transition;

  var _hyphenateProperty = require$$0$3;

  var _hyphenateProperty2 = _interopRequireDefault(_hyphenateProperty);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var properties = {
    transition: true,
    transitionProperty: true,
    WebkitTransition: true,
    WebkitTransitionProperty: true,
    MozTransition: true,
    MozTransitionProperty: true
  };

  var requiresPrefixDashCased = void 0;

  function transition(property, value, style, _ref) {
    var cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed,
        requiresPrefix = _ref.requiresPrefix;

    if (typeof value === 'string' && properties.hasOwnProperty(property)) {
      var _ret = function () {
        // memoize the prefix array for later use
        if (!requiresPrefixDashCased) {
          requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (prop) {
            return (0, _hyphenateProperty2.default)(prop);
          });
        }

        // only split multi values, not cubic beziers
        var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

        requiresPrefixDashCased.forEach(function (prop) {
          multipleValues.forEach(function (val, index) {
            if (val.indexOf(prop) > -1 && prop !== 'order') {
              multipleValues[index] = val.replace(prop, cssPrefix + prop) + (keepUnprefixed ? ',' + val : '');
            }
          });
        });

        return {
          v: multipleValues.join(',')
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  }
  module.exports = exports['default'];
  });

  var require$$2$2 = (transition$1 && typeof transition$1 === 'object' && 'default' in transition$1 ? transition$1['default'] : transition$1);

  var getPrefixedValue = __commonjs(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getPrefixedValue;
  function getPrefixedValue(prefixedValue, value, keepUnprefixed) {
    if (keepUnprefixed) {
      return [prefixedValue, value];
    }
    return prefixedValue;
  }
  module.exports = exports["default"];
  });

  var require$$0$6 = (getPrefixedValue && typeof getPrefixedValue === 'object' && 'default' in getPrefixedValue ? getPrefixedValue['default'] : getPrefixedValue);

  var sizing$1 = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = sizing;

  var _getPrefixedValue = require$$0$6;

  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

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

  // TODO: chrome & opera support it
  function sizing(property, value, style, _ref) {
    var cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    // This might change in the future
    // Keep an eye on it
    if (properties.hasOwnProperty(property) && values.hasOwnProperty(value)) {
      return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
    }
  }
  module.exports = exports['default'];
  });

  var require$$3$3 = (sizing$1 && typeof sizing$1 === 'object' && 'default' in sizing$1 ? sizing$1['default'] : sizing$1);

  var position$1 = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = position;

  var _getPrefixedValue = require$$0$6;

  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function position(property, value, _ref) {
    var browserName = _ref.browserName,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    if (property === 'position' && value === 'sticky' && (browserName === 'safari' || browserName === 'ios_saf')) {
      return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
    }
  }
  module.exports = exports['default'];
  });

  var require$$4$1 = (position$1 && typeof position$1 === 'object' && 'default' in position$1 ? position$1['default'] : position$1);

  var imageSet$1 = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = imageSet;

  var _getPrefixedValue = require$$0$6;

  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function imageSet(property, value, style, _ref) {
    var browserName = _ref.browserName,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    if (typeof value === 'string' && value.indexOf('image-set(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || browserName === 'and_uc' || browserName === 'ios_saf' || browserName === 'safari')) {
      return (0, _getPrefixedValue2.default)(value.replace(/image-set\(/g, cssPrefix + 'image-set('), value, keepUnprefixed);
    }
  }
  module.exports = exports['default'];
  });

  var require$$5$1 = (imageSet$1 && typeof imageSet$1 === 'object' && 'default' in imageSet$1 ? imageSet$1['default'] : imageSet$1);

  var gradient$1 = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = gradient;

  var _getPrefixedValue = require$$0$6;

  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;
  function gradient(property, value, style, _ref) {
    var browserName = _ref.browserName,
        browserVersion = _ref.browserVersion,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    if (typeof value === 'string' && values.test(value) && (browserName === 'firefox' && browserVersion < 16 || browserName === 'chrome' && browserVersion < 26 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 7 || (browserName === 'opera' || browserName === 'op_mini') && browserVersion < 12.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
      return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
    }
  }
  module.exports = exports['default'];
  });

  var require$$6$1 = (gradient$1 && typeof gradient$1 === 'object' && 'default' in gradient$1 ? gradient$1['default'] : gradient$1);

  var flexboxOld$1 = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = flexboxOld;

  var _getPrefixedValue = require$$0$6;

  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  var properties = Object.keys(alternativeProps).concat(otherProps);

  function flexboxOld(property, value, style, _ref) {
    var browserName = _ref.browserName,
        browserVersion = _ref.browserVersion,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed,
        requiresPrefix = _ref.requiresPrefix;

    if ((properties.indexOf(property) > -1 || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browserName === 'firefox' && browserVersion < 22 || browserName === 'chrome' && browserVersion < 21 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion <= 6.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
      delete requiresPrefix[property];

      if (!keepUnprefixed && !Array.isArray(style[property])) {
        delete style[property];
      }
      if (property === 'flexDirection' && typeof value === 'string') {
        if (value.indexOf('column') > -1) {
          style.WebkitBoxOrient = 'vertical';
        } else {
          style.WebkitBoxOrient = 'horizontal';
        }
        if (value.indexOf('reverse') > -1) {
          style.WebkitBoxDirection = 'reverse';
        } else {
          style.WebkitBoxDirection = 'normal';
        }
      }
      if (property === 'display' && alternativeValues.hasOwnProperty(value)) {
        return (0, _getPrefixedValue2.default)(cssPrefix + alternativeValues[value], value, keepUnprefixed);
      }
      if (alternativeProps.hasOwnProperty(property)) {
        style[alternativeProps[property]] = alternativeValues[value] || value;
      }
    }
  }
  module.exports = exports['default'];
  });

  var require$$7$1 = (flexboxOld$1 && typeof flexboxOld$1 === 'object' && 'default' in flexboxOld$1 ? flexboxOld$1['default'] : flexboxOld$1);

  var flex$1 = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = flex;

  var _getPrefixedValue = require$$0$6;

  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var values = {
    flex: true,
    'inline-flex': true
  };
  function flex(property, value, style, _ref) {
    var browserName = _ref.browserName,
        browserVersion = _ref.browserVersion,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    if (property === 'display' && values[value] && (browserName === 'chrome' && browserVersion < 29 && browserVersion > 20 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 && browserVersion > 6 || browserName === 'opera' && (browserVersion === 15 || browserVersion === 16))) {
      return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
    }
  }
  module.exports = exports['default'];
  });

  var require$$8$1 = (flex$1 && typeof flex$1 === 'object' && 'default' in flex$1 ? flex$1['default'] : flex$1);

  var filter$1 = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = filter;

  var _getPrefixedValue = require$$0$6;

  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function filter(property, value, style, _ref) {
    var browserName = _ref.browserName,
        browserVersion = _ref.browserVersion,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    if (typeof value === 'string' && value.indexOf('filter(') > -1 && (browserName === 'ios_saf' || browserName === 'safari' && browserVersion < 9.1)) {
      return (0, _getPrefixedValue2.default)(value.replace(/filter\(/g, cssPrefix + 'filter('), value, keepUnprefixed);
    }
  }
  module.exports = exports['default'];
  });

  var require$$9$1 = (filter$1 && typeof filter$1 === 'object' && 'default' in filter$1 ? filter$1['default'] : filter$1);

  var crossFade$1 = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = crossFade;

  var _getPrefixedValue = require$$0$6;

  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function crossFade(property, value, style, _ref) {
    var browserName = _ref.browserName,
        browserVersion = _ref.browserVersion,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    if (typeof value === 'string' && value.indexOf('cross-fade(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || (browserName === 'ios_saf' || browserName === 'safari') && browserVersion < 10)) {
      return (0, _getPrefixedValue2.default)(value.replace(/cross-fade\(/g, cssPrefix + 'cross-fade('), value, keepUnprefixed);
    }
  }
  module.exports = exports['default'];
  });

  var require$$10$1 = (crossFade$1 && typeof crossFade$1 === 'object' && 'default' in crossFade$1 ? crossFade$1['default'] : crossFade$1);

  var cursor$1 = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = cursor;

  var _getPrefixedValue = require$$0$6;

  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var grabValues = {
    grab: true,
    grabbing: true
  };

  var zoomValues = {
    'zoom-in': true,
    'zoom-out': true
  };

  function cursor(property, value, style, _ref) {
    var browserName = _ref.browserName,
        browserVersion = _ref.browserVersion,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    // adds prefixes for firefox, chrome, safari, and opera regardless of
    // version until a reliable browser support info can be found
    // see: https://github.com/rofrischmann/inline-style-prefixer/issues/79
    if (property === 'cursor' && grabValues[value] && (browserName === 'firefox' || browserName === 'chrome' || browserName === 'safari' || browserName === 'opera')) {
      return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
    }

    if (property === 'cursor' && zoomValues[value] && (browserName === 'firefox' && browserVersion < 24 || browserName === 'chrome' && browserVersion < 37 || browserName === 'safari' && browserVersion < 9 || browserName === 'opera' && browserVersion < 24)) {
      return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
    }
  }
  module.exports = exports['default'];
  });

  var require$$11$1 = (cursor$1 && typeof cursor$1 === 'object' && 'default' in cursor$1 ? cursor$1['default'] : cursor$1);

  var getPrefixedKeyframes = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getPrefixedKeyframes;
  function getPrefixedKeyframes(browserName, browserVersion, cssPrefix) {
    var prefixedKeyframes = 'keyframes';

    if (browserName === 'chrome' && browserVersion < 43 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 || browserName === 'opera' && browserVersion < 30 || browserName === 'android' && browserVersion <= 4.4 || browserName === 'and_uc') {
      return cssPrefix + prefixedKeyframes;
    }
    return prefixedKeyframes;
  }
  module.exports = exports['default'];
  });

  var require$$4$2 = (getPrefixedKeyframes && typeof getPrefixedKeyframes === 'object' && 'default' in getPrefixedKeyframes ? getPrefixedKeyframes['default'] : getPrefixedKeyframes);

  var bowser = __commonjs(function (module, exports, global) {
  /*!
   * Bowser - a browser detector
   * https://github.com/ded/bowser
   * MIT License | (c) Dustin Diaz 2015
   */

  !function (root, name, definition) {
    if (typeof module != 'undefined' && module.exports) module.exports = definition();else if (typeof define == 'function' && define.amd) define(name, definition);else root[name] = definition();
  }(__commonjs_global, 'bowser', function () {
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
          samsungBrowser = /SamsungBrowser/i.test(ua),
          windows = !windowsphone && /windows/i.test(ua),
          mac = !iosdevice && !silk && /macintosh/i.test(ua),
          linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua),
          edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i),
          versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i),
          tablet = /tablet/i.test(ua),
          mobile = !tablet && /[^-]mobi/i.test(ua),
          xbox = /xbox/i.test(ua),
          result;

      if (/opera/i.test(ua)) {
        //  an old Opera
        result = {
          name: 'Opera',
          opera: t,
          version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/opr|opios/i.test(ua)) {
        // a new Opera
        result = {
          name: 'Opera',
          opera: t,
          version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
        };
      } else if (/SamsungBrowser/i.test(ua)) {
        result = {
          name: 'Samsung Internet for Android',
          samsungBrowser: t,
          version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
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
      if (!result.windowsphone && !result.msedge && (android || result.silk)) {
        result.android = t;
      } else if (!result.windowsphone && !result.msedge && iosdevice) {
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
      if (result.msedge || result.msie && result.version >= 10 || result.yandexbrowser && result.version >= 15 || result.vivaldi && result.version >= 1.0 || result.chrome && result.version >= 20 || result.samsungBrowser && result.version >= 4 || result.firefox && result.version >= 20.0 || result.safari && result.version >= 6 || result.opera && result.version >= 10.0 || result.ios && result.osversion && result.osversion.split(".")[0] >= 6 || result.blackberry && result.version >= 10.1 || result.chromium && result.version >= 20) {
        result.a = t;
      } else if (result.msie && result.version < 10 || result.chrome && result.version < 20 || result.firefox && result.version < 20.0 || result.safari && result.version < 6 || result.opera && result.version < 10.0 || result.ios && result.osversion && result.osversion.split(".")[0] < 6 || result.chromium && result.version < 20) {
        result.c = t;
      } else result.x = t;

      return result;
    }

    var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '');

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
        result.push(iterator(arr[i]));
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
            if (typeof minVersions[browser] !== 'string') {
              throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
            }

            // browser version and min supported version.
            return compareVersions([version, minVersions[browser]]) < 0;
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
     * @param  {String}  [ua] user agent string
     * @return {Boolean}
     */
    function check(minVersions, strictMode, ua) {
      return !isUnsupportedBrowser(minVersions, strictMode, ua);
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

  var require$$0$7 = (bowser && typeof bowser === 'object' && 'default' in bowser ? bowser['default'] : bowser);

  var getBrowserInformation = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getBrowserInformation;

  var _bowser = require$$0$7;

  var _bowser2 = _interopRequireDefault(_bowser);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var prefixByBrowser = {
    chrome: 'Webkit',
    safari: 'Webkit',
    ios: 'Webkit',
    android: 'Webkit',
    phantom: 'Webkit',
    opera: 'Webkit',
    webos: 'Webkit',
    blackberry: 'Webkit',
    bada: 'Webkit',
    tizen: 'Webkit',
    chromium: 'Webkit',
    vivaldi: 'Webkit',
    firefox: 'Moz',
    seamoney: 'Moz',
    sailfish: 'Moz',
    msie: 'ms',
    msedge: 'ms'
  };

  var browserByCanIuseAlias = {
    chrome: 'chrome',
    chromium: 'chrome',
    safari: 'safari',
    firfox: 'firefox',
    msedge: 'edge',
    opera: 'opera',
    vivaldi: 'opera',
    msie: 'ie'
  };

  function getBrowserName(browserInfo) {
    if (browserInfo.firefox) {
      return 'firefox';
    }

    if (browserInfo.mobile || browserInfo.tablet) {
      if (browserInfo.ios) {
        return 'ios_saf';
      } else if (browserInfo.android) {
        return 'android';
      } else if (browserInfo.opera) {
        return 'op_mini';
      }
    }

    for (var browser in browserByCanIuseAlias) {
      if (browserInfo.hasOwnProperty(browser)) {
        return browserByCanIuseAlias[browser];
      }
    }
  }

  /**
   * Uses bowser to get default browser browserInformation such as version and name
   * Evaluates bowser browserInfo and adds vendorPrefix browserInformation
   * @param {string} userAgent - userAgent that gets evaluated
   */
  function getBrowserInformation(userAgent) {
    var browserInfo = _bowser2.default._detect(userAgent);

    for (var browser in prefixByBrowser) {
      if (browserInfo.hasOwnProperty(browser)) {
        var prefix = prefixByBrowser[browser];

        browserInfo.jsPrefix = prefix;
        browserInfo.cssPrefix = '-' + prefix.toLowerCase() + '-';
        break;
      }
    }

    browserInfo.browserName = getBrowserName(browserInfo);

    // For cordova IOS 8 the version is missing, set truncated osversion to prevent NaN
    if (browserInfo.version) {
      browserInfo.browserVersion = parseFloat(browserInfo.version);
    } else {
      browserInfo.browserVersion = parseInt(parseFloat(browserInfo.osversion), 10);
    }

    browserInfo.osVersion = parseFloat(browserInfo.osversion);

    // iOS forces all browsers to use Safari under the hood
    // as the Safari version seems to match the iOS version
    // we just explicitely use the osversion instead
    // https://github.com/rofrischmann/inline-style-prefixer/issues/72
    if (browserInfo.browserName === 'ios_saf' && browserInfo.browserVersion > browserInfo.osVersion) {
      browserInfo.browserVersion = browserInfo.osVersion;
    }

    // seperate native android chrome
    // https://github.com/rofrischmann/inline-style-prefixer/issues/45
    if (browserInfo.browserName === 'android' && browserInfo.chrome && browserInfo.browserVersion > 37) {
      browserInfo.browserName = 'and_chr';
    }

    // For android < 4.4 we want to check the osversion
    // not the chrome version, see issue #26
    // https://github.com/rofrischmann/inline-style-prefixer/issues/26
    if (browserInfo.browserName === 'android' && browserInfo.osVersion < 5) {
      browserInfo.browserVersion = browserInfo.osVersion;
    }

    // Samsung browser are basically build on Chrome > 44
    // https://github.com/rofrischmann/inline-style-prefixer/issues/102
    if (browserInfo.browserName === 'android' && browserInfo.samsungBrowser) {
      browserInfo.browserName = 'and_chr';
      browserInfo.browserVersion = 44;
    }

    return browserInfo;
  }
  module.exports = exports['default'];
  });

  var require$$5$2 = (getBrowserInformation && typeof getBrowserInformation === 'object' && 'default' in getBrowserInformation ? getBrowserInformation['default'] : getBrowserInformation);

  var createPrefixer$1 = __commonjs(function (module, exports) {
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

  exports.default = createPrefixer;

  var _getBrowserInformation = require$$5$2;

  var _getBrowserInformation2 = _interopRequireDefault(_getBrowserInformation);

  var _getPrefixedKeyframes = require$$4$2;

  var _getPrefixedKeyframes2 = _interopRequireDefault(_getPrefixedKeyframes);

  var _capitalizeString = require$$3;

  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

  var _addNewValuesOnly = require$$2$1;

  var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

  var _isObject = require$$1$2;

  var _isObject2 = _interopRequireDefault(_isObject);

  var _prefixValue = require$$0$5;

  var _prefixValue2 = _interopRequireDefault(_prefixValue);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function createPrefixer(_ref) {
    var prefixMap = _ref.prefixMap,
        plugins = _ref.plugins;
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (style) {
      return style;
    };

    return function () {
      /**
      * Instantiante a new prefixer
      * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
      * @param {string} keepUnprefixed - keeps unprefixed properties and values
      */
      function Prefixer() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Prefixer);

        var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

        this._userAgent = options.userAgent || defaultUserAgent;
        this._keepUnprefixed = options.keepUnprefixed || false;

        if (this._userAgent) {
          this._browserInfo = (0, _getBrowserInformation2.default)(this._userAgent);
        }

        // Checks if the userAgent was resolved correctly
        if (this._browserInfo && this._browserInfo.cssPrefix) {
          this.prefixedKeyframes = (0, _getPrefixedKeyframes2.default)(this._browserInfo.browserName, this._browserInfo.browserVersion, this._browserInfo.cssPrefix);
        } else {
          this._useFallback = true;
          return false;
        }

        var prefixData = this._browserInfo.browserName && prefixMap[this._browserInfo.browserName];
        if (prefixData) {
          this._requiresPrefix = {};

          for (var property in prefixData) {
            if (prefixData[property] >= this._browserInfo.browserVersion) {
              this._requiresPrefix[property] = true;
            }
          }

          this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
        } else {
          this._useFallback = true;
        }

        this._metaData = {
          browserVersion: this._browserInfo.browserVersion,
          browserName: this._browserInfo.browserName,
          cssPrefix: this._browserInfo.cssPrefix,
          jsPrefix: this._browserInfo.jsPrefix,
          keepUnprefixed: this._keepUnprefixed,
          requiresPrefix: this._requiresPrefix
        };
      }

      _createClass(Prefixer, [{
        key: 'prefix',
        value: function prefix(style) {
          // use static prefixer as fallback if userAgent can not be resolved
          if (this._useFallback) {
            return fallback(style);
          }

          // only add prefixes if needed
          if (!this._hasPropsRequiringPrefix) {
            return style;
          }

          return this._prefixStyle(style);
        }
      }, {
        key: '_prefixStyle',
        value: function _prefixStyle(style) {
          for (var property in style) {
            var value = style[property];

            // handle nested objects
            if ((0, _isObject2.default)(value)) {
              style[property] = this.prefix(value);
              // handle array values
            } else if (Array.isArray(value)) {
              var combinedValue = [];

              for (var i = 0, len = value.length; i < len; ++i) {
                var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, this._metaData);
                (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
              }

              // only modify the value if it was touched
              // by any plugin to prevent unnecessary mutations
              if (combinedValue.length > 0) {
                style[property] = combinedValue;
              }
            } else {
              var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, this._metaData);

              // only modify the value if it was touched
              // by any plugin to prevent unnecessary mutations
              if (_processedValue) {
                style[property] = _processedValue;
              }

              // add prefixes to properties
              if (this._requiresPrefix.hasOwnProperty(property)) {
                style[this._browserInfo.jsPrefix + (0, _capitalizeString2.default)(property)] = value;
                if (!this._keepUnprefixed) {
                  delete style[property];
                }
              }
            }
          }

          return style;
        }

        /**
        * Returns a prefixed version of the style object using all vendor prefixes
        * @param {Object} styles - Style object that gets prefixed properties added
        * @returns {Object} - Style object with prefixed properties and values
        */

      }], [{
        key: 'prefixAll',
        value: function prefixAll(styles) {
          return fallback(styles);
        }
      }]);

      return Prefixer;
    }();
  }
  module.exports = exports['default'];
  });

  var require$$12 = (createPrefixer$1 && typeof createPrefixer$1 === 'object' && 'default' in createPrefixer$1 ? createPrefixer$1['default'] : createPrefixer$1);

  var index = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createPrefixer = require$$12;

  var _createPrefixer2 = _interopRequireDefault(_createPrefixer);

  var _cursor = require$$11$1;

  var _cursor2 = _interopRequireDefault(_cursor);

  var _crossFade = require$$10$1;

  var _crossFade2 = _interopRequireDefault(_crossFade);

  var _filter = require$$9$1;

  var _filter2 = _interopRequireDefault(_filter);

  var _flex = require$$8$1;

  var _flex2 = _interopRequireDefault(_flex);

  var _flexboxOld = require$$7$1;

  var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

  var _gradient = require$$6$1;

  var _gradient2 = _interopRequireDefault(_gradient);

  var _imageSet = require$$5$1;

  var _imageSet2 = _interopRequireDefault(_imageSet);

  var _position = require$$4$1;

  var _position2 = _interopRequireDefault(_position);

  var _sizing = require$$3$3;

  var _sizing2 = _interopRequireDefault(_sizing);

  var _transition = require$$2$2;

  var _transition2 = _interopRequireDefault(_transition);

  var _static = require$$1;

  var _static2 = _interopRequireDefault(_static);

  var _dynamicData = require$$0;

  var _dynamicData2 = _interopRequireDefault(_dynamicData);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var plugins = [_crossFade2.default, _cursor2.default, _filter2.default, _flexboxOld2.default, _gradient2.default, _imageSet2.default, _position2.default, _sizing2.default, _transition2.default, _flex2.default];

  var Prefixer = (0, _createPrefixer2.default)({
    prefixMap: _dynamicData2.default.prefixMap,
    plugins: plugins
  }, _static2.default);
  exports.default = Prefixer;
  module.exports = exports['default'];
  });

  var Prefixer = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);

  function dynamicPrefixer(options) {
    var prefixer = new Prefixer(options);

    return function (style) {
      return prefixer.prefix(style);
    };
  }

  return dynamicPrefixer;

}));
//# sourceMappingURL=fela-plugin-dynamic-prefixer.js.map