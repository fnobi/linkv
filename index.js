var request = require('request'),
    util    = require('util');
var cheerio = {
    select  : require('cheerio-select'),
    parse   : require('cheerio')
};

var linkv = function (url, type, callback) {
	request.get(url, function (err, res, body) {
		if (err) {
			return callback(err);
		}

		var title = getTitle(body);

		var contents;
		if (type == 'html') {
			contents = util.format(
				'%s - <a href="%s">%s</a>',
				title, url, url
			);
		} else if (type == 'markdown') {
			contents = util.format('[%s](%s)', title, url);
		} else {
			contents = util.format(
				'%s\n - %s',
				title, url
			);
		}

		return callback(null, contents);
	});
};

var getTitle = function (html) {
	var dom = cheerio.parse(html);
	var filteredDom = cheerio.select('title', dom);
	return filteredDom[0].children[0].data.replace(/\n/g,'');
};

module.exports = linkv;