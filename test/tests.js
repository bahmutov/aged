var moment = require('moment');
var aged = require('..');

gt.module('3rd party');


gt.module('aged');

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
});