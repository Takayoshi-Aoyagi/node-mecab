var should = require('should');

var Mecab = require('./node-mecab');

describe('normarl case', function () {
    it('すもも', function (cb) {
	var str = "すもももももももものうち";
	Mecab.exec(str, function (err, result) {
	    should.not.exist(err);
	    console.log(result);
	    (7).should.be.exactly(result.length);
	    cb();
	});
    });

    it('English', function (cb) {
	Mecab.exec("I am Bob", function (err, result) {
	    should.not.exist(err);
	    console.log(result);
	    (3).should.be.exactly(result.length);
	    cb();
	});
    });
});

describe('parseLine', function () {
    it('', function (cb) {
	var str = "すもももももももものうち";
	Mecab.parseLine = function (line) {
	    var arr = line.split("\t");
	    if (arr.length < 2) {
		return null;
	    }
	    return arr;
	};
	Mecab.exec(str, function (err, result) {
	    should.not.exist(err);
	    console.log(result);
	    (7).should.be.exactly(result.length);
	    result.forEach(function (array) {
		(2).should.be.exactly(array.length);
	    });
	    cb();
	});
    });
});





