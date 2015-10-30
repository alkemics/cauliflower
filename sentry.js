import Raven from 'raven-js';

var sentry = {
  name: 'sentry',
  catch: (e) => {
    Raven.captureException(e);
  },
  setDSN: (dsn) => {
    Raven.config(dsn).install();
  },
  setUserContext: (context) => {
    Raven.setUserContext(context);
  }
};
export default sentry;
