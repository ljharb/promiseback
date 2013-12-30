#promiseback <sup>[![Version Badge][2]][1]</sup>

[![Build Status][3]][4] [![dependency status][5]][6] [![dev dependency status][7]][8]

[![npm badge][11]][1]

[![browser support][9]][10]

Accept an optional node-style callback, and also return a spec-compliant Promise!

## API
```js
var promiseback = require('promiseback');
var callback = function (err, value) {};

/* without a promise: */
promiseback(callback);
	/*
		- will throw if `callback` is not a function
		- returns a Q deferred
		- has resolve/reject methods, and `promise` property
		- will call `callback` as expected when deferred is resolved
	*/

/* with a promise: */
promiseback(promise, callback);
	/*
		- will throw if `callback` is truthy and not a function
		- `promise` will be wrapped in Q, so you can pass a value as well
		- returns a Q promise
		- will call `callback` as expected when the promise is fulfilled
	*/
```

## Examples

Using deferreds:
```js
var promiseback = require('promiseback');

module.exports = function doSomethingCool(thing, callback) {
	// If callback is not provided, this code will simply return a normal promise.
	// If callback is provided but is not a function, promiseback will immediately throw a TypeError.

	// "deferred" is the result of Q.defer()
	var deferred = promiseback(callback);
	if (thing) {
		deferred.resolve(thing);
	} else {
		deferred.reject(thing);
	}
	return deferred.promise;
};
```

Using a straight promise, when you can get it from somewhere else:
```js
var promiseback = require('promiseback');

module.exports = function doSomethingCool(thing, callback) {
	// If callback is not provided, this code will simply return a normal promise.
	// If callback is provided but is not a function, promiseback will immediately throw a TypeError.

	var newThingPromise = makeNewThing(thing);
	return promiseback(newThingPromise, callback);
};
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[1]: https://npmjs.org/package/promiseback
[2]: http://vb.teelaun.ch/ljharb/promiseback.svg
[3]: https://travis-ci.org/ljharb/promiseback.png
[4]: https://travis-ci.org/ljharb/promiseback
[5]: https://david-dm.org/ljharb/promiseback.png
[6]: https://david-dm.org/ljharb/promiseback
[7]: https://david-dm.org/ljharb/promiseback/dev-status.png
[8]: https://david-dm.org/ljharb/promiseback#info=devDependencies
[9]: https://ci.testling.com/ljharb/promiseback.png
[10]: https://ci.testling.com/ljharb/promiseback
[11]: https://nodei.co/npm/promiseback.png?downloads=true&stars=true

