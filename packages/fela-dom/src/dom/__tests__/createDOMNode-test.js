import { html as beautify } from 'js-beautify'

import createDOMNode from '../createDOMNode'

describe('Creating DOM node', () => {
  it('should create new DOM nodes', () => {
    const rootNode = createDOMNode('RULE')
    createDOMNode('RULE', rootNode, '(max-width: 800px)')
    expect(
      beautify(document.documentElement.outerHTML, {
        indent_size: 2,
      })
    ).toMatchSnapshot()
  })
})
