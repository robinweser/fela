import path from 'path'
import fs from 'fs'

import { transformFileSync } from 'babel-core'
import { createRenderer } from 'fela'
import webPreset from 'fela-preset-web'

import createPlugin from '../createPlugin'

const fixturePath = '/__fixtures__/'

const fixtures = fs
  .readdirSync(path.join(__dirname, fixturePath))
  .reduce((fixureList, file) => {
    fixureList.push(file)
    return fixureList
  }, [])

function transformFile(filename, plugin) {
  const filePath = `${fixturePath}${filename}`

  return [
    filePath,
    transformFileSync(path.join(__dirname, filePath), {
      plugins: [plugin],
      babelrc: false,
    }).code,
  ]
}

describe('Using babel-plugin-fela', () => {
  it('should prerender static styles as a separate rule', () => {
    const plugin = createPlugin()

    fixtures.forEach(fixture => {
      expect(transformFile(fixture, plugin)).toMatchSnapshot()
    })
  })

  it('should precompile static styles', () => {
    const plugin = createPlugin({
      precompile: true,
      renderer: () =>
        createRenderer({
          plugins: [...webPreset],
        }),
    })

    fixtures.forEach(fixture => {
      expect(transformFile(fixture, plugin)).toMatchSnapshot()
    })
  })
})
