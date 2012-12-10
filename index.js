var sqraper = require('sqraper'),
    util    = require('util');

var linkv = function (url, type, callback) {
	requestTitle(url, function (err, title) {
		if (err) {
			return callback(err, null);
		}

		return callback(null, formatLink(url, title, type));
	});

};

var requestTitle = function (url, callback) {
	sqraper(url, function (err, jQuery) {
		if (err) {
			return callback(err, null);
		}

		return callback(null, findTitle(jQuery));
	});
};

var findTitle = function ($) {
	return $('title').text().trim();
};

var formatLink = function (url, title, type) {
	var contents;
	if (type == 'html') {
		contents = util.format(
			'%s - <a href="%s">%s</a>',
			title, url, url
		);
	} else if (type == 'markdown') {
		contents = util.format('[%s](%s)', title, url);
	} else if (type == 'jade') {
		contents = util.format('a(href="%s") %s', url, title);
	} else {
		contents = util.format(
			'%s\n - %s',
			title, url
		);
	}

	return contents;
};

module.exports = linkv;