var assert = require('assert')
var babel = require('babel-core')
var chalk = require('chalk')
var clear = require('clear')
var diff = require('diff')
var fs = require('fs')

require('babel-core/register')

var pluginPath = require.resolve('../lib')


function runTest() {
  var output = babel.transformFileSync(__dirname + '/fixtures/actual.js', {
    plugins: [pluginPath],
    babelrc: false
  })

  var expected = fs.readFileSync(__dirname + '/fixtures/expected.js', 'utf-8')

  function normalizeLines(str) {
    return str.trimRight().replace(/\r\n/g, '\n')
  }

  diff
    .diffLines(normalizeLines(output.code), normalizeLines(expected))
    .forEach(function(part) {
      var value = part.value
      if (part.added) {
        value = chalk.green(part.value)
      } else if (part.removed) {
        value = chalk.red(part.value)
      }
      process.stdout.write(value)
    })
}
runTest()
