import { Suite } from 'benchmark'
import beautifyBenchmark from 'beautify-benchmark'

import unoptimized from './cases/unoptimized'
import optimized from './cases/optimized'
import preprocessed from './cases/preprocessed'
import precompiled from './cases/precompiled'
import rehydrated from './cases/rehydrated'
import extracted from './cases/extracted'

export const run = () => {
  console.log(
    `Running rule optimisation tests with ${process.env
      .VARIATIONS} dynamic variations.`
  )

  const testSuite = new Suite()

  testSuite.add('unoptimized', () => unoptimized())
  testSuite.add('optimized', () => optimized())
  testSuite.add('preprocessed', () => preprocessed())
  testSuite.add('precompiled', () => precompiled())
  testSuite.add('rehydrated', () => rehydrated())
  testSuite.add('extracted', () => extracted())

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
