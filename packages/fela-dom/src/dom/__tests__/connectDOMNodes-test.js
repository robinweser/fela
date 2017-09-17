import { html as beautify } from 'js-beautify'
import { RULE_TYPE } from 'fela-utils'

import connectDOMNodes from '../connectDOMNodes'

describe('Connecting DOM nodes', () => {
  it('should initialize nodes', () => {
    const node = document.createElement('style')
    node.setAttribute('data-fela-type', 'RULE')
    node.type = 'text/css'

    document.head.appendChild(node)

    const renderer = {
      cache: {
        colorred: {
          className: 'a',
          selector: '.a',
          declaration: 'color:red',
          media: '',
          support: '',
          type: RULE_TYPE
        },
        colorblue: {
          className: 'b',
          selector: '.b',
          declaration: 'color:blue',
          media: '(min-height: 800px)',
          support: '',
          type: RULE_TYPE
        }
      }
    }

    connectDOMNodes(renderer)

    expect(renderer.nodes.RULE).toEqual(node)
    expect([
      Object.keys(renderer.nodes),
      beautify(document.documentElement.outerHTML, {
        indent_size: 2
      })
    ]).toMatchSnapshot()
  })
})
