var request = require("request");
var chalk = require('chalk');
var async = require('async');
module.exports = function(word) {
	async.waterfall([

		function(callback) {
			request({
				uri: "http://www.wdyl.com/profanity?q=" + encodeURI(word),
				async: true,
			}, function(error, response, body) {
				if (error) {
					callback(error);
					return;
				}
				obj = JSON.parse(body);
				callback(null, obj.response);
			});
		}
	], function(err, result) {
		return result;
	});
};