var Mecab = require('./node-mecab');

Mecab.exec("すもももももももものうち", function (err, result) {
    if (err) {
	console.log(err);
	return;
    }
    console.log(result);
});
