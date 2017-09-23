import path from 'path'
import fs from 'fs'

import { transformFileSync } from 'babel-core'
import { createRenderer } from 'fela'
import webPreset from 'fela-preset-web'

import createPlugin from '../createPlugin'

const fixturePath = '/__fixtures__/'

function getFixtures(folder) {
  return fs
    .readdirSync(path.join(__dirname, fixturePath, folder))
    .reduce((fixtures, file) => {
      fixtures.push(path.join(folder, file))
      return fixtures
    }, [])
}

function transformFile(filename, plugin) {
  const filePath = `${fixturePath}${filename}`

  return [
    filePath,
    transformFileSync(path.join(__dirname, filePath), {
      plugins: [plugin],
      babelrc: false
    }).code
  ]
}

describe('Using babel-plugin-fela', () => {
  it('should prerender static styles as a separate rule', () => {
    const plugin = createPlugin()

    getFixtures('createComponent').forEach(fixture => {
      expect(transformFile(fixture, plugin)).toMatchSnapshot()
    })
  })

  it('should precompile static styles', () => {
    const plugin = createPlugin({
      precompile: true,
      renderer: () =>
        createRenderer({
          plugins: [...webPreset]
        })
    })

    getFixtures('createComponent').forEach(fixture => {
      expect(transformFile(fixture, plugin)).toMatchSnapshot()
    })
  })

  it('should transform inline css props on HTML nodes', () => {
    const plugin = createPlugin({
      cssProp: true
    })

    getFixtures('css-prop').forEach(fixture => {
      expect(transformFile(fixture, plugin)).toMatchSnapshot()
    })
  })
})
