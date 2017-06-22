import { Suite } from 'benchmark'
import beautifyBenchmark from 'beautify-benchmark'
import {
  unoptimized501,
  optimized501,
  unoptimizedActual,
  optimizedActual
} from './cases'

export const run = () => {
  console.log(
    `Running static extraction tests with ${process.env.VARIATIONS} dynamic variations.`
  )

  const testSuite = new Suite()

  testSuite.add('5.0.1 unoptimized', () => unoptimized501())
  testSuite.add('5.0.1 optimized', () => optimized501())
  testSuite.add('Actual unoptimized', () => unoptimizedActual())
  testSuite.add('Actual optimized', () => optimizedActual())

  testSuite.on('cycle', e => {
    beautifyBenchmark.add(e.target)
  })

  testSuite.on('complete', function () {
    beautifyBenchmark.log()
    console.log(`Fastest is: ${this.filter('fastest').map('name')}`)
    console.log(
      `Improvement: ${Math.round(this[this.length - 1].hz / this[this.length - 2].hz * 100) / 100}x faster`
    )
  })

  return testSuite.run({ async: true })
}

run()
