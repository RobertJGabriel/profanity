var request = require("request");
var chalk = require('chalk');
var async = require('async');



module.exports = function (word, callback) {
    request({
        uri: "http://www.wdyl.com/profanity?q=" + encodeURI(word),
        async: true,
    }, function (error, response, body) {
        if (error) {
            callback(error);
            return;
        }

        obj = JSON.parse(body);
        callback(obj.response);
    });
}