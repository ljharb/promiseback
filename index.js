var Deferred = require('promise-deferred');
var Promise = Deferred.Promise;

var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isFunction = function (fn) {
	return '[object Function]' === toStr.call(fn);
};


module.exports = function promiseback(callback) {
	var promise;
	if (arguments.length > 1) {
		promise = Promise.resolve(arguments[0]);
		callback = arguments[1];
	}
	var callbackIsFn = isFunction(callback);

	// invalid callback
	if (callback != null && !callbackIsFn) {
		throw new TypeError('callback must be a function if present');
	}

	var promisebacked = new Deferred();

	if (callbackIsFn) {
		promisebacked.promise.nodeify(callback);
	}

	if (promise) {
		promise.then(promisebacked.resolve, promisebacked.reject);
	}
	return promise ? promisebacked.promise : promisebacked;
};
module.exports.Deferred = Deferred;

