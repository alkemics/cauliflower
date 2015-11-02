(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Cauliflower = (function () {
  function Cauliflower() {
    _classCallCheck(this, Cauliflower);

    this.patternCallbacks = [];
    this.simpleCallbacks = {};
    this.currentId = 0;
    this.handlers = {};
  }

  _createClass(Cauliflower, [{
    key: 'addHandler',
    value: function addHandler(handler) {
      this.handlers[handler.name] = handler;
    }
  }, {
    key: 'removeHandler',
    value: function removeHandler(name) {
      this.handlers[name];
    }
  }, {
    key: 'on',
    value: function on(pattern, handler) {
      var id = this.currentId++;
      var callback;
      if (typeof handler === 'string') {
        callback = this.handlers[handler]['catch'].bind(this.handlers[handler]);
      } else {
        callback = handler;
      }
      var handler = { id: id, pattern: pattern, callback: callback };
      if (pattern instanceof RegExp) {
        this.patternCallbacks.push(handler);
      } else if (typeof pattern === 'string') {
        if (this.simpleCallbacks[pattern] == null) {
          this.simpleCallbacks[pattern] = [];
        }
        this.simpleCallbacks[pattern].push(handler);
      }
      return id;
    }
  }, {
    key: 'off',
    value: function off(id) {
      for (var key in this.simpleCallbacks) {
        this.simpleCallbacks[key] = this.simpleCallbacks[key].filter(function (handler) {
          if (handler.id === id) return false;
          return true;
        });
      }
      this.patternCallbacks = this.patternCallbacks.filter(function (handler) {
        if (handler.id === id) return false;
        return true;
      });
    }
  }, {
    key: 'throw',
    value: function _throw(identifier) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (this.simpleCallbacks[identifier]) {
        this.simpleCallbacks[identifier].forEach(function (handler) {
          handler.callback.apply(handler, [identifier].concat(args));
        });
      }
      if (this.patternCallbacks.length) {
        this.patternCallbacks.forEach(function (handler) {
          if (identifier.match(handler.pattern) !== null) {
            handler.callback.apply(handler, [identifier].concat(args));
          }
        });
      }
    }
  }]);

  return Cauliflower;
})();

exports['default'] = Cauliflower;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Cauliflower = require('./Cauliflower');

var _Cauliflower2 = _interopRequireDefault(_Cauliflower);

var cauliflower = new _Cauliflower2['default']();

exports['default'] = cauliflower;
module.exports = exports['default'];

},{"./Cauliflower":1}]},{},[2]);
