import createRenderer from './createRenderer'
import applyMiddleware from './applyMiddleware'
import combineRules from './combineRules'

if (process.env.NODE_ENV === 'production') {
  console.warn('You are using a minified version of Fela. If you want to get warnings please use an unminified version (process.env.NODE_ENV=development).') // eslint-disable-line
}

export default {
  createRenderer,
  applyMiddleware,
  combineRules
}
