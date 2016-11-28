var tape = require('tape');
var emitonoff = require('..');

tape('should allow creation without an object', function(t) {
  var kitty = emitonoff();
  t.ok(kitty, 'created emitonoff');
  t.end();
})

tape('should handle subscriptions', function(t) {
  var complete = false;
  var kitty = emitonoff();
  kitty.on('purr', function() {
    complete = true;
  });
  kitty.emit('purr');
  t.ok(complete, 'subscription handled');
  t.end();
})

tape('should handle subscriptions with an existing object', function(t) {
  var complete = false;
  var kitty = {
    purr: function() {
      this.emit('purr');
    }
  };

  emitonoff(kitty);

  kitty.on('purr', function() {
    complete = true;
  });

  kitty.purr();
  t.ok(complete, 'subscription with obj handled');
  t.end();
});

tape('should emit nothing with no subscribers', function(t) {
  var complete = false;
  var kitty = {
    purr: function() {
      this.emit('purr');
    }
  };

  emitonoff(kitty);

  function shouldNotRun() {
    t.fail('this should not fire');
  }

  kitty.on('purr', shouldNotRun);
  kitty.off('purr', shouldNotRun);

  kitty.purr();
  t.end();
})

tape('should emit nothing when paused', function(t) {
  var complete = false;
  var kitty = {
    purr: function() {
      this.emit('purr');
    }
  };

  emitonoff(kitty);

  kitty.pause();

  kitty.on('purr', function() {
    t.fail('this should not fire');
  });

  kitty.purr();
  t.end();
})

tape('should emit when resumed', function(t) {
  var complete = false;
  var kitty = {
    purr: function() {
      this.emit('purr');
    }
  };

  emitonoff(kitty);

  kitty.pause();
  kitty.on('purr', function() {
    complete = true;
  });
  kitty.purr();
  t.ok(!complete, 'purr not called yet because paused')
  kitty.resume();
  t.ok(complete, 'resumed')
  t.end();
})

tape('should emit things when resumed', function(t) {
  var complete = false;
  var kitty = {
    purr: function(payload) {
      this.emit('purr', payload);
    }
  };

  emitonoff(kitty);

  kitty.pause();

  var testPayload0 = {
    payloadIndex: 0,
    foo: 'bar',
    baz: {
      foo: 'nested',
      allGood: 1
    }
  };

  var testPayload1 = {
    payloadIndex: 1,
    key: 'awesome',
    status: 'works great'
  }

  kitty.on('purr', function(payload) {
    switch (payload[0].payloadIndex) {
      case 0:
        t.deepEquals(payload[0], testPayload0, 'payload 0 ok');
        break;
      case 1:
        t.deepEquals(payload[0], testPayload1, 'payload 1 ok');
        break;
      default:
        t.fail('not handled');
        break;
    }
    complete = true;
  });
  kitty.purr(testPayload0);
  kitty.purr(testPayload1);
  t.ok(!complete, 'purr not called yet because paused');
  kitty.resume();
  t.ok(complete, 'resumed');
  t.end();
});
