import { createRenderer } from 'fela'
import monolithic from 'fela-monolithic'

export const renderer = createRenderer({
  enhancers: [ monolithic({}) ]
})
