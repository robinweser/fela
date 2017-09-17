import path from 'path'
import { transformFileSync } from 'babel-core'
import { createRenderer } from 'fela'
import webPreset from 'fela-preset-web'

import createPlugin from '../createPlugin'

function transformFile(filename, plugin) {
  const filePath = `/__fixtures__/${filename}.js`

  return [
    filePath,
    transformFileSync(path.join(__dirname, filePath), {
      plugins: [plugin],
      babelrc: false
    }).code
  ]
}

const fixtures = [
  'createComponent',
  'createComponentEmbedded',
  'createComponentFunctionExpression',
  'createComponentFunctionVariable',
  'createComponentMergeClassName',
  'createComponentRendererReference',
  'createComponentEmptyParameter'
]

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
          plugins: [...webPreset]
        })
    })

    fixtures.forEach(fixture => {
      expect(transformFile(fixture, plugin)).toMatchSnapshot()
    })
  })
})
