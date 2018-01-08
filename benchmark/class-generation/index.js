import { Suite } from 'benchmark'
import beautifyBenchmark from 'beautify-benchmark'

import counter from './cases/counter'
import hash from './cases/hash'

export const run = () => {
  console.log(`Running class-generation tests.`)

  const testSuite = new Suite()

  testSuite.add('Counter', () => counter())
  testSuite.add('Hash', () => hash())

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
