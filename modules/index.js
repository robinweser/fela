import createRenderer from './createRenderer'
import applyMiddleware from './applyMiddleware'
import combineSelectors from './combineSelectors'

if (process.env.NODE_ENV === 'production') {
  console.log('You are using a minified version of Fela. If you want to get warnings please use an unminified version (process.env.NODE_ENV=development).')
}

export default {
  createRenderer,
  applyMiddleware,
  combineSelectors
}
