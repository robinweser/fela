(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global.ReactFela = factory(global.React));
}(this, function (React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

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

  function isValidHTMLElement(mountNode) {
    return mountNode && mountNode.nodeType === 1;
  }

  function render(renderer, mountNode) {
    // mountNode must be a valid HTML element to be able
    // to set mountNode.textContent later on
    if (!isValidHTMLElement(mountNode)) {
      throw new Error('You need to specify a valid element node (nodeType = 1) to render into.');
    }

    // warns if the DOM node either is not a valid <style> element thus the styles do not get applied as Expected
    // or if the node already got the data-fela-stylesheet attribute applied suggesting it is already used by another Renderer
    warning$1(mountNode.nodeName === 'STYLE', 'You are using a node other than `<style>`. Your styles might not get applied correctly.');
    warning$1(!mountNode.hasAttribute('data-fela-stylesheet'), 'This node is already used by another renderer. Rendering might overwrite other styles.');

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
      key: 'getChildContext',
      value: function getChildContext() {
        return { renderer: this.props.renderer };
      }
    }, {
      key: 'render',
      value: function render() {
        return React.Children.only(this.props.children);
      }
    }]);
    return Provider;
  }(React.Component);

  Provider.propTypes = { renderer: React.PropTypes.object };
  Provider.childContextTypes = { renderer: React.PropTypes.object };

  function connect(mapStylesToProps) {
    return function (Comp) {
      var _class, _temp;

      return _temp = _class = function (_Component) {
        babelHelpers.inherits(EnhancedComponent, _Component);

        function EnhancedComponent() {
          babelHelpers.classCallCheck(this, EnhancedComponent);
          return babelHelpers.possibleConstructorReturn(this, (EnhancedComponent.__proto__ || Object.getPrototypeOf(EnhancedComponent)).apply(this, arguments));
        }

        babelHelpers.createClass(EnhancedComponent, [{
          key: 'render',

          // reuse the initial displayName name
          value: function render() {
            var _context = this.context,
                renderer = _context.renderer,
                theme = _context.theme;


            var styles = mapStylesToProps(babelHelpers.extends({}, this.props, {
              theme: theme || {}
            }))(renderer);

            return React__default.createElement(Comp, babelHelpers.extends({}, this.props, { styles: styles }));
          }
        }]);
        return EnhancedComponent;
      }(React.Component), _class.displayName = Comp.displayName || Comp.name || 'ConnectedFelaComponent', _class.contextTypes = babelHelpers.extends({}, Comp.contextTypes, {
        renderer: React.PropTypes.object,
        theme: React.PropTypes.object
      }), _temp;
    };
  }

  function createComponent(rule) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    var passThroughProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var FelaComponent = function FelaComponent(_ref, _ref2) {
      var renderer = _ref2.renderer,
          theme = _ref2.theme;
      var children = _ref.children,
          className = _ref.className,
          id = _ref.id,
          style = _ref.style,
          _ref$passThrough = _ref.passThrough,
          passThrough = _ref$passThrough === undefined ? [] : _ref$passThrough,
          ruleProps = babelHelpers.objectWithoutProperties(_ref, ['children', 'className', 'id', 'style', 'passThrough']);


      // filter props to extract props to pass through
      var componentProps = [].concat(babelHelpers.toConsumableArray(passThroughProps), babelHelpers.toConsumableArray(passThrough)).reduce(function (output, prop) {
        output[prop] = ruleProps[prop];
        return output;
      }, {});

      componentProps.style = style;
      componentProps.id = id;

      var cls = className ? className + ' ' : '';
      ruleProps.theme = theme || {};

      componentProps.className = cls + renderer.renderRule(rule, ruleProps);
      return React.createElement(type, componentProps, children);
    };

    FelaComponent.contextTypes = {
      renderer: React.PropTypes.object,
      theme: React.PropTypes.object
    };

    // use the rule name as display name to better debug with react inspector
    FelaComponent.displayName = rule.name && rule.name || 'FelaComponent';
    return FelaComponent;
  }

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
          theme: babelHelpers.extends({}, !overwrite && previousTheme || {}, theme)
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return React.Children.only(this.props.children);
      }
    }]);
    return ThemeProvider;
  }(React.Component);

  ThemeProvider.propTypes = { theme: React.PropTypes.object, overwrite: React.PropTypes.bool };
  ThemeProvider.childContextTypes = { theme: React.PropTypes.object };
  ThemeProvider.contextTypes = { theme: React.PropTypes.object };

  var index = {
    Provider: Provider,
    connect: connect,
    createComponent: createComponent,
    ThemeProvider: ThemeProvider
  };

  return index;

}));
//# sourceMappingURL=react-fela.js.map