import fs from 'fs'
import Table from 'cli-table'
import { Suite } from 'benchmark'
import beautifyBenchmark from 'beautify-benchmark'
import wd from 'wd'

import {
  toKebabCase,
  pad,
  createOutputDir,
  getSizeResults,
  sizeTable,
  indent,
  getSmallest,
  browserPerfCaps,
  httpServer
} from './utilities'

export const runTest = (testName, cases) =>
  new Promise(resolve => {
    const testCases = {}

    Object.keys(cases).forEach(k => {
      testCases[toKebabCase(k)] = { testCase: cases[k], result: null }
    })

    console.log(`Running ${testName} test.\n`)

    const testSuite = new Suite()

    Object.keys(testCases).forEach(caseName => {
      testSuite.add(caseName, () => {
        testCases[caseName].result = testCases[caseName].testCase(pad(caseName))
      })
    })

    testSuite.on('cycle', e => {
      beautifyBenchmark.add(e.target)
    })

    testSuite.on('complete', function onComplete() {
      const sizeResults = getSizeResults(testCases)
      const smallest = getSmallest(sizeResults, 'size').map(s => s.caseName)
      const smallestGzipped = getSmallest(sizeResults, 'gzippedSize').map(s => s.caseName)
      const fastest = this.filter('fastest').map('name')

      console.log(indent(sizeTable(sizeResults).print()))
      console.log(indent(`Smallest ${smallest.length < 2 ? 'is: ' : 'are:'}         ${smallest.join(', ')}`))
      console.log(
        indent(`Smallest gzipped ${smallestGzipped.length < 2 ? 'is: ' : 'are:'} ${smallestGzipped.join(', ')}`)
      )

      beautifyBenchmark.log()
      console.log(indent(`Fastest ${fastest.length < 2 ? 'is' : 'are'}: ${fastest.join(', ')}\n`))

      resolve()
    })

    testSuite.run({ async: true })
  })

export const runView = (testName, cases) =>
  new Promise((resolve, reject) => {
    const testCases = {}

    Object.keys(cases).forEach(caseName => {
      testCases[toKebabCase(caseName)] = {
        testCase: cases[caseName],
        result: null
      }
    })

    console.log(`Running view ${testName}.\n`)

    const outputDir = createOutputDir(testName.replace(/ /, '-'))

    Object.keys(testCases).forEach(caseName => {
      const html = testCases[caseName].testCase(pad(caseName))
      const path = `${outputDir}/${caseName}.html`
      fs.writeFileSync(path, html)
      console.log(`Wrote ${path}`)
    })
    resolve(outputDir)
  })

export const runBrowser = (testName, cases) => {
  let testCases = {}
  return runView(testName, cases)
    .then(outDir => {
      httpServer.start(outDir, 8123)
    })
    .then(() => {
      console.log(`Running Browser tests for ${testName}.`)

      // Run each of the browser tests sequentially
      return Object.keys(cases)
        .map(caseName => runBrowserTest(testName.replace(/ /, '-'), toKebabCase(caseName)))
        .reduce(
          (p, fn) =>
            p.then(data => {
              if (data) {
                testCases[toKebabCase(data.caseName)] = data.result
              }
              return fn()
            }),
          Promise.resolve()
        )
    })
    .then(() => {
      let table = new Table({
        head: ['Framework', 'Loading', 'Painting', 'Rendering', 'Scripting', 'Other'],
        colAligns: ['left', 'right', 'right', 'right', 'right', 'right']
      })
      for (let key in testCases) {
        let { loading, painting, rendering, scripting, other } = testCases[key]
        table.push([
          key,
          loading.toFixed(3),
          painting.toFixed(3),
          rendering.toFixed(3),
          scripting.toFixed(3),
          other.toFixed(3)
        ])
      }
      console.log(table.toString())
      httpServer.stop()
    })
}

const runBrowserTest = (testName, caseName) => () => {
  var url = `http://localhost:8123/${testName}/${caseName}.html`
  const traceCategories = [
    'blink.console',
    'devtools.timeline',
    'disabled-by-default-devtools.timeline',
    'toplevel',
    'disabled-by-default-devtools.timeline.frame',
    'benchmark'
  ]

  console.log(`Running ${url}`)

  let browser = wd.promiseRemote('http://localhost:9515')
  let chromeCapabilities = {
    browserName: 'chrome',
    chromeOptions: {
      perfLoggingPrefs: { traceCategories: traceCategories.join() }
    },
    loggingPrefs: { performance: 'ALL' }
  }
  return browser
    .init(chromeCapabilities)
    .then(() => browser.get(url))
    .then(() => browser.sleep(1000))
    .then(() => browser.log('performance'))
    .then(logs => {
      let eventStacks = {}

      let traceCategoriesRegEx = new RegExp('\\b(' + traceCategories.join('|') + '|__metadata)\\b')

      let eventCategories = {
        loading: [
          'ParseAuthorStyleSheet',
          'ParseHTML',
          'ResourceFinish',
          'ResourceReceivedData',
          'ResourceReceiveResponse',
          'ResourceSendRequest'
        ],
        painting: [
          'UpdateLayer',
          'CompositeLayers',
          'DecodeImage',
          'MarkFirstPaint',
          'Paint',
          'PaintImage',
          'PaintSetup',
          'RasterTask',
          'ResizeImage'
        ],
        other: ['Program', 'Task'],
        rendering: [
          'Animation',
          'BeginFrame',
          'BeginMainThreadFrame',
          'DrawFrame',
          'HitTest',
          'InvalidateLayout',
          'Layout',
          'RecalculateStyles',
          'RequestMainThreadFrame',
          'ScheduleStyleRecalculation',
          'ScrollLayer',
          'UpdateLayerTree',
          'UpdateLayoutTree'
        ],
        scripting: [
          'CancelAnimationFrame',
          'CancelIdleCallback',
          'CompileScript',
          'ConsoleTime',
          'EmbedderCallback',
          'EvaluateScript',
          'EventDispatch',
          'FireAnimationFrame',
          'FireIdleCallback',
          'FunctionCall',
          'GCCollectGarbage',
          'GCCompleteSweep',
          'GCEvent',
          'GCIdleLazySweep',
          'JSFrame',
          'LatencyInfo',
          'MajorGC',
          'MarkDOMContent',
          'MarkLoad',
          'MinorGC',
          'ParseScriptOnBackground',
          'RequestAnimationFrame',
          'RequestIdleCallback',
          'RunMicrotasks',
          'TimerFire',
          'TimerInstall',
          'TimerRemove',
          'TimeStamp',
          'UserTiming',
          'WebSocketCreate',
          'WebSocketDestroy',
          'WebSocketReceiveHandshakeResponse',
          'WebSocketSendHandshakeRequest',
          'XHRLoad',
          'XHRReadyStateChange '
        ]
      }

      let result = {
        loading: 0,
        painting: 0,
        other: 0,
        rendering: 0,
        scripting: 0
      }

      // FIXMe - make this efficient
      const addEventToResult = (name, val) => {
        for (var key in eventCategories) {
          if (eventCategories[key].filter(a => a === name).length === 1) {
            result[key] += val / 1000
            break
          }
        }
      }

      logs.forEach(log => {
        let msg = JSON.parse(log.message).message
        let result = {}
        if (msg.method !== 'Tracing.dataCollected' || !traceCategoriesRegEx.test(msg.params.cat)) {
          return
        }
        let e = msg.params
        switch (e.ph) {
          case 'I': // Instant Event
          case 'X': // Duration Event
            addEventToResult(e.name, e.dur || e.tdur || 0)
            break
          case 'B': // Begin Event
            if (typeof eventStacks[e.tid] === 'undefined') {
              eventStacks[e.tid] = []
            }
            eventStacks[e.tid].push(e)
            break
          case 'E': // End Event
            if (typeof eventStacks[e.tid] === 'undefined' || eventStacks[e.tid].length === 0) {
              //console.log('Encountered an end event that did not have a start event', e);
            } else {
              var b = eventStacks[e.tid].pop()
              if (b.name !== e.name) {
                //console.log('Start and end events dont have the same name', e, b);
              }
              addEventToResult(e.name, e.ts - b.ts)
            }
            break
        }
      })
      return { caseName, result }
    })
    .fin(() => browser.quit())
}
