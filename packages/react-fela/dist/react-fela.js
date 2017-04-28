(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global.ReactFela = factory(global.React));
}(this, function (react) { 'use strict';

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

  var invariant = __commonjs(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   */

  'use strict';

  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */

  var validateFormat = function validateFormat(format) {};

  if (true) {
    validateFormat = function validateFormat(format) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    };
  }

  function invariant(condition, format, a, b, c, d, e, f) {
    validateFormat(format);

    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function () {
          return args[argIndex++];
        }));
        error.name = 'Invariant Violation';
      }

      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  }

  module.exports = invariant;
  });

  var require$$2 = (invariant && typeof invariant === 'object' && 'default' in invariant ? invariant['default'] : invariant);

  var emptyFunction = __commonjs(function (module) {
  "use strict";

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * 
   */

  function makeEmptyFunction(arg) {
    return function () {
      return arg;
    };
  }

  /**
   * This function accepts and discards inputs; it has no side effects. This is
   * primarily useful idiomatically for overridable function endpoints which
   * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
   */
  var emptyFunction = function emptyFunction() {};

  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function () {
    return this;
  };
  emptyFunction.thatReturnsArgument = function (arg) {
    return arg;
  };

  module.exports = emptyFunction;
  });

  var require$$0 = (emptyFunction && typeof emptyFunction === 'object' && 'default' in emptyFunction ? emptyFunction['default'] : emptyFunction);

  var factoryWithThrowingShims = __commonjs(function (module) {
  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   */

  'use strict';

  var emptyFunction = require$$0;
  var invariant = require$$2;

  module.exports = function () {
    // Important!
    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
    function shim() {
      invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    };
    shim.isRequired = shim;
    function getShim() {
      return shim;
    };
    var ReactPropTypes = {
      array: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,

      any: shim,
      arrayOf: getShim,
      element: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim
    };

    ReactPropTypes.checkPropTypes = emptyFunction;
    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };
  });

  var ReactPropTypesSecret = __commonjs(function (module) {
  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   */

  'use strict';

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  module.exports = ReactPropTypesSecret;
  });

  var require$$0$2 = (ReactPropTypesSecret && typeof ReactPropTypesSecret === 'object' && 'default' in ReactPropTypesSecret ? ReactPropTypesSecret['default'] : ReactPropTypesSecret);

  var warning = __commonjs(function (module) {
  /**
   * Copyright 2014-2015, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   */

  'use strict';

  var emptyFunction = require$$0;

  /**
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var warning = emptyFunction;

  if (true) {
    (function () {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.error(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      warning = function warning(condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }

        if (format.indexOf('Failed Composite propType: ') === 0) {
          return; // Ignore CompositeComponent proptype check.
        }

        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    })();
  }

  module.exports = warning;
  });

  var require$$1$1 = (warning && typeof warning === 'object' && 'default' in warning ? warning['default'] : warning);

  var checkPropTypes = __commonjs(function (module) {
  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   */

  'use strict';

  if (true) {
    var invariant = require$$2;
    var warning = require$$1$1;
    var ReactPropTypesSecret = require$$0$2;
    var loggedTypeFailures = {};
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    if (true) {
      for (var typeSpecName in typeSpecs) {
        if (typeSpecs.hasOwnProperty(typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }
          warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : babelHelpers.typeof(error));
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;

            var stack = getStack ? getStack() : '';

            warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
          }
        }
      }
    }
  }

  module.exports = checkPropTypes;
  });

  var require$$0$1 = (checkPropTypes && typeof checkPropTypes === 'object' && 'default' in checkPropTypes ? checkPropTypes['default'] : checkPropTypes);

  var factoryWithTypeCheckers = __commonjs(function (module) {
  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   */

  'use strict';

  var emptyFunction = require$$0;
  var invariant = require$$2;
  var warning = require$$1$1;

  var ReactPropTypesSecret = require$$0$2;
  var checkPropTypes = require$$0$1;

  module.exports = function (isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === 'function') {
        return iteratorFn;
      }
    }

    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */

    var ANONYMOUS = '<<anonymous>>';

    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),

      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker
    };

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }
    /*eslint-enable no-self-compare*/

    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message) {
      this.message = message;
      this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;

    function createChainableTypeChecker(validate) {
      if (true) {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;

        if (secret !== ReactPropTypesSecret) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          } else if (true && typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ':' + propName;
            if (!manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3) {
              warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
            }
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
          }
          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }

      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);

      return chainedCheckType;
    }

    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue);

          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunction.thatReturnsNull);
    }

    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.');
        return emptyFunction.thatReturnsNull;
      }

      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }

        var valuesString = JSON.stringify(expectedValues);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
        }
        for (var key in propValue) {
          if (propValue.hasOwnProperty(key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.');
        return emptyFunction.thatReturnsNull;
      }

      function validate(props, propName, componentName, location, propFullName) {
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
            return null;
          }
        }

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (!checker) {
            continue;
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function isNode(propValue) {
      switch (typeof propValue === 'undefined' ? 'undefined' : babelHelpers.typeof(propValue)) {
        case 'number':
        case 'string':
        case 'undefined':
          return true;
        case 'boolean':
          return !propValue;
        case 'object':
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement(propValue)) {
            return true;
          }

          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }

          return true;
        default:
          return false;
      }
    }

    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === 'symbol') {
        return true;
      }

      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue['@@toStringTag'] === 'Symbol') {
        return true;
      }

      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true;
      }

      return false;
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = typeof propValue === 'undefined' ? 'undefined' : babelHelpers.typeof(propValue);
      if (Array.isArray(propValue)) {
        return 'array';
      }
      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return 'object';
      }
      if (isSymbol(propType, propValue)) {
        return 'symbol';
      }
      return propType;
    }

    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
      var propType = getPropType(propValue);
      if (propType === 'object') {
        if (propValue instanceof Date) {
          return 'date';
        } else if (propValue instanceof RegExp) {
          return 'regexp';
        }
      }
      return propType;
    }

    // Returns class name of the object, if any.
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }

    ReactPropTypes.checkPropTypes = checkPropTypes;
    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };
  });

  var require$$1 = (factoryWithTypeCheckers && typeof factoryWithTypeCheckers === 'object' && 'default' in factoryWithTypeCheckers ? factoryWithTypeCheckers['default'] : factoryWithTypeCheckers);

  var index$1 = __commonjs(function (module) {
  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   */

  if (true) {
    var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

    var isValidElement = function isValidElement(object) {
      return (typeof object === 'undefined' ? 'undefined' : babelHelpers.typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    };

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = require$$1(isValidElement, throwOnDirectAccess);
  } else {}
  });

  var PropTypes = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

  var RULE_TYPE = 1;

  function createDOMInterface(renderer, node) {
    return function (change) {
      // only use insertRule in production as browser devtools might have
      // weird behavior if used together with insertRule at runtime
      if (false && change.type === RULE_TYPE && !change.media) {} else {
        node.textContent = renderer.renderToString();
      }
    };
  }

  /* eslint-disable import/no-mutable-exports */
  var warning$1 = function warning() {
    return true;
  };

  if (true) {
    warning$1 = function warning(condition, message) {
      if (!condition) {
        if (typeof console !== 'undefined') {
          console.error(message); // eslint-disable-line
        }
      }
    };
  }

  var warning$2 = warning$1;

  function isValidHTMLElement(mountNode) {
    return mountNode && mountNode.nodeType === 1;
  }

  function render(renderer, mountNode) {
    // mountNode must be a valid HTML element to be able
    // to set mountNode.textContent later on
    if (!isValidHTMLElement(mountNode)) {
      throw new Error('You need to specify a valid element node (nodeType = 1) to render into.');
    }

    // warns if the DOM node either is not a valid <style> element
    // thus the styles do not get applied as Expected
    // or if the node already got the data-fela-stylesheet attribute applied
    // suggesting it is already used by another Renderer
    warning$2(mountNode.nodeName === 'STYLE', 'You are using a node other than `<style>`. Your styles might not get applied correctly.');

    // mark and clean the DOM node to prevent side-effects
    mountNode.setAttribute('data-fela-stylesheet', '');

    var updateNode = createDOMInterface(renderer, mountNode);
    renderer.subscribe(updateNode);

    var css = renderer.renderToString();

    if (mountNode.textContent !== css) {
      // render currently rendered styles to the DOM once
      mountNode.textContent = css;
    }
  }

  var Provider = function (_Component) {
    babelHelpers.inherits(Provider, _Component);

    function Provider() {
      babelHelpers.classCallCheck(this, Provider);
      return babelHelpers.possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).apply(this, arguments));
    }

    babelHelpers.createClass(Provider, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return { renderer: this.props.renderer };
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _props = this.props,
            mountNode = _props.mountNode,
            renderer = _props.renderer;


        if (mountNode) {
          render(renderer, mountNode);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return react.Children.only(this.props.children);
      }
    }]);
    return Provider;
  }(react.Component);

  Provider.propTypes = { renderer: PropTypes.object.isRequired };
  Provider.childContextTypes = { renderer: PropTypes.object };

  function generateDisplayName(component) {
    var displayName = component.displayName || component.name;

    if (displayName) {
      return 'Fela' + displayName;
    }

    return 'ConnectedFelaComponent';
  }

  function connectFactory(BaseComponent, createElement, contextTypes) {
    return function connect(mapStylesToProps) {
      return function (component) {
        var EnhancedComponent = function (_BaseComponent) {
          babelHelpers.inherits(EnhancedComponent, _BaseComponent);

          function EnhancedComponent() {
            babelHelpers.classCallCheck(this, EnhancedComponent);
            return babelHelpers.possibleConstructorReturn(this, (EnhancedComponent.__proto__ || Object.getPrototypeOf(EnhancedComponent)).apply(this, arguments));
          }

          babelHelpers.createClass(EnhancedComponent, [{
            key: 'render',
            value: function render() {
              var _context = this.context,
                  renderer = _context.renderer,
                  theme = _context.theme;


              var styles = mapStylesToProps(babelHelpers.extends({}, this.props, {
                theme: theme || {}
              }))(renderer);

              return createElement(component, babelHelpers.extends({}, this.props, {
                styles: styles
              }));
            }
          }]);
          return EnhancedComponent;
        }(BaseComponent);

        EnhancedComponent.displayName = generateDisplayName(component);


        if (contextTypes) {
          EnhancedComponent.contextTypes = babelHelpers.extends({}, component.contextTypes, contextTypes);
        }

        return EnhancedComponent;
      };
    };
  }

  var connect = connectFactory(react.Component, react.createElement, {
    renderer: PropTypes.object,
    theme: PropTypes.object
  });

  function arrayReduce(array, iterator, initialValue) {
    for (var i = 0, len = array.length; i < len; ++i) {
      initialValue = iterator(initialValue, array[i]);
    }

    return initialValue;
  }

  function extractPassThroughProps(passThrough, ruleProps) {
    return arrayReduce(passThrough, function (output, property) {
      output[property] = ruleProps[property];
      return output;
    }, {});
  }

  function resolvePassThrough(passThrough, ruleProps) {
    if (typeof passThrough === 'function') {
      return Object.keys(passThrough(ruleProps));
    }

    return passThrough;
  }

  var assignStyle = __commonjs(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && babelHelpers.typeof(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : babelHelpers.typeof(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : babelHelpers.typeof(obj);
  };

  exports.default = assignStyle;

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function assignStyle(base) {
    for (var _len = arguments.length, extendingStyles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      extendingStyles[_key - 1] = arguments[_key];
    }

    for (var i = 0, len = extendingStyles.length; i < len; ++i) {
      var style = extendingStyles[i];

      for (var property in style) {
        var value = style[property];
        var baseValue = base[property];

        if ((typeof baseValue === 'undefined' ? 'undefined' : _typeof(baseValue)) === 'object') {
          if (Array.isArray(baseValue)) {
            if (Array.isArray(value)) {
              base[property] = [].concat(_toConsumableArray(baseValue), _toConsumableArray(value));
            } else {
              base[property] = [].concat(_toConsumableArray(baseValue), [value]);
            }
            continue;
          }

          if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !Array.isArray(value)) {
            base[property] = assignStyle({}, baseValue, value);
            continue;
          }
        }

        base[property] = value;
      }
    }

    return base;
  }
  module.exports = exports['default'];
  });

  var assignStyle$1 = (assignStyle && typeof assignStyle === 'object' && 'default' in assignStyle ? assignStyle['default'] : assignStyle);

  function combineRules() {
    for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
      rules[_key] = arguments[_key];
    }

    return function (props) {
      return arrayReduce(rules, function (style, rule) {
        return assignStyle$1(style, rule(props));
      }, {});
    };
  }

  function createComponentFactory(createElement, contextTypes) {
    return function createComponent(rule) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
      var passThroughProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      var FelaComponent = function FelaComponent(_ref, _ref2) {
        var renderer = _ref2.renderer,
            theme = _ref2.theme;
        var children = _ref.children,
            _felaRule = _ref._felaRule,
            _ref$passThrough = _ref.passThrough,
            passThrough = _ref$passThrough === undefined ? [] : _ref$passThrough,
            ruleProps = babelHelpers.objectWithoutProperties(_ref, ['children', '_felaRule', 'passThrough']);

        if (!renderer) {
          throw new Error("createComponent() can't render styles without the renderer in the context. Missing react-fela's <Provider /> at the app root?");
        }

        var combinedRule = _felaRule ? combineRules(rule, _felaRule) : rule;

        // compose passThrough props from arrays or functions
        var resolvedPassThrough = [].concat(babelHelpers.toConsumableArray(resolvePassThrough(passThroughProps, ruleProps)), babelHelpers.toConsumableArray(resolvePassThrough(passThrough, ruleProps)));

        // if the component renders into another Fela component
        // we pass down the combinedRule as well as both
        if (type._isFelaComponent) {
          return createElement(type, babelHelpers.extends({
            _felaRule: combinedRule,
            passThrough: resolvedPassThrough
          }, ruleProps), children);
        }

        var componentProps = extractPassThroughProps(resolvedPassThrough, ruleProps);

        ruleProps.theme = theme || {};

        // fela-native support
        if (renderer.isNativeRenderer) {
          var felaStyle = renderer.renderRule(combinedRule, ruleProps);
          componentProps.style = ruleProps.style ? [ruleProps.style, felaStyle] : felaStyle;
        } else {
          componentProps.style = ruleProps.style;
          var cls = ruleProps.className ? ruleProps.className + ' ' : '';
          componentProps.className = cls + renderer.renderRule(combinedRule, ruleProps);
        }

        componentProps.id = ruleProps.id;
        componentProps.ref = ruleProps.innerRef;

        var customType = ruleProps.is || type;
        return createElement(customType, componentProps, children);
      };

      if (contextTypes) {
        FelaComponent.contextTypes = contextTypes;
      }

      // use the rule name as display name to better debug with react inspector
      FelaComponent.displayName = rule.name ? rule.name : 'FelaComponent';
      FelaComponent._isFelaComponent = true;

      return FelaComponent;
    };
  }

  var createComponent = createComponentFactory(react.createElement, {
    renderer: PropTypes.object,
    theme: PropTypes.object
  });

  var ThemeProvider = function (_Component) {
    babelHelpers.inherits(ThemeProvider, _Component);

    function ThemeProvider() {
      babelHelpers.classCallCheck(this, ThemeProvider);
      return babelHelpers.possibleConstructorReturn(this, (ThemeProvider.__proto__ || Object.getPrototypeOf(ThemeProvider)).apply(this, arguments));
    }

    babelHelpers.createClass(ThemeProvider, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var _props = this.props,
            overwrite = _props.overwrite,
            theme = _props.theme;

        var previousTheme = this.context.theme;

        return {
          theme: babelHelpers.extends({}, !overwrite ? previousTheme || {} : {}, theme)
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return react.Children.only(this.props.children);
      }
    }]);
    return ThemeProvider;
  }(react.Component);

  ThemeProvider.propTypes = {
    theme: PropTypes.object.isRequired,
    overwrite: PropTypes.bool
  };
  ThemeProvider.childContextTypes = { theme: PropTypes.object };
  ThemeProvider.contextTypes = { theme: PropTypes.object };
  ThemeProvider.defaultProps = { overwrite: false };

  var index = {
    Provider: Provider,
    connect: connect,
    createComponent: createComponent,
    ThemeProvider: ThemeProvider
  };

  return index;

}));
//# sourceMappingURL=react-fela.js.map