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

var isBrowser = typeof window !== 'undefined' && window.document;
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray = Array.isArray;
function isStatefulComponent(o) {
    return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
}
function isStringOrNumber(obj) {
    var type = typeof obj === 'undefined' ? 'undefined' : babelHelpers.typeof(obj);
    return type === 'string' || type === 'number';
}
function isNullOrUndef(obj) {
    return isUndefined(obj) || isNull(obj);
}
function isInvalid(obj) {
    return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
}
function isString(obj) {
    return typeof obj === 'string';
}
function isNumber(obj) {
    return typeof obj === 'number';
}
function isNull(obj) {
    return obj === null;
}
function isTrue(obj) {
    return obj === true;
}
function isUndefined(obj) {
    return obj === undefined;
}

function applyKey(key, vNode) {
    vNode.key = key;
    return vNode;
}
function applyKeyIfMissing(key, vNode) {
    if (isNumber(key)) {
        key = '.' + key;
    }
    if (isNull(vNode.key) || vNode.key[0] === '.') {
        return applyKey(key, vNode);
    }
    return vNode;
}
function applyKeyPrefix(key, vNode) {
    vNode.key = key + vNode.key;
    return vNode;
}
function _normalizeVNodes(nodes, result, index, currentKey) {
    for (var len = nodes.length; index < len; index++) {
        var n = nodes[index];
        var key = currentKey + '.' + index;
        if (!isInvalid(n)) {
            if (isArray(n)) {
                _normalizeVNodes(n, result, 0, key);
            } else {
                if (isStringOrNumber(n)) {
                    n = createTextVNode$1(n);
                } else if (isVNode(n) && n.dom || n.key && n.key[0] === '.') {
                    n = cloneVNode(n);
                }
                if (isNull(n.key) || n.key[0] === '.') {
                    n = applyKey(key, n);
                } else {
                    n = applyKeyPrefix(currentKey, n);
                }
                result.push(n);
            }
        }
    }
}
function normalizeVNodes(nodes) {
    var newNodes = void 0;
    // we assign $ which basically means we've flagged this array for future note
    // if it comes back again, we need to clone it, as people are using it
    // in an immutable way
    // tslint:disable
    if (nodes['$']) {
        nodes = nodes.slice();
    } else {
        nodes['$'] = true;
    }
    // tslint:enable
    for (var i = 0, len = nodes.length; i < len; i++) {
        var n = nodes[i];
        if (isInvalid(n) || isArray(n)) {
            var result = (newNodes || nodes).slice(0, i);
            _normalizeVNodes(nodes, result, i, '');
            return result;
        } else if (isStringOrNumber(n)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, createTextVNode$1(n)));
        } else if (isVNode(n) && n.dom || isNull(n.key) && !(n.flags & 64 /* HasNonKeyedChildren */)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, cloneVNode(n)));
        } else if (newNodes) {
            newNodes.push(applyKeyIfMissing(i, cloneVNode(n)));
        }
    }
    return newNodes || nodes;
}
function normalizeChildren(children) {
    if (isArray(children)) {
        return normalizeVNodes(children);
    } else if (isVNode(children) && children.dom) {
        return cloneVNode(children);
    }
    return children;
}
function normalizeProps(vNode, props, children) {
    if (!(vNode.flags & 28 /* Component */) && isNullOrUndef(children) && !isNullOrUndef(props.children)) {
        vNode.children = props.children;
    }
    if (props.ref) {
        vNode.ref = props.ref;
        delete props.ref;
    }
    if (props.events) {
        vNode.events = props.events;
    }
    if (!isNullOrUndef(props.key)) {
        vNode.key = props.key;
        delete props.key;
    }
}
function normalizeElement(type, vNode) {
    if (type === 'svg') {
        vNode.flags = 128 /* SvgElement */;
    } else if (type === 'input') {
        vNode.flags = 512 /* InputElement */;
    } else if (type === 'select') {
        vNode.flags = 2048 /* SelectElement */;
    } else if (type === 'textarea') {
        vNode.flags = 1024 /* TextareaElement */;
    } else if (type === 'media') {
        vNode.flags = 256 /* MediaElement */;
    } else {
        vNode.flags = 2 /* HtmlElement */;
    }
}
function normalize(vNode) {
    var props = vNode.props;
    var hasProps = !isNull(props);
    var type = vNode.type;
    var children = vNode.children;
    // convert a wrongly created type back to element
    if (isString(type) && vNode.flags & 28 /* Component */) {
        normalizeElement(type, vNode);
        if (hasProps && props.children) {
            vNode.children = props.children;
            children = props.children;
        }
    }
    if (hasProps) {
        normalizeProps(vNode, props, children);
    }
    if (!isInvalid(children)) {
        vNode.children = normalizeChildren(children);
    }
    if (hasProps && !isInvalid(props.children)) {
        props.children = normalizeChildren(props.children);
    }
    if (false) {}
}

var options = {
    recyclingEnabled: false,
    findDOMNodeEnabled: false,
    roots: null,
    createVNode: null,
    beforeRender: null,
    afterRender: null,
    afterMount: null,
    afterUpdate: null,
    beforeUnmount: null
};

function createVNode(flags, type, props, children, events, key, ref, noNormalise) {
    if (flags & 16 /* ComponentUnknown */) {
            flags = isStatefulComponent(type) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
        }
    // Primitive node doesn't have defaultProps, only Component
    if (flags & 28 /* Component */) {
            // set default props
            var defaultProps = type.defaultProps;
            if (!isNullOrUndef(defaultProps)) {
                props = props || {}; // Create new object if only defaultProps given
                for (var prop in defaultProps) {
                    if (isUndefined(props[prop])) {
                        props[prop] = defaultProps[prop];
                    }
                }
            }
        }
    var vNode = {
        children: isUndefined(children) ? null : children,
        dom: null,
        events: events || null,
        flags: flags,
        key: isUndefined(key) ? null : key,
        props: props || null,
        ref: ref || null,
        type: type
    };
    if (!noNormalise) {
        normalize(vNode);
    }
    if (options.createVNode) {
        options.createVNode(vNode);
    }
    return vNode;
}
function cloneVNode(vNodeToClone, props) {
    var restParamLength = arguments.length - 2; // children
    var children = void 0;
    // Manually handle restParam for children, because babel always creates array
    // Not creating array allows us to fastPath out of recursion
    if (restParamLength > 0) {
        if (!props) {
            props = {};
        }
        if (restParamLength === 1) {
            children = arguments[2];
        } else {
            children = [];
            while (restParamLength-- > 0) {
                children[restParamLength] = arguments[restParamLength + 2];
            }
        }
        if (isUndefined(props.children)) {
            props.children = children;
        } else {
            if (isArray(children)) {
                if (isArray(props.children)) {
                    props.children = props.children.concat(children);
                } else {
                    props.children = [props.children].concat(children);
                }
            } else {
                if (isArray(props.children)) {
                    props.children.push(children);
                } else {
                    props.children = [props.children];
                    props.children.push(children);
                }
            }
        }
    }
    var newVNode = void 0;
    if (isArray(vNodeToClone)) {
        var tmpArray = [];
        for (var i = 0, len = vNodeToClone.length; i < len; i++) {
            tmpArray.push(cloneVNode(vNodeToClone[i]));
        }
        newVNode = tmpArray;
    } else {
        var flags = vNodeToClone.flags;
        var events = vNodeToClone.events || props && props.events || null;
        var key = !isNullOrUndef(vNodeToClone.key) ? vNodeToClone.key : props ? props.key : null;
        var ref = vNodeToClone.ref || (props ? props.ref : null);
        if (flags & 28 /* Component */) {
                newVNode = createVNode(flags, vNodeToClone.type, Object.assign({}, vNodeToClone.props, props), null, events, key, ref, true);
                var newProps = newVNode.props;
                if (newProps) {
                    var newChildren = newProps.children;
                    // we need to also clone component children that are in props
                    // as the children may also have been hoisted
                    if (newChildren) {
                        if (isArray(newChildren)) {
                            for (var _i = 0, _len = newChildren.length; _i < _len; _i++) {
                                var child = newChildren[_i];
                                if (!isInvalid(child) && isVNode(child)) {
                                    newProps.children[_i] = cloneVNode(child);
                                }
                            }
                        } else if (isVNode(newChildren)) {
                            newProps.children = cloneVNode(newChildren);
                        }
                    }
                }
                newVNode.children = null;
            } else if (flags & 3970 /* Element */) {
                children = props && props.children || vNodeToClone.children;
                newVNode = createVNode(flags, vNodeToClone.type, Object.assign({}, vNodeToClone.props, props), children, events, key, ref, !children);
            } else if (flags & 1 /* Text */) {
                newVNode = createTextVNode$1(vNodeToClone.children);
            }
    }
    return newVNode;
}
function createTextVNode$1(text) {
    return createVNode(1 /* Text */, null, null, text, null, null, null, true);
}
function isVNode(o) {
    return !!o.flags;
}

function constructDefaults(string, object, value) {
    /* eslint no-return-assign: 0 */
    var array = string.split(',');
    for (var i = 0, len = array.length; i < len; i++) {
        object[array[i]] = value;
    }
}
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var strictProps = {};
var booleanProps = {};
var namespaces = {};
var isUnitlessNumber = {};
var skipProps = {};
var delegatedProps = {};
constructDefaults('xlink:href,xlink:arcrole,xlink:actuate,xlink:role,xlink:titlef,xlink:type', namespaces, xlinkNS);
constructDefaults('xml:base,xml:lang,xml:space', namespaces, xmlNS);
constructDefaults('volume,defaultChecked', strictProps, true);
constructDefaults('children,childrenType,defaultValue,ref,key,selected,checked,multiple', skipProps, true);
constructDefaults('onClick,onMouseDown,onMouseUp,onMouseMove,onSubmit,onDblClick,onKeyDown,onKeyUp,onKeyPress', delegatedProps, true);
constructDefaults('muted,scoped,loop,open,checked,default,capture,disabled,readOnly,required,autoplay,controls,seamless,reversed,allowfullscreen,novalidate,hidden', booleanProps, true);
constructDefaults('animationIterationCount,borderImageOutset,borderImageSlice,borderImageWidth,boxFlex,boxFlexGroup,boxOrdinalGroup,columnCount,flex,flexGrow,flexPositive,flexShrink,flexNegative,flexOrder,gridRow,gridColumn,fontWeight,lineClamp,lineHeight,opacity,order,orphans,tabSize,widows,zIndex,zoom,fillOpacity,floodOpacity,stopOpacity,strokeDasharray,strokeDashoffset,strokeMiterlimit,strokeOpacity,strokeWidth,', isUnitlessNumber, true);

var isiOS = isBrowser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

// We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared
var EMPTY_OBJ = {};

// rather than use a Map, like we did before, we can use an array here
// given there shouldn't be THAT many roots on the page, the difference
// in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
var roots = [];
options.roots = roots;
var documentBody = isBrowser ? document.body : null;

var NO_OP$1 = '$NO_OP';
var ERROR_MSG$1 = 'a runtime error occured! Use Inferno in development environment to find the error.';
var isBrowser$1 = typeof window !== 'undefined' && window.document;
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
var isArray$1 = Array.isArray;
function isStringOrNumber$1(obj) {
    var type = typeof obj === 'undefined' ? 'undefined' : babelHelpers.typeof(obj);
    return type === 'string' || type === 'number';
}
function isNullOrUndef$1(obj) {
    return isUndefined$1(obj) || isNull$1(obj);
}
function isInvalid$1(obj) {
    return isNull$1(obj) || obj === false || isTrue$1(obj) || isUndefined$1(obj);
}
function isFunction$1(obj) {
    return typeof obj === 'function';
}
function isNull$1(obj) {
    return obj === null;
}
function isTrue$1(obj) {
    return obj === true;
}
function isUndefined$1(obj) {
    return obj === undefined;
}
function throwError$1(message) {
    if (!message) {
        message = ERROR_MSG$1;
    }
    throw new Error('Inferno Error: ' + message);
}
function Lifecycle$1() {
    this.listeners = [];
}
Lifecycle$1.prototype.addListener = function addListener(callback) {
    this.listeners.push(callback);
};
Lifecycle$1.prototype.trigger = function trigger() {
    for (var i = 0, len = this.listeners.length; i < len; i++) {
        this.listeners[i]();
    }
};

var noOp = ERROR_MSG$1;
var componentCallbackQueue = new Map();
// when a components root VNode is also a component, we can run into issues
// this will recursively look for vNode.parentNode if the VNode is a component
function updateParentComponentVNodes(vNode, dom) {
    if (vNode.flags & 28 /* Component */) {
            var parentVNode = vNode.parentVNode;
            if (parentVNode) {
                parentVNode.dom = dom;
                updateParentComponentVNodes(parentVNode, dom);
            }
        }
}
// this is in shapes too, but we don't want to import from shapes as it will pull in a duplicate of createVNode
function createVoidVNode() {
    return createVNode(4096 /* Void */);
}
function createTextVNode(text) {
    return createVNode(1 /* Text */, null, null, text);
}
function addToQueue(component, force, callback) {
    // TODO this function needs to be revised and improved on
    var queue = componentCallbackQueue.get(component);
    if (!queue) {
        queue = [];
        componentCallbackQueue.set(component, queue);
        Promise.resolve().then(function () {
            componentCallbackQueue.delete(component);
            applyState(component, force, function () {
                for (var i = 0, len = queue.length; i < len; i++) {
                    queue[i]();
                }
            });
        });
    }
    if (callback) {
        queue.push(callback);
    }
}
function queueStateChanges(component, newState, callback, sync) {
    if (isFunction$1(newState)) {
        newState = newState(component.state, component.props, component.context);
    }
    for (var stateKey in newState) {
        component._pendingState[stateKey] = newState[stateKey];
    }
    if (!component._pendingSetState && isBrowser$1 && !(sync && component._blockRender)) {
        if (sync || component._blockRender) {
            component._pendingSetState = true;
            applyState(component, false, callback);
        } else {
            addToQueue(component, false, callback);
        }
    } else {
        Object.assign(component.state, component._pendingState);
        component._pendingState = {};
    }
}
function applyState(component, force, callback) {
    if ((!component._deferSetState || force) && !component._blockRender && !component._unmounted) {
        component._pendingSetState = false;
        var pendingState = component._pendingState;
        var prevState = component.state;
        var nextState = Object.assign({}, prevState, pendingState);
        var props = component.props;
        var context = component.context;
        component._pendingState = {};
        var nextInput = component._updateComponent(prevState, nextState, props, props, context, force, true);
        var didUpdate = true;
        if (isInvalid$1(nextInput)) {
            nextInput = createVoidVNode();
        } else if (nextInput === NO_OP$1) {
            nextInput = component._lastInput;
            didUpdate = false;
        } else if (isStringOrNumber$1(nextInput)) {
            nextInput = createTextVNode(nextInput);
        } else if (isArray$1(nextInput)) {
            if (false) {}
            throwError$1();
        }
        var lastInput = component._lastInput;
        var vNode = component._vNode;
        var parentDom = lastInput.dom && lastInput.dom.parentNode || (lastInput.dom = vNode.dom);
        component._lastInput = nextInput;
        if (didUpdate) {
            var subLifecycle = component._lifecycle;
            if (!subLifecycle) {
                subLifecycle = new Lifecycle$1();
            } else {
                subLifecycle.listeners = [];
            }
            component._lifecycle = subLifecycle;
            var childContext = component.getChildContext();
            if (isNullOrUndef$1(childContext)) {
                childContext = component._childContext;
            } else {
                childContext = Object.assign({}, context, component._childContext, childContext);
            }
            component._patch(lastInput, nextInput, parentDom, subLifecycle, childContext, component._isSVG, false);
            subLifecycle.trigger();
            component.componentDidUpdate(props, prevState);
            options.afterUpdate && options.afterUpdate(vNode);
        }
        var dom = vNode.dom = nextInput.dom;
        var componentToDOMNodeMap = component._componentToDOMNodeMap;
        componentToDOMNodeMap && componentToDOMNodeMap.set(component, nextInput.dom);
        updateParentComponentVNodes(vNode, dom);
        if (!isNullOrUndef$1(callback)) {
            callback();
        }
    } else if (!isNullOrUndef$1(callback)) {
        callback();
    }
}

var Component = function () {
    function Component(props, context) {
        babelHelpers.classCallCheck(this, Component);

        this.state = {};
        this.refs = {};
        this._blockRender = false;
        this._ignoreSetState = false;
        this._blockSetState = false;
        this._deferSetState = false;
        this._pendingSetState = false;
        this._syncSetState = true;
        this._pendingState = {};
        this._lastInput = null;
        this._vNode = null;
        this._unmounted = true;
        this._lifecycle = null;
        this._childContext = null;
        this._patch = null;
        this._isSVG = false;
        this._componentToDOMNodeMap = null;
        /** @type {object} */
        this.props = props || EMPTY_OBJ;
        /** @type {object} */
        this.context = context || EMPTY_OBJ; // context should not be mutable
    }

    babelHelpers.createClass(Component, [{
        key: 'render',
        value: function render(nextProps, nextState, nextContext) {}
    }, {
        key: 'forceUpdate',
        value: function forceUpdate(callback) {
            if (this._unmounted) {
                return;
            }
            isBrowser$1 && applyState(this, true, callback);
        }
    }, {
        key: 'setState',
        value: function setState(newState, callback) {
            if (this._unmounted) {
                return;
            }
            if (!this._blockSetState) {
                if (!this._ignoreSetState) {
                    queueStateChanges(this, newState, callback, this._syncSetState);
                }
            } else {
                if (false) {}
                throwError$1();
            }
        }
    }, {
        key: 'setStateSync',
        value: function setStateSync(newState) {
            if (this._unmounted) {
                return;
            }
            if (!this._blockSetState) {
                if (!this._ignoreSetState) {
                    queueStateChanges(this, newState, null, true);
                }
            } else {
                if (false) {}
                throwError$1();
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState, prevContext) {}
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, context) {
            return true;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, context) {}
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState, nextContext) {}
    }, {
        key: 'getChildContext',
        value: function getChildContext() {}
    }, {
        key: '_updateComponent',
        value: function _updateComponent(prevState, nextState, prevProps, nextProps, context, force, fromSetState) {
            if (this._unmounted === true) {
                if (false) {}
                throwError$1();
            }
            if (prevProps !== nextProps || nextProps === EMPTY_OBJ || prevState !== nextState || force) {
                if (prevProps !== nextProps || nextProps === EMPTY_OBJ) {
                    if (!fromSetState) {
                        this._blockRender = true;
                        this.componentWillReceiveProps(nextProps, context);
                        this._blockRender = false;
                    }
                    if (this._pendingSetState) {
                        nextState = Object.assign({}, nextState, this._pendingState);
                        this._pendingSetState = false;
                        this._pendingState = {};
                    }
                }
                var shouldUpdate = this.shouldComponentUpdate(nextProps, nextState, context);
                if (shouldUpdate || force) {
                    this._blockSetState = true;
                    this.componentWillUpdate(nextProps, nextState, context);
                    this._blockSetState = false;
                    this.props = nextProps;
                    this.state = nextState;
                    this.context = context;
                    options.beforeRender && options.beforeRender(this);
                    var render = this.render(nextProps, nextState, context);
                    options.afterRender && options.afterRender(this);
                    return render;
                } else {
                    this.props = nextProps;
                    this.state = nextState;
                    this.context = context;
                }
            }
            return NO_OP$1;
        }
    }]);
    return Component;
}();

/*  weak */
var RULE_TYPE = 1;

function createDOMInterface(renderer, node) {
  return function (change) {
    // only use insertRule in production as browser devtools might have
    // weird behavior if used together with insertRule at runtime
    if (true && change.type === RULE_TYPE && !change.media) {
      try {
        node.sheet.insertRule(change.selector + '{' + change.declaration + '}', node.sheet.cssRules.length);
      } catch (error) {
        // TODO: MAYBE WARN IN DEV MODE
      }
    } else {
      node.textContent = renderer.renderToString();
    }
  };
}

function isValidHTMLElement(mountNode) {
  return mountNode && mountNode.nodeType === 1;
}

function render$1(renderer, mountNode) {
  // mountNode must be a valid HTML element to be able
  // to set mountNode.textContent later on
  if (!isValidHTMLElement(mountNode)) {
    throw new Error('You need to specify a valid element node (nodeType = 1) to render into.');
  }

  // warns if the DOM node either is not a valid <style> element
  // thus the styles do not get applied as Expected
  // or if the node already got the data-fela-stylesheet attribute applied
  // suggesting it is already used by another Renderer
  void 0;

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
        render$1(renderer, mountNode);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return Provider;
}(Component);

function isStatefulComponent$2(o) {
    return !isUndefined$2(o.prototype) && !isUndefined$2(o.prototype.render);
}
function isNullOrUndef$2(obj) {
    return isUndefined$2(obj) || isNull$2(obj);
}
function isInvalid$2(obj) {
    return isNull$2(obj) || obj === false || isTrue$2(obj) || isUndefined$2(obj);
}
function isAttrAnEvent$2(attr) {
    return attr[0] === 'o' && attr[1] === 'n' && attr.length > 3;
}
function isString$2(obj) {
    return typeof obj === 'string';
}
function isNull$2(obj) {
    return obj === null;
}
function isTrue$2(obj) {
    return obj === true;
}
function isUndefined$2(obj) {
    return obj === undefined;
}
function isObject$2(o) {
    return (typeof o === 'undefined' ? 'undefined' : babelHelpers.typeof(o)) === 'object';
}

var componentHooks = {
    onComponentWillMount: true,
    onComponentDidMount: true,
    onComponentWillUnmount: true,
    onComponentShouldUpdate: true,
    onComponentWillUpdate: true,
    onComponentDidUpdate: true
};
function createElement(name, props) {
    if (isInvalid$2(name) || isObject$2(name)) {
        throw new Error('Inferno Error: createElement() name parameter cannot be undefined, null, false or true, It must be a string, class or function.');
    }

    for (var _len = arguments.length, _children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        _children[_key - 2] = arguments[_key];
    }

    var children = _children;
    var ref = null;
    var key = null;
    var events = null;
    var flags = 0;
    if (_children) {
        if (_children.length === 1) {
            children = _children[0];
        } else if (_children.length === 0) {
            children = undefined;
        }
    }
    if (isString$2(name)) {
        switch (name) {
            case 'svg':
                flags = 128 /* SvgElement */;
                break;
            case 'input':
                flags = 512 /* InputElement */;
                break;
            case 'textarea':
                flags = 1024 /* TextareaElement */;
                break;
            case 'select':
                flags = 2048 /* SelectElement */;
                break;
            default:
                flags = 2 /* HtmlElement */;
                break;
        }
        /*
         This fixes de-optimisation:
         uses object Keys for looping props to avoid deleting props of looped object
         */
        if (!isNullOrUndef$2(props)) {
            var propKeys = Object.keys(props);
            for (var i = 0, len = propKeys.length; i < len; i++) {
                var propKey = propKeys[i];
                if (propKey === 'key') {
                    key = props.key;
                    delete props.key;
                } else if (propKey === 'children' && isUndefined$2(children)) {
                    children = props.children; // always favour children args, default to props
                } else if (propKey === 'ref') {
                    ref = props.ref;
                } else if (isAttrAnEvent$2(propKey)) {
                    if (!events) {
                        events = {};
                    }
                    events[propKey] = props[propKey];
                    delete props[propKey];
                }
            }
        }
    } else {
        flags = isStatefulComponent$2(name) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
        if (!isUndefined$2(children)) {
            if (!props) {
                props = {};
            }
            props.children = children;
            children = null;
        }
        if (!isNullOrUndef$2(props)) {
            /*
             This fixes de-optimisation:
             uses object Keys for looping props to avoid deleting props of looped object
             */
            var _propKeys = Object.keys(props);
            for (var _i = 0, _len2 = _propKeys.length; _i < _len2; _i++) {
                var _propKey = _propKeys[_i];
                if (componentHooks[_propKey]) {
                    if (!ref) {
                        ref = {};
                    }
                    ref[_propKey] = props[_propKey];
                } else if (_propKey === 'key') {
                    key = props.key;
                    delete props.key;
                }
            }
        }
    }
    return createVNode(flags, name, props, children, events, key, ref);
}

var generateDisplayName = function generateDisplayName(Comp) {
  var displayName = Comp.displayName || Comp.name;
  if (displayName) {
    return 'Fela' + displayName;
  }

  return 'ConnectedFelaComponent';
};

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
        value: function render() {
          // invoke props and renderer to render all styles
          var _context = this.context,
              renderer = _context.renderer,
              theme = _context.theme;


          var styles = mapStylesToProps(babelHelpers.extends({}, this.props, {
            theme: theme || {}
          }))(renderer);

          return createElement(Comp, babelHelpers.extends({}, this.props, {
            styles: styles
          }));
        }
        // reuse the initial displayName name

      }]);
      return EnhancedComponent;
    }(Component), _class.displayName = generateDisplayName(Comp), _temp;
  };
}

/*  weak */
function extractPassThroughProps(passThrough, ruleProps) {
  return passThrough.reduce(function (output, prop) {
    output[prop] = ruleProps[prop];
    return output;
  }, {});
}

/*  weak */
function resolvePassThrough(passThrough, ruleProps) {
  if (passThrough instanceof Function) {
    return Object.keys(passThrough(ruleProps));
  }

  return passThrough;
}

/*  weak */
function assignStyles(base) {
  for (var _len = arguments.length, extendingStyles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    extendingStyles[_key - 1] = arguments[_key];
  }

  for (var i = 0, len = extendingStyles.length; i < len; ++i) {
    var style = extendingStyles[i];

    for (var property in style) {
      var value = style[property];
      var baseValue = base[property];

      if (baseValue instanceof Object) {
        if (Array.isArray(baseValue)) {
          if (Array.isArray(value)) {
            base[property] = [].concat(babelHelpers.toConsumableArray(baseValue), babelHelpers.toConsumableArray(value));
          } else {
            base[property] = [].concat(babelHelpers.toConsumableArray(baseValue), [value]);
          }
          continue;
        }

        if (value instanceof Object && !Array.isArray(value)) {
          base[property] = assignStyles({}, baseValue, value);
          continue;
        }
      }

      base[property] = value;
    }
  }

  return base;
}

function combineRules() {
  for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
    rules[_key] = arguments[_key];
  }

  return function (props) {
    var style = {};

    for (var i = 0, len = rules.length; i < len; ++i) {
      assignStyles(style, rules[i](props));
    }

    return style;
  };
}

function createComponent(rule) {
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

    componentProps.style = ruleProps.style;
    componentProps.id = ruleProps.id;
    componentProps.ref = ruleProps.innerRef;

    var customType = ruleProps.is || type;
    var cls = ruleProps.className ? ruleProps.className + ' ' : '';
    ruleProps.theme = theme || {};

    componentProps.className = cls + renderer.renderRule(combinedRule, ruleProps);
    return createElement(customType, componentProps, children);
  };

  // use the rule name as display name to better debug with react inspector
  FelaComponent.displayName = rule.name ? rule.name : 'FelaComponent';
  FelaComponent._isFelaComponent = true;

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
        theme: babelHelpers.extends({}, !overwrite ? previousTheme || {} : {}, theme)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return ThemeProvider;
}(Component);

ThemeProvider.defaultProps = { overwrite: false };

var index = {
  Provider: Provider,
  connect: connect,
  createComponent: createComponent,
  ThemeProvider: ThemeProvider
};

export default index;