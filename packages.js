export default {
  fela: {
    name: 'Fela',
    entry: 'fela.js'
  },
  'fela-dom': [ {
    name: 'FelaDOM',
    entry: 'felaDOM.js'
  }, {
    name: 'FelaDOMServer',
    entry: 'felaDOMServer.js',
    dest: 'fela-dom-server'
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
  }
}
