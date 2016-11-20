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

  babelHelpers;


  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

  var warning = function warning() {
    return true;
  };

  if (true) {
    warning = function warning(condition, message) {
      if (!condition) {
        if (typeof console !== 'undefined') {
          console.error(message); // eslint-disable-line
        }
        throw new Error(message);
      }
    };
  }

  var warning$1 = warning;

  function createDOMInterface(renderer, node) {
    // this counter is used to cache the amount of @media rules
    // rendered using insertRule since the last full rerender with textContent
    // using the counter enables to insert rules and @media rules separately
    // which helps to ensure correct order and prevents rule order issue
    var mediaRules = 0;
    var isHydrating = false;

    var DOMInterface = {
      /**
       * updates DOM node styles performantly
       *
       * @param {Function} node - DOM node
       * @param {Object} change - object describing the changes
       * @param {Object} renderer - the renderer which triggered the change
       */
      updateNode: function updateNode() {
        var change = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        // setting the hydration flag to prevent DOM updates will immediately
        // get unset as soon as the rehydration process is done
        if (change.type === 'hydrate') {
          isHydrating = !change.done;
        }

        // only update DOM if the renderer is not hydrating at the moment
        if (!isHydrating) {
          // only use insertRule in production as browser devtools might have
          // weird behavior if used together with insertRule at runtime
          if (change.type === 'rule' && false) {
            var selector = change.selector;
            var css = change.css;
            var media = change.media;

            var cssRule = selector + '{' + css + '}';

            var sheet = node.sheet;
            var ruleLength = sheet.cssRules.length;

            if (media && media.length > 0) {
              // insert @media rules after basic rules, newest first
              sheet.insertRule('@media ' + media + '{' + cssRule + '}', ruleLength - mediaRules);
              mediaRules += 1;
            } else {
              // directly append new rules before everything else
              sheet.insertRule(cssRule, 0);
            }
          } else {
            node.textContent = renderer.renderToString();
            // the @media rules counter gets reset as the
            // full rerender also includes all @media rules
            mediaRules = 0;
          }
        }
      }
    };

    return DOMInterface;
  }

  function render(renderer, mountNode) {
    // check if the passed node is a valid element node which allows
    // setting the `textContent` property to update the node's content
    if (!mountNode || mountNode.nodeType !== 1) {
      throw new Error('You need to specify a valid element node (nodeType = 1) to render into.');
    }

    // warns if the DOM node either is not a valid <style> element thus the styles do not get applied as Expected
    // or if the node already got the data-fela-stylesheet attribute applied suggesting it is already used by another Renderer
    warning$1(mountNode.nodeName === 'STYLE', 'You are using a node other than `<style>`. Your styles might not get applied correctly.');
    warning$1(!mountNode.hasAttribute('data-fela-stylesheet'), 'This node is already used by another renderer. Rendering might overwrite other styles.');

    // mark and clean the DOM node to prevent side-effects
    mountNode.setAttribute('data-fela-stylesheet', '');

    var DOMInterface = createDOMInterface(renderer, mountNode);
    renderer.subscribe(DOMInterface.updateNode);

    // render currently rendered styles to the DOM once
    // if it is not already in DOM
    var css = renderer.renderToString();

    if (mountNode.textContent !== css) {
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
        var _props = this.props;
        var mountNode = _props.mountNode;
        var renderer = _props.renderer;


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
        return this.props.children;
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
            // invoke the component name for better CSS debugging
            if (true) {
              this.context.renderer._selectorPrefix = Comp.displayName || Comp.name || 'ConnectedFelaComponent';
            }

            // invoke props and renderer to render all styles
            var styles = mapStylesToProps(this.props)(this.context.renderer);

            // remove the component name after rendering
            if (true) {
              this.context.renderer._selectorPrefix = undefined;
            }

            return React__default.createElement(Comp, babelHelpers.extends({}, this.props, { styles: styles }));
          }
        }]);
        return EnhancedComponent;
      }(React.Component), _class.displayName = Comp.displayName || Comp.name || 'ConnectedFelaComponent', _class.contextTypes = babelHelpers.extends({}, Comp.contextTypes, {
        renderer: React.PropTypes.object
      }), _temp;
    };
  }

  function createComponent(rule) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    var passThroughProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var component = function component(_ref, _ref2) {
      var children = _ref.children;
      var className = _ref.className;
      var style = _ref.style;
      var felaProps = babelHelpers.objectWithoutProperties(_ref, ['children', 'className', 'style']);
      var renderer = _ref2.renderer;


      // filter props to extract props to pass through
      var componentProps = Object.keys(passThroughProps).reduce(function (output, prop) {
        output[prop] = felaProps[prop];
        if (!passThroughProps[prop]) {
          delete felaProps[prop];
        }
        return output;
      }, {});

      componentProps.style = style;

      var cls = className ? className + ' ' : '';
      componentProps.className = cls + renderer.renderRule(rule, felaProps);

      return React.createElement(type, componentProps, children);
    };

    component.contextTypes = { renderer: React.PropTypes.object };

    // use the rule name as display name to better debug with react inspector ( see #99 )
    component.displayName = rule.name && rule.name || 'FelaComponent';

    return component;
  }

  var index = {
    Provider: Provider,
    connect: connect,
    createComponent: createComponent
  };

  return index;

}));
//# sourceMappingURL=react-fela.js.map