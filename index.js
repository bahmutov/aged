var fs = require('fs');
var moment = require('moment');
var check = require('check-types');

function aged(n, units) {
  check.verify.positiveNumber(n, 'expected positive number, got ' + n);
  check.verify.unemptyString(units, 'expected units string, got ' + units);

  var fmt = 'dddd, MMMM Do, HH:mm';
  var stableDate = moment().subtract(units, n).startOf('day');

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
