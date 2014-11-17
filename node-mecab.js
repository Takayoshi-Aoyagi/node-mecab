"use strict";

var child_process = require('child_process'),
    util = require('util');

var Mecab = function () {};

function execCommand (command, callback) {
    var error,
	child;
    child = child_process.exec(command, function (err, stdout, stderr) {
	if (err) {
	    error += err;
	}
	if (stderr) {
	    error += stderr;
	}
	callback(error, stdout);
    });
}

function parse(data, callback) {
    var result = [];
    var regexp = /^(.+)\t(.+),(.+),(.+),(.+),(.+),(.+),(.+),(.+),(.+)$/
	var lines = data.split('\n');
    if (!lines) {
	callback('Invalid Result!', null);
	return;
    }
    lines.forEach(function (line) {
	var arr = line.match(regexp);
	if (!arr) {
	    return;
	}
	result.push(arr.splice(1));
    });
    callback(null, result);
}


Mecab.exec = function (str, callback) {
    var command = util.format('echo "%s" | mecab', str);
    
    execCommand(command, function (err, data) {
	if (err) {
	    callback(err, null);
	    return;
	}
	parse(data, function (err, result) {
	    if (err) {
		callback(err, null);
		return;
	    }
	    callback(null, result);
	});
    });
};

module.exports = Mecab;
