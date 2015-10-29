var sentry = {
  name: 'sentry',
  catch: (...args) => {
    console.log('HAHAHA', ...args);
  },
  config: (apikey) => {
    this.apikey = apikey;
  }
};
export default sentry;
