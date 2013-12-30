var Q = require('q');

var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isFunction = function (fn) {
	return fn && typeof fn === 'function' && '[object Function]' === toStr.call(fn);
};

module.exports = function promiseback(callback) {
	var promise;
	if (arguments.length > 1) {
		promise = Q(arguments[0]);
		callback = arguments[1];
	}
	var callbackIsFn = isFunction(callback);

	// invalid callback
	if (callback != null && !callbackIsFn) {
		throw new TypeError('callback must be a function if present');
	}

	var defer = Q.defer();

	if (callbackIsFn) {
		defer.promise.then(function (value) { callback(null, value); }, callback);
	}

	if (promise) {
		defer.resolve(promise);
	}
	return promise ? defer.promise : defer;
};

