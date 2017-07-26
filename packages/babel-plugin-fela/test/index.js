var assert = require('assert');
var babel = require('babel');
var chalk = require('chalk');
var clear = require('clear');
var diff = require('diff');
var fs = require('fs');

require('babel/register');

var pluginPath = require.resolve('../src');

function runTest() {
	var output = babel.transformFileSync(__dirname + '/fixtures/actual.js', {
		optional: ['runtime'],
		plugins: [pluginPath]
	});

	var expected = fs.readFileSync(__dirname + '/fixtures/expected.js', 'utf-8');

	function normalizeLines(str) {
		return str.trimRight().replace(/\r\n/g, '\n');
	}

	diff.diffLines(normalizeLines(output.code), normalizeLines(expected))
	.forEach(function (part) {
		var value = part.value;
		if (part.added) {
			value = chalk.green(part.value);
		} else if (part.removed) {
			value = chalk.red(part.value);
		}
		process.stdout.write(value);
	});

	console.log();
}

if (process.argv.indexOf('--watch') >= 0) {
	require('watch').watchTree(__dirname + '/..', function () {
		delete require.cache[pluginPath];
		clear();
		console.log('Press Ctrl+C to stop watching...');
		console.log('================================');
		try {
			runTest();
		} catch (e) {
			console.error(chalk.magenta(e.stack));
		}
	});
} else {
	runTest();
}
