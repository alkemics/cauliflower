export default class Cauliflower {
  constructor(host) {
    this.config = config;
    this.patternCallbacks = [];
    this.simpleCallbacks = {};
    this.currentId = 0;
    this.plugins = {};
  }
  on (pattern, handler) {
    var id = this.currentId++;
    var handler = { id, pattern, callback };
    if (typeof handler === 'string') {
      callback = plugins[handler].catch.bind(plugins[handler]);
    } else {
      callback = handler;
    }
    if (pattern instanceof RegExp) {
      this.patternCallbacks.push(handler);
    } else if (typeof pattern === 'string') {
      if (this.simpleCallbacks[pattern] == null) {
          this.simpleCallbacks = [];
      }
      this.simpleCallbacks.push(handler);
    }
    return id;
  }
  off (id) {
    for (var key in this.simpleCallbacks) {
      this.simpleCallbacks[key].filter((handler) => {
        if (handler.id === id) return false;
        return true;
      }
    }
    this.patternCallbacks.filter((handler) => {
      if (handler.id === id) return false;
      return true;
    }
  }
  throw (identifier, ...args) {
    if (this.simpleCallbacks[identifier]) {
      this.simpleCallbacks[identifier].forEach((handler) => {
        handler.callback(...args);
      }
    }
    if (this.patternCallbacks.length) {
      this.patternCallbacks.forEach((handler) => {
        if (identifier.match(handler.pattern) !== null) {
          handler.callback(...args);
        }
      });
    }
  }
}
