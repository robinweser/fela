import Table from 'easy-table'
import fs from 'fs'
import http from 'http'
import url from 'url'
import path from 'path'
import gzipSize from 'gzip-size'

export const toKebabCase = n =>
  n.replace(/Case$/, '').replace(/([a-z])([A-Z])/g, (match, c1, c2) => `${c1}-${c2.toLowerCase()}`)

export const pad = n => {
  const titleLength = 30
  const p = '===================='
  const title = `${p} ${n} ${p}`
  const offset = (title.length - titleLength) / 2
  return title.substr(offset, titleLength)
}

export const OUTPUT = './output/'

export const createOutputDir = testName => {
  const outputDir = OUTPUT + testName
  if (!fs.existsSync(OUTPUT)) {
    fs.mkdirSync(OUTPUT)
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }
  return outputDir
}

export const toClasses = css => {
  const newCss = {}
  Object.keys(css).forEach(className => {
    newCss[`.${className}`] = css[className]
  })
  return newCss
}

export const getSizeResults = testCases =>
  Object.keys(testCases).map(caseName => {
    const result = testCases[caseName].result
    return {
      caseName,
      size: result.length,
      gzippedSize: gzipSize.sync(result)
    }
  })

export const sizeTable = sizeResults => {
  const t = new Table()
  sizeResults.forEach(sr => {
    t.cell('name', sr.caseName)
    t.cell('size', `${sr.size.toLocaleString()} B`, Table.padLeft)
    t.cell('gzipped size', `(${sr.gzippedSize.toLocaleString()} B gzipped)`, Table.padLeft)
    t.newRow()
  })
  return t
}

export const getSmallest = (_sizeResults, size, { threshold = 0.05 } = {}) => {
  const sizeResults = Array.from(_sizeResults) // clone so sort won't mutate original
  sizeResults.sort((a, b) => a[size] - b[size])

  const smallest = sizeResults[0]
  const smallestThreshold = smallest[size] * (1 + threshold)

  return sizeResults.filter(sr => sr[size] <= smallestThreshold)
}

export const indent = (lines, { repeat = 2, character = ' ' } = {}) =>
  lines
    .split('\n')
    .map(line => character.repeat(repeat) + line)
    .join('\n')

export const httpServer = {
  start(dir, port) {
    this.server = http.createServer((req, res) => {
      var filename = path.join(dir, '..', url.parse(req.url).pathname)
      fs.stat(filename, (err, stat) => {
        if (!err && stat.isFile()) {
          res.writeHead(200, 'text/html')
          fs.createReadStream(filename).pipe(res)
        } else {
          res.end()
        }
      })
    })
    this.server.listen(port)
  },
  stop() {
    this.server.close()
  }
}
