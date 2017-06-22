'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineRules;

var _assignStyle = require('css-in-js-utils/lib/assignStyle');

var _assignStyle2 = _interopRequireDefault(_assignStyle);

var _felaUtils = require('fela-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function combineRules() {
  for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
    rules[_key] = arguments[_key];
  }

  return function (props) {
    return (0, _felaUtils.arrayReduce)(rules, function (style, rule) {
      return (0, _assignStyle2.default)(style, rule(props));
    }, {});
  };
}