var request   = require('request');
var cheerio   = {
       select : require('cheerio-select'),
       parse  : require('cheerio')
};

var linkv = function (url, callback) {
	request.get(url, function (err, res, body) {
		if (err) {
			return callback(err);
		}

		var title = getTitle(body);

		var contents = [
			title,
			' - ' + url
		].join('\n');

		return callback(null, contents);
	});
};

var getTitle = function (html) {
	var dom = cheerio.parse(html);
	var filteredDom = cheerio.select('title', dom);
	return filteredDom[0].children[0].data;
};

module.exports = linkv;