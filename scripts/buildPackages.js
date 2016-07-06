import rollup from 'rollup'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolver from 'rollup-plugin-node-resolve'

const packages = {
  fela: {
    name: 'Fela',
    entry: 'index.js',
    dependencies: true
  },
  'fela-plugin-extend': {
    name: 'FelaPluginExtend',
    entry: 'plugins/extend.js',
    dependencies: false
  },
  'fela-plugin-dynamic-prefixer': {
    name: 'FelaPluginDynamicPrefixer',
    entry: 'plugins/dynamicPrefixer.js',
    dependencies: true
  },
  'fela-plugin-prefixer': {
    name: 'FelaPluginPrefixer',
    entry: 'plugins/prefixer.js',
    dependencies: true
  },
  'fela-plugin-fallback-value': {
    name: 'FelaPluginFallbackValue',
    entry: 'plugins/fallbackValue.js',
    dependencies: true
  },
  'fela-plugin-custom-property': {
    name: 'FelaPluginCustomProperty',
    entry: 'plugins/customProperty.js',
    dependencies: false
  },
  'fela-plugin-friendly-pseudo-class': {
    name: 'FelaPluginFriendlyPseudoClass',
    entry: 'plugins/friendlyPseudoClass.js',
    dependencies: false
  },
  'fela-plugin-unit': {
    name: 'FelaPluginUnit',
    entry: 'plugins/unit.js',
    dependencies: true
  },
  'fela-plugin-lvha': {
    name: 'FelaPluginLVHA',
    entry: 'plugins/LVHA.js',
    dependencies: false
  },
  'fela-plugin-logger': {
    name: 'FelaPluginLogger',
    entry: 'plugins/logger.js',
    dependencies: false
  },
  'fela-plugin-validator': {
    name: 'FelaPluginValidator',
    entry: 'plugins/validator.js',
    dependencies: false
  },
  'fela-beautifier': {
    name: 'FelaBeautifier',
    entry: 'enhancers/beautifier.js',
    dependencies: true
  },
  'fela-perf': {
    name: 'FelaPerf',
    entry: 'enhancers/perf.js',
    dependencies: false
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

function rollupConfig(pkg, info, minify) {
  const plugins = info.dependencies ? [ babelPlugin, nodeResolverPlugin, commonJSPlugin ] : [ babelPlugin ]
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
  }).catch(err => {
    console.error(err)
    process.exit(1)
  })
}

Object.keys(packages).forEach(pkg => buildPackage(pkg))
