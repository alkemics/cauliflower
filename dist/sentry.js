'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ravenJs = require('raven-js');

var _ravenJs2 = _interopRequireDefault(_ravenJs);

var sentry = {
  name: 'sentry',
  'catch': function _catch(name, e) {
    sentry.setExtraContext(e);
    _ravenJs2['default'].captureException(name);
  },
  setDSN: function setDSN(dsn) {
    _ravenJs2['default'].config(dsn).install();
  },
  setExtraContext: function setExtraContext(context) {
    _ravenJs2['default'].setExtraContext(context);
  },
  setUserContext: function setUserContext(context) {
    _ravenJs2['default'].setUserContext(context);
  }
};
exports['default'] = sentry;
module.exports = exports['default'];
