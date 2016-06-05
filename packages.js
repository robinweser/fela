export default {
  fela: [ {
    name: 'Fela',
    entry: 'fela.js'
  }, {
    name: 'FelaServer',
    entry: 'felaServer.js',
    dest: 'fela-server'
  } ],
  'fela-plugin-prefixer': {
    name: 'FelaPluginPrefixer',
    entry: 'plugins/prefixer.js'
  },
  'fela-plugin-fallback-value': {
    name: 'FelaPluginFallbackValue',
    entry: 'plugins/fallbackValue.js'
  },
  'fela-plugin-custom-property': {
    name: 'FelaPluginCustomProperty',
    entry: 'plugins/customProperty.js'
  },
  'fela-plugin-friendly-pseudo-class': {
    name: 'FelaPluginFriendlyPseudoClass',
    entry: 'plugins/friendlyPseudoClass.js'
  },
  'fela-plugin-unit': {
    name: 'FelaPluginUnit',
    entry: 'plugins/unit.js'
  },
  'fela-plugin-lvha': {
    name: 'FelaPluginLVHA',
    entry: 'plugins/LVHA.js'
  },
  'fela-beautifier': {
    name: 'FelaBeautifier',
    entry: 'middleware/beautifier.js'
  },
  'fela-logger': {
    name: 'FelaLogger',
    entry: 'middleware/logger.js'
  },
  'fela-perf': {
    name: 'FelaPerf',
    entry: 'middleware/perf.js'
  }
}
