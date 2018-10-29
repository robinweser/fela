import { RULE_TYPE } from 'fela-utils'

import queryNode from '../queryNode'

it('should not query nodes with media or support attributes if media or support are not defined', () => {
  const nodeValid =
    '<style data-fela-type="RULE" type="text/css">.a{color: red}</style>'
  const nodeInvalid =
    '<style data-fela-type="RULE" type="text/css" media="screen and (min-width: 1280px)">.b{color: blue}</style>'

  document.head.innerHTML = nodeInvalid + nodeValid

  expect(
    queryNode({
      type: RULE_TYPE,
    }).outerHTML
  ).toBe(nodeValid)
})

it('should query nodes with media or support attributes if media or support are defined', () => {
  const nodeInvalid =
    '<style data-fela-type="RULE" type="text/css">.a{color: red}</style>'
  const nodeValid =
    '<style data-fela-type="RULE" type="text/css" media="screen and (min-width: 1280px)">.b{color: blue}</style>'

  document.head.innerHTML = nodeInvalid + nodeValid

  expect(
    queryNode({
      type: RULE_TYPE,
      media: 'screen and (min-width: 1280px)',
    }).outerHTML
  ).toBe(nodeValid)
})
