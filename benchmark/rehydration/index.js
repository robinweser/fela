import { Suite } from 'benchmark'
import beautifyBenchmark from 'beautify-benchmark'

import declarationRegex from './cases/declarationRegex'
import propertyValueRegex from './cases/propertyValueRegex'

export const run = () => {
  console.log(`Running rehydration tests.`)

  const testSuite = new Suite()

  testSuite.add('Declaration Regex', () => declarationRegex())
  testSuite.add('Property-Value Regex', () => propertyValueRegex())

  testSuite.on('cycle', e => {
    beautifyBenchmark.add(e.target)
  })

  testSuite.on('complete', function() {
    beautifyBenchmark.log()
    console.log(`Fastest is: ${this.filter('fastest').map('name')}`)
  })

  return testSuite.run({ async: true })
}

run()
