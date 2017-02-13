import rollup from 'rollup'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolver from 'rollup-plugin-node-resolve'
import fs from 'fs-extra'

const gzip = require('gzip-js')

const packages = {
  fela: {
    name: 'Fela',
    entry: 'index.js',
    dependencies: true
  },
  'fela-dom': {
    name: 'FelaDOM',
    entry: 'dom/index.js',
    dependencies: false
  },
  'fela-tools': {
    name: 'FelaTools',
    entry: 'tools/index.js',
    dependencies: false
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
  'fela-plugin-placeholder-prefixer': {
    name: 'FelaPluginPlaceholderPrefixer',
    entry: 'plugins/placeholderPrefixer.js',
    dependencies: false
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
  'fela-plugin-named-media-query': {
    name: 'FelaPluginNamedMediaQuery',
    entry: 'plugins/namedMediaQuery.js',
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
  'fela-plugin-remove-undefined': {
    name: 'FelaPluginRemoveUndefined',
    entry: 'plugins/removeUndefined.js',
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
  'fela-plugin-isolation': {
    name: 'FelaPluginIsolation',
    entry: 'plugins/isolation.js',
    dependencies: false
  },
  'fela-preset-web': {
    name: 'FelaPresetWeb',
    entry: 'presets/web.js',
    dependencies: true
  },
  'fela-preset-dev': {
    name: 'FelaPresetDev',
    entry: 'presets/dev.js',
    dependencies: true
  },
  'fela-layout-debugger': {
    name: 'FelaLayoutDebugger',
    entry: 'enhancers/layoutDebugger.js',
    dependencies: false
  },
  'fela-beautifier': {
    name: 'FelaBeautifier',
    entry: 'enhancers/beautifier.js',
    dependencies: true
  },
  'fela-font-renderer': {
    name: 'FelaFontRenderer',
    entry: 'enhancers/fontRenderer.js',
    dependencies: false
  },
  'fela-perf': {
    name: 'FelaPerf',
    entry: 'enhancers/perf.js',
    dependencies: false
  },
  'fela-logger': {
    name: 'FelaLogger',
    entry: 'enhancers/logger.js',
    dependencies: true
  },
  'fela-monolithic': {
    name: 'FelaMonolithic',
    entry: 'enhancers/monolithic.js',
    dependencies: false
  },
  'react-fela': {
    name: 'ReactFela',
    entry: 'bindings/react/index.js',
    dependencies: true
  }
}

const babelPlugin = babel({
  babelrc: false,
  presets: ['es2015-rollup', 'stage-0', 'react'],
  plugins: ['transform-class-properties', 'transform-dev-warning', 'transform-node-env-inline']
})
const nodeResolverPlugin = nodeResolver({
  jsnext: true,
  main: true,
  skip: ['react']
})
const commonJSPlugin = commonjs({ include: 'node_modules/**' })
const uglifyPlugin = uglify()

function rollupConfig(pkg, info, minify) {
  const plugins = info.dependencies ? [babelPlugin, nodeResolverPlugin, commonJSPlugin] : [babelPlugin]
  return {
    entry: `modules/${info.entry}`,
    plugins: minify ? plugins.concat(uglifyPlugin) : plugins
  }
}

function bundleConfig(pkg, info, minify) {
  return {
    format: 'umd',
    globals: {
      react: 'React',
      fela: 'Fela'
    },
    moduleName: info.name,
    dest: `packages/${pkg}/dist/${info.dest ? info.dest : pkg}${minify ? '.min' : ''}.js`,
    sourceMap: !minify
  }
}

// Small helper to error and exit on fail
const errorOnFail = (err, pkg) => {
  if (err) {
    console.error(`[${pkg}]`, err)
    process.exit(1)
  }
}

// Updates the package.json version of a given pkg with the global
// package.json version
function updateVersion(pkg) {
  fs.readFile(`${__dirname}/../package.json`, 'utf8', (err, data) => {
    errorOnFail(err, pkg)

    const globalVersion = JSON.parse(data).version
    const path = `${__dirname}/../packages/${pkg}/package.json`

    fs.readFile(path, 'utf8', (err, data) => {
      errorOnFail(err, pkg)

      const packageJSON = JSON.parse(data)
      packageJSON.version = globalVersion

      if (packageJSON.peerDependencies && packageJSON.peerDependencies.fela) {
        packageJSON.peerDependencies.fela = globalVersion
      }

      const newPackageJSON = JSON.stringify(packageJSON, null, 2)

      fs.writeFile(path, newPackageJSON, (err) => {
        errorOnFail(err, pkg)
        console.log(`Successfully updated ${pkg} version to ${globalVersion}.`)
      })
    })
  })
}

function updateReadme(pkg, bundleSize) {
  fs.readFile(`${__dirname}/../package.json`, 'utf8', (err, data) => {
    errorOnFail(err, pkg)

    const globalVersion = JSON.parse(data).version
    const path = `${__dirname + (pkg !== 'fela' ? `/../packages/${pkg}` : '/..')}/README.md`

    fs.readFile(path, 'utf8', (err, data) => {
      errorOnFail(err, pkg)

      const bundleString = (bundleSize / 1000).toString().split('.')
      const readme = data
        .replace(/@[1-9]*[.][0-9]*[.][0-9]*/g, `@${globalVersion}`)
        .replace(/gzipped-[0-9]*[.][0-9]*kb/, `gzipped-${bundleString[0]}.${bundleString[1].substr(0, 2)}kb`)

      fs.writeFile(path, readme, (err) => {
        errorOnFail(err, pkg)
        console.log(`Successfully updated ${pkg} README.md to ${globalVersion}.`)
      })
    })
  })
}

function buildPackage(pkg) {
  rollup
    .rollup(rollupConfig(pkg, packages[pkg], process.env.NODE_ENV === 'production'))
    .then((bundle) => {
      const config = bundleConfig(pkg, packages[pkg], process.env.NODE_ENV === 'production')

      if (process.env.NODE_ENV === 'production') {
        updateReadme(pkg, gzip.zip(bundle.generate(config).code).length)
        updateVersion(pkg)
      }

      bundle.write(config)
      console.log(
        `Successfully bundled ${packages[pkg].name}${process.env.NODE_ENV === 'production' ? ' (minified).' : '.'}`
      )
    })
    .catch(err => errorOnFail(err, pkg))
}

Object.keys(packages).forEach(pkg => buildPackage(pkg))
updateVersion('fela-native')
