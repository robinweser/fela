import babel from 'rollup-plugin-babel'

export default {
  entry: 'modules/fela.js',
  dest: 'packages/fela/dist/fela.js',
  format: 'umd',
  moduleName: 'Fela',
  plugins: [ babel({
    babelrc: false,
    presets: [ 'es2015-rollup', 'stage-0' ]
  }) ],
  sourceMap: true
}
