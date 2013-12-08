var fs = require('fs');
var moment = require('moment');
var check = require('check-types');

function aged(n, units, verbose) {
  check.verify.positiveNumber(n, 'expected positive number, got ' + n);
  check.verify.unemptyString(units, 'expected units string, got ' + units);

  var now = moment();
  var stableDate = moment(now).subtract(units, n);
  console.assert(stableDate.isValid(), 'aged date is invalid from', n, units);
  console.assert(now.valueOf() !== stableDate.valueOf(),
    'stable date is same as now, are units correct?', n, units);

  // midnight cutoff seems more natural
  stableDate.startOf('day');

  return function agedFilter(filename) {
    var st = fs.statSync(filename);
    var lastDate = moment(st.mtime);
    var before = lastDate.isBefore(stableDate);

    if (!before && verbose) {
      console.log(filename, 'is too young');
    }
    return before;
  };
}

module.exports = aged;
