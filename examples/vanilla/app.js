const renderer = Fela.createRenderer({ plugins: [FelaPluginPrefixer(), FelaPluginFallbackValue()] })

const selector = ({ size, name }) => ({
  fontSize: `${size}px`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  animation: `${name} 2s infinite`
})

const keyframe = () => ({
  '0%': { color: 'red' },
  '50%': { color: 'blue' },
  '100%': { color: 'red' }
})

renderer.renderStatic(
  {
    width: '100%',
    height: '100%'
  },
  'body'
)
renderer.renderStatic(
  {
    width: '100%',
    height: '100%',
    margin: 0
  },
  '#app'
)

const animationName = renderer.renderKeyframe(keyframe)
const className = renderer.renderRule(selector, {
  name: animationName,
  size: 50
})

document.getElementById('welcome').className = className
FelaDOM.render(renderer, document.getElementById('stylesheet'))
