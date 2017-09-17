import { transformFileSync } from 'babel-core'
import { createRenderer } from 'fela'
import webPreset from 'fela-preset-web'

import createPlugin from '../createPlugin'

function transformFile(filename, plugin) {
  return transformFileSync(`${__dirname}/__fixtures__/${filename}.js`, {
    plugins: [plugin],
    babelrc: false
  }).code
}

describe('Using babel-plugin-fela', () => {
  it('should prerender static styles as a separate rule', () => {
    const plugin = createPlugin()

    expect(transformFile('createComponent', plugin)).toMatchSnapshot()
  })

  it('should precompile static styles', () => {
    const renderer = createRenderer({
      plugins: [...webPreset]
    })

    const plugin = createPlugin({
      precompile: true,
      renderer
    })

    expect(transformFile('createComponent', plugin)).toMatchSnapshot()
  })
})
