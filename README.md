# aged

> Small utility returning grunt file filter by last modified age

[![NPM][aged-icon] ][aged-url]

[![Build status][aged-ci-image] ][aged-ci-url]
[![dependencies][aged-dependencies-image] ][aged-dependencies-url]
[![devdependencies][aged-devdependencies-image] ][aged-devdependencies-url]

[![endorse][endorse-image] ][endorse-url]

## install

```sh
npm install aged --save-dev
```

## use

*aged* can be used to define different metrics to run on different
files depending on their age. For example, to pass older, stable
source files through static [grunt-complexity](https://github.com/vigetlabs/grunt-complexity)
plugin you can:

```js
// Gruntfile.js

var aged = require('aged');
var files = ['Gruntfile.js', 'src/index.js'];

grunt.initConfig({
    complexity: {
        fresh: {
            src: files,
            options: {
                cyclomatic: 5,
                halstead: 10,
                maintainability: 100
            }
        },
        aged: {
            src: files,
            filter: aged(3, 'days'),
            options: {
                errorsOnly: false,
                cyclomatic: 2,
                halstead: 10,
                maintainability: 100
            }
        }
    }
});
```
This will pass all files though less stringent *fresh* limits,
while passing files older than 3 days though higher limits.

![sample output](https://raw.github.com/bahmutov/aged/master/aged.png)

I described the motivation behind this little filter in
[Aged to Perfection](http://bahmutov.calepin.co/aged-to-perfection.html) blog post.

## advanced

You can easily define the opposite filter to *aged*

```js
function fresher(n, units) {
    var isAged = aged(n, units);
    return function (filename) {
        return !isAged(filename);
    };
}
```
Any time units are allowed, see
[momentjs](http://momentjs.com/docs/#/durations/creating/) docs.

## Small print

Author: Gleb Bahmutov Copyright &copy; 2013

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet / open issue on Github

[aged-icon]: https://nodei.co/npm/aged.png?downloads=true
[aged-url]: https://npmjs.org/package/aged
[aged-ci-image]: https://travis-ci.org/bahmutov/aged.png?branch=master
[aged-ci-url]: https://travis-ci.org/bahmutov/aged
[aged-dependencies-image]: https://david-dm.org/bahmutov/aged.png
[aged-dependencies-url]: https://david-dm.org/bahmutov/aged
[aged-devdependencies-image]: https://david-dm.org/bahmutov/aged/dev-status.png
[aged-devdependencies-url]: https://david-dm.org/bahmutov/aged#info=devDependencies
[endorse-image]: https://api.coderwall.com/bahmutov/endorsecount.png
[endorse-url]: https://coderwall.com/bahmutov
