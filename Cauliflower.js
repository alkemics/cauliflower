export default class Cauliflower {

  constructor () {
    this.patternCallbacks = [];
    this.simpleCallbacks = {};
    this.currentId = 0;
    this.handlers = {};
  }

  addHandler (handler) {
    this.handlers[handler.name] = handler;
  }

  removeHandler (name) {
    this.handlers[name];
  }

  on (pattern, handler) {
    var id = this.currentId++;
    var callback;
    if (typeof handler === 'string') {
      callback = this.handlers[handler].catch.bind(this.handlers[handler]);
    } else {
      callback = handler;
    }
    var handler = { id, pattern, callback };
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

  off (id) {
    for (var key in this.simpleCallbacks) {
      this.simpleCallbacks[key] = this.simpleCallbacks[key].filter((handler) => {
        if (handler.id === id) return false;
        return true;
      });
    }
    this.patternCallbacks = this.patternCallbacks.filter((handler) => {
      if (handler.id === id) return false;
      return true;
    });
  }

  throw (identifier, ...args) {
    if (this.simpleCallbacks[identifier]) {
      this.simpleCallbacks[identifier].forEach((handler) => {
        handler.callback(identifier, ...args);
      });
    }
    if (this.patternCallbacks.length) {
      this.patternCallbacks.forEach((handler) => {
        if (identifier.match(handler.pattern) !== null) {
          handler.callback(identifier, ...args);
        }
      });
    }
  }
}
