import { runBrowser } from '../run'

import * as cases from './cases'

runBrowser('classes overload', cases).then(
  () => null,
  e => {
    console.log(e)
  }
)
