import Raven from 'raven-js';

var sentry = {
  name: 'sentry',
  catch: (name, e) => {
    sentry.setExtraContext(e);
    Raven.captureException(name);
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
