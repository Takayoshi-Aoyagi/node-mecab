var Mecab = require('./node-mecab');

Mecab.exec("すもももももももものうち", function (err, result) {
    if (err) {
	console.log(err);
	return;
    }
    console.log(result);


    Mecab.exec("I am Bob", function (err, result) {
	if (err) {
	    console.log(err);
	    return;
	}
	console.log(result);
    });
});





