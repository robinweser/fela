import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import rollup from 'rollup'
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
  presets: [ 'es2015-rollup', 'stage-0' ]
})
const nodeResolverPlugin = nodeResolver({ jsnext: true, main: true })
const commonJSPlugin = commonjs({ include: 'node_modules/**' })
const uglifyPlugin = uglify()

const plugins = [ babelPlugin, nodeResolverPlugin, commonJSPlugin ]

function rollupConfig(pkg, minify) {
  return {
    entry: 'modules/' + packages[pkg].entry,
    plugins: minify ? plugins.concat(uglifyPlugin) : plugins
  }
}

function bundleConfig(pkg, minify) {
  return {
    format: 'umd',
    moduleName: packages[pkg].name,
    dest: 'packages/' + pkg + '/dist/' + pkg + (minify ? '.min' : '') + '.js',
    sourceMap: !minify
  }
}

function buildPackage(pkg) {
  rollup.rollup(rollupConfig(pkg)).then(bundle => {
    bundle.write(bundleConfig(pkg))
    console.log('Successfully bundled ' + pkg + '.')
  })

  rollup.rollup(rollupConfig(pkg, true)).then(bundle => {
    bundle.write(bundleConfig(pkg, true))
    console.log('Successfully bundled ' + pkg + ' (minified).')
  }).catch(err => errorOnFail(err))
}

Object.keys(packages).forEach(pkg => buildPackage(pkg))
