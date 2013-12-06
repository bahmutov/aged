var fs = require('fs');
var moment = require('moment');

function aged(n, units) {
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
