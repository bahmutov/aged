var fs = require('fs');
var moment = require('moment');
var check = require('check-types');

function aged(n, units) {
  check.verify.positiveNumber(n, 'expected positive number, got ' + n);
  check.verify.unemptyString(units, 'expected units string, got ' + units);

  var now = moment();
  var midnight = now.startOf('day');

  var stableDate = now.subtract(units, n).startOf('day');
  console.assert(stableDate.isValid(), 'aged date is invalid from', n, units);
  console.assert(midnight.valueOf() !== stableDate.valueOf(),
    'stable date is same as now, are units correct?', n, units);

  return function (filename) {
    var st = fs.statSync(filename);
    var lastDate = moment(st.mtime);
    var before = lastDate.isBefore(stableDate);

    if (!before) {
      console.log(filename, 'is too young');
    }
    return before;
  };
}

module.exports = aged;
