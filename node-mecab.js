"use strict";

var child_process = require('child_process'),
    util = require('util');

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
    var regexp = /^(.+)\t(.+)$/;
    var lines = data.split('\n');
    if (!lines) {
	callback('Invalid Result!', null);
	return;
    }
    lines.forEach(function (line) {
	var array = Mecab.parseLine(line);
	if (array === null) {
	    return; // continue;
	}
	if (!util.isArray(array)) {
	    console.log(array);
	    throw new Error("parseLine: malformed return value.");
	}
	result.push(array);
    });
    callback(null, result);
}

var Mecab = function () {};

/**
 * set your mecab path
 */
Mecab.COMMAND = '/usr/local/bin/mecab';

/**
 * set your line parser
 */
Mecab.parseLine = function (line) {
    var arr = line.split(/\t|\,/);
    if (!arr || arr.length < 2) {
	return null;
    }
    return arr;
};

Mecab.exec = function (str, callback) {
    var command = util.format('echo "%s" | %s', str, Mecab.COMMAND);
    
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
