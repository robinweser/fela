import rollup from 'rollup'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolver from 'rollup-plugin-node-resolve'

import packages from '../packages'

// Small helper to error and exit on fail
const errorOnFail = err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
}

const babelPlugin = babel({
  babelrc: false,
  presets: [ 'es2015-rollup', 'stage-0' ],
  plugins: [ 'transform-class-properties', 'transform-dev-warning', 'transform-node-env-inline' ]
})
const nodeResolverPlugin = nodeResolver({ jsnext: true, main: true })
const commonJSPlugin = commonjs({ include: 'node_modules/**' })
const uglifyPlugin = uglify()

const plugins = [ babelPlugin, nodeResolverPlugin, commonJSPlugin ]

function rollupConfig(pkg, info, minify) {
  return {
    entry: 'modules/' + info.entry,
    plugins: minify ? plugins.concat(uglifyPlugin) : plugins
  }
}

function bundleConfig(pkg, info, minify) {
  return {
    format: 'umd',
    moduleName: info.name,
    dest: 'packages/' + pkg + '/dist/' + (info.dest ? info.dest : pkg) + (minify ? '.min' : '') + '.js',
    sourceMap: !minify
  }
}

function buildPackage(pkg) {
  rollup.rollup(rollupConfig(pkg, packages[pkg], process.env.NODE_ENV === 'production')).then(bundle => {
    bundle.write(bundleConfig(pkg, packages[pkg], process.env.NODE_ENV === 'production'))
    console.log('Successfully bundled ' + packages[pkg].name + (process.env.NODE_ENV === 'production' ? ' (minified).' : '.'))
  }).catch(errorOnFail)
}

Object.keys(packages).forEach(pkg => buildPackage(pkg))
