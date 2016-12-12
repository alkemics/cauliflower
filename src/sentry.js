import Raven from 'raven-js';

const isObject = (what) => (typeof what === 'object' && what !== null);

const isError = (what) => (
  isObject(what) &&
  Object.prototype.toString.call(what) === '[object Error]' ||
  what instanceof Error
);

var sentry = {
  name: 'sentry',
  catch: (name, e) => {
    if (isError(e)) {
      Raven.captureException(e);
    } else {
      sentry.setExtraContext(e);
      Raven.captureException(name);
    }
  },
  setDSN: (dsn) => {
    Raven.config(dsn).install();
  },
  setExtraContext: (context) => {
    Raven.setExtraContext(context);
  },
  setUserContext: (context) => {
    Raven.setUserContext(context);
  }
};
export default sentry;
