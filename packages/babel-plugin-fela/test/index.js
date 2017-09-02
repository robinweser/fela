const assert = require('assert')
const babel = require('babel-core')
const chalk = require('chalk')
const clear = require('clear')
const diff = require('diff')
const fs = require('fs')

require('babel-core/register')

const pluginPath = require.resolve('../lib')

function runTest() {
  const output = babel.transformFileSync(`${__dirname}/fixtures/actual.js`, {
    plugins: [pluginPath],
    babelrc: false
  })

  const expected = fs.readFileSync(`${__dirname}/fixtures/expected.js`, 'utf-8')

  function normalizeLines(str) {
    return str.trimRight().replace(/\r\n/g, '\n')
  }

  diff.diffLines(normalizeLines(output.code), normalizeLines(expected)).forEach(part => {
    let value = part.value
    if (part.added) {
      value = chalk.green(part.value)
    } else if (part.removed) {
      value = chalk.red(part.value)
    }
    process.stdout.write(value)
  })
}
runTest()
