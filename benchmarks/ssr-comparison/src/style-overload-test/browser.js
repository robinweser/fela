import { runBrowser } from '../run'

import * as cases from './cases'

runBrowser('style overload', cases).then(
  () => null,
  e => {
    console.log(e)
  }
)
