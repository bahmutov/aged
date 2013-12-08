var mockery = require('mockery');
var moment = require('moment');
var aged = require('..');

gt.module('aged - invalid inputs');

gt.test('invalid inputs', function () {
  gt.throws(function () {
    aged();
  }, Error, 'no inputs');

  gt.throws(function () {
    aged('10', 'days');
  }, Error, 'not a number');

  gt.throws(function () {
    aged(-1, 'days');
  }, Error, 'negative number');

  gt.throws(function () {
    aged(0, 'days');
  }, Error, 'zero number');

  gt.throws(function () {
    aged(10);
  }, Error, 'missing units');

  gt.throws(function () {
    aged(10, 'ffff');
  }, 'AssertionError', 'invalid units');
});

gt.test('returns function', function () {
  var fn = aged(1, 'days');
  gt.arity(fn, 1, 'filter function expects 1 argument');
});

gt.test('checks filename', function () {
  gt.throws(function () {
    var fn = aged(2, 'minutes');
    fn();
  }, 'TypeError', 'needs filename');
});

gt.module('filtering files', {
  setupOnce: function () {
    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    var fsMock = {
      statSync: function (path) {
        if (path === 'young.txt') {
          return {
            mtime: moment().subtract(1, 'minute').valueOf()
          };
        } else if (path === 'old.txt') {
          return {
            mtime: moment().subtract(100, 'days').valueOf()
          };
        }
      }
    };
    mockery.registerMock('fs', fsMock);
    aged = require('..');
  },
  tearDownOnce: function () {
    mockery.deregisterMock('fs');
    mockery.disable();
  }
});

gt.test('young file is NOT filtered', function () {
  var fn = aged(1, 'hour');
  gt.ok(!fn('young.txt'), 'file is too young');
});

gt.test('old file is filtered', function () {
  var fn = aged(1, 'hour');
  gt.ok(fn('old.txt'), 'file is aged, will be filtered');
});

gt.test('verbose setting', function () {
  gt.arity(aged, 3, 'expects at most 3 arguments');
  var fn = aged(1, 'hour', true);
  fn('young.txt');
});
