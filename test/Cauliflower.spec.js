'use strict';

describe('Cauliflower', function () {
  var Cauliflower = require('../Cauliflower');

  it('should instantiate', function () {
    var cauliflower = new Cauliflower();
    expect(cauliflower).toBeDefined();
  });

  it('should respond on string pattern', function () {
    var cauliflower = new Cauliflower();
    cauliflower.on('Error1234', function (e) {
      expect(e.message).toEqual('triggered');
    });
    cauliflower.throw('NotTriggered', { message: 'should not be triggered' });
    cauliflower.throw('Error1234', { message: 'triggered' });
  });

  it('should respond on regexp pattern', function () {
    var cauliflower = new Cauliflower();
    cauliflower.on(/^Error/, function (e) {
      expect(e.message).toEqual('triggered');
    });
    cauliflower.throw('NotTriggered', { message: 'should not be triggered' });
    cauliflower.throw('Error1234.data', { message: 'triggered' });
  });

  it('should not respond if handler is off', function () {
    var cauliflower = new Cauliflower();
    var handlerId = cauliflower.on('Error1234', function (e) {
      // Tricks to make test fail. This test shouldn't be triggered
      expect(false).toBe(true);
    });
    expect(handlerId).toEqual(0);
    cauliflower.off(handlerId);
    cauliflower.throw('Error1234', { message: 'triggered' });
  });

  it('should can addPlugin', function () {
    var cauliflower = new Cauliflower();
    var handlerMock = {
      name: 'uberHandler',
      catch: function (e) {
        expect(e.message).toBe('handler triggered');
      }
    };
    cauliflower.addHandler(handlerMock);
    cauliflower.on('Error1234', 'uberHandler');
    cauliflower.throw('Error1234', { message: 'handler triggered' });
  });
});
