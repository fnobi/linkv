var child_process = require('child_process');

var clipboard = {};

clipboard.write = function (text, callback) {
	// TODO!! "のエスケープ雑だよこれ
	text = text.replace(/"/g, '\\"');
	child_process.exec('echo "' + text + '" | pbcopy', callback);
};

module.exports = clipboard;