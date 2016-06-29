var renderer = Fela.createRenderer({
  plugins: [ FelaPluginPrefixer(), FelaPluginFallbackValue() ]
})

var selector = function(props) {
  return {
    fontSize: props.size + 'px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    animation: props.name + ' 2s infinite'
  }
}


const keyframe = function(props) {
  return {
    '0%': {
      color: 'red'
    },
    '50%': {
      color: 'blue'
    },
    '100%': {
      color: 'red'
    }
  }
}

renderer.renderStatic({ width: '100%', height: '100%' }, 'body')
renderer.renderStatic({
  width: '100%',
  height: '100%',
  margin: 0
}, '#app')

const animationName = renderer.renderKeyframe(keyframe)
const className = renderer.renderRule(selector, {
  name: animationName,
  size: 50
})

document.getElementById('welcome').className = className
Fela.render(renderer, document.getElementById('stylesheet'))
