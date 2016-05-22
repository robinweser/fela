import babel from 'rollup-plugin-babel'

export default {
  entry: 'modules/felaDOM.js',
  dest: 'packages/fela-dom/dist/fela-dom.js',
  format: 'umd',
  moduleName: 'FelaDOM',
  plugins: [ babel({
    babelrc: false,
    presets: [ 'es2015-rollup', 'stage-0' ]
  }) ],
  sourceMap: true
}
