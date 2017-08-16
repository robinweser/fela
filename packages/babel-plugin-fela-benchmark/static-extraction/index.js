import { Suite } from 'benchmark'
import beautifyBenchmark from 'beautify-benchmark'
import {
  unoptimizedActual,
  optimizedActual,
  preprocessedActual,
  precompiledActual,
  extractFileActual
} from './cases'

export const run = () => {
  console.log(
    `Running static extraction tests with ${process.env
      .VARIATIONS} dynamic variations.`
  )

  const testSuite = new Suite()

  testSuite.add('Actual unoptimized', () => unoptimizedActual())
  testSuite.add('Actual optimized', () => optimizedActual())
  testSuite.add('Actual preprocessed', () => preprocessedActual())
  testSuite.add('Actual precompiled', () => precompiledActual())
  testSuite.add('Actual file extracted', () => extractFileActual())

  testSuite.on('cycle', e => {
    beautifyBenchmark.add(e.target)
  })

  testSuite.on('complete', function() {
    beautifyBenchmark.log()
    console.log(`Fastest is: ${this.filter('fastest').map('name')}`)
    console.log(
      `Improvement: ${Math.round(this[this.length - 1].hz / this[0].hz * 100) /
        100}x faster`
    )
  })

  return testSuite.run({ async: true })
}

run()
