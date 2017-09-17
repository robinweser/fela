import { html as beautify } from 'js-beautify'

import createDOMNode from '../createDOMNode'

describe('Creating DOM node', () => {
  it('should create new DOM nodes', () => {
    createDOMNode('RULE')
    createDOMNode('RULE', '(max-width: 800px)')
    expect(
      beautify(document.documentElement.outerHTML, {
        indent_size: 2
      })
    ).toMatchSnapshot()
  })
})
