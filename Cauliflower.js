export default class Cauliflower {

  constructor() {
    this.patternCallbacks = [];
    this.simpleCallbacks = {};
    this.currentId = 0;
    this.plugins = {};
  }

  addPlugin (plugin) {
    this.plugins[plugin.name] = plugin;
  }

  removePlugin (name) {
    this.plugins[name];
  }

  on (pattern, handler) {
    var id = this.currentId++;
    var callback;
    if (typeof handler === 'string') {
      callback = plugins[handler].catch.bind(plugins[handler]);
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
      this.simpleCallbacks[key].filter((handler) => {
        if (handler.id === id) return false;
        return true;
      });
    }
    this.patternCallbacks.filter((handler) => {
      if (handler.id === id) return false;
      return true;
    });
  }

  throw (identifier, ...args) {
    console.log(this.simpleCallbacks);
    if (this.simpleCallbacks[identifier]) {
      this.simpleCallbacks[identifier].forEach((handler) => {
        console.log(handler);
        handler.callback(...args);
      });
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
