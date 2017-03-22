import require$$0 from 'zlib';
import require$$1 from 'stream';

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

var index$1 = __commonjs(function (module) {
var Stream = require$$1;
var writeMethods = ["write", "end", "destroy"];
var readMethods = ["resume", "pause"];
var readEvents = ["data", "close"];
var slice = Array.prototype.slice;

module.exports = duplex;

function forEach(arr, fn) {
    if (arr.forEach) {
        return arr.forEach(fn);
    }

    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i);
    }
}

function duplex(writer, reader) {
    var stream = new Stream();
    var ended = false;

    forEach(writeMethods, proxyWriter);

    forEach(readMethods, proxyReader);

    forEach(readEvents, proxyStream);

    reader.on("end", handleEnd);

    writer.on("drain", function () {
        stream.emit("drain");
    });

    writer.on("error", reemit);
    reader.on("error", reemit);

    stream.writable = writer.writable;
    stream.readable = reader.readable;

    return stream;

    function proxyWriter(methodName) {
        stream[methodName] = method;

        function method() {
            return writer[methodName].apply(writer, arguments);
        }
    }

    function proxyReader(methodName) {
        stream[methodName] = method;

        function method() {
            stream.emit(methodName);
            var func = reader[methodName];
            if (func) {
                return func.apply(reader, arguments);
            }
            reader.emit(methodName);
        }
    }

    function proxyStream(methodName) {
        reader.on(methodName, reemit);

        function reemit() {
            var args = slice.call(arguments);
            args.unshift(methodName);
            stream.emit.apply(stream, args);
        }
    }

    function handleEnd() {
        if (ended) {
            return;
        }
        ended = true;
        var args = slice.call(arguments);
        args.unshift("end");
        stream.emit.apply(stream, args);
    }

    function reemit(err) {
        stream.emit("error", err);
    }
}
});

var require$$2 = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

var index = __commonjs(function (module) {
'use strict';

var duplexer = require$$2;
var stream = require$$1;
var zlib = require$$0;
var opts = { level: 9 };

module.exports = function (str, cb) {
	if (!str) {
		cb(null, 0);
		return;
	}

	zlib.gzip(str, opts, function (err, data) {
		if (err) {
			cb(err, 0);
			return;
		}

		cb(err, data.length);
	});
};

module.exports.sync = function (str) {
	return zlib.gzipSync(str, opts).length;
};

module.exports.stream = function () {
	var input = new stream.PassThrough();
	var output = new stream.PassThrough();
	var wrapper = duplexer(input, output);

	var gzipSize = 0;
	var gzip = zlib.createGzip(opts).on('data', function (buf) {
		gzipSize += buf.length;
	}).on('error', function () {
		wrapper.gzipSize = 0;
	}).on('end', function () {
		wrapper.gzipSize = gzipSize;
		wrapper.emit('gzip-size', gzipSize);
		output.end();
	});

	input.pipe(gzip);
	input.pipe(output, { end: false });

	return wrapper;
};
});

var gzipSize = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);

var RULE_TYPE = 1;

function lengthInUtf8Bytes(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

function addStatistics(renderer) {
  var statistics = {
    count: {
      classes: 0,
      pseudoClasses: 0
    },
    usage: {},
    size: {},
    reuse: {},
    totalPseudoClasses: 0,
    totalMediaQueryClasses: 0,
    totalClasses: 0,
    totalRenders: 0,
    totalUsage: 0
  };

  function addClassNamesToUsage(classNames) {
    classNames.split(' ').forEach(function (className) {
      if (!statistics.usage[className]) {
        statistics.usage[className] = 0;
      }
      statistics.usage[className]++;
      statistics.totalUsage++;
    });
  }

  var existingRenderRule = renderer.renderRule;
  renderer.renderRule = function renderRule() {
    statistics.totalRenders++;
    var classNames = existingRenderRule.apply(renderer, arguments);
    addClassNamesToUsage(classNames);
    return classNames;
  };

  renderer.subscribe(function (_ref) {
    var type = _ref.type,
        selector = _ref.selector,
        media = _ref.media,
        isStatic = _ref.static;

    if (type === RULE_TYPE && !isStatic) {
      statistics.totalClasses++;
      var isPseudoSelector = selector.indexOf(':') > -1;
      if (media) {
        statistics.totalMediaQueryClasses++;

        if (!statistics.count[media]) {
          statistics.count[media] = {
            pseudoClasses: 0,
            classes: 0
          };
        }

        if (isPseudoSelector) {
          statistics.totalPseudoClasses++;
          statistics.count[media].pseudoClasses++;
        } else {
          statistics.count[media].classes++;
        }
      } else {
        statistics.totalClasses++;

        if (isPseudoSelector) {
          statistics.totalPseudoClasses++;
          statistics.count.pseudoClasses++;
        } else {
          statistics.count.classes++;
        }
      }
    }
  });

  function calculateReuse() {
    var quotient = (statistics.totalUsage - statistics.totalClasses) / statistics.totalUsage;
    return Math.floor(quotient * 10000) / 10000;
  }

  renderer.getStatistics = function () {
    var currentStats = babelHelpers.extends({}, statistics);

    var reuse = calculateReuse();
    currentStats.reuse = {
      percentage: reuse * 100 + '%',
      number: reuse
    };

    var currentCSS = renderer.renderToString();
    var bytes = lengthInUtf8Bytes(currentCSS);

    currentStats.size = {
      bytes: bytes,
      bytesGzipped: gzipSize.sync(currentCSS),
      kbytes: Math.floor(bytes / 10) / 100,
      kbytesGzipped: Math.floor(gzipSize.sync(currentCSS) / 10) / 100
    };

    return currentStats;
  };

  return renderer;
}

var statistics = (function () {
  return addStatistics;
});

export default statistics;