# cauliflower
A simple error handler library

## Installation
`npm install --save cauliflower`

## Simple use case

```
var cauliflower = require('cauliflower');

cauliflower.on('Error.api.networkUnavailable', function (name, e) {
  console.log('Error ' + e.message);
});
```

And elsewhere

```
var cauliflower = require('cauliflower');
var error = { message: 'Network is unavaiable' };
cauliflower.throw('Error.api.networkUnavailable', error);
```

## Pattern

```
var cauliflower = require('cauliflower');

cauliflower.on(/^Error/, function (name, e) {
  console.log('Error ' + e.message);
});

var error = { message: 'Permission denied' };
cauliflower.throw('Error.permission', error);
```

## Handlers
```
var cauliflower = require('cauliflower');

var myHandler = {
  name: 'myUberHandler',
  catch: function (name, e) {
    console.log('Error ' + name + ' catched: ' + e);
  }
};

cauliflower.addHandler(myHandler);

cauliflower.on(/^Error/, 'myUberHandler');

var error = { message: 'Permission denied' };
cauliflower.throw('Error.permission', error);
```
