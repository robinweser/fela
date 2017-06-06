import { html as beautify } from 'js-beautify'
import createStyleNode from '../createStyleNode'

describe('Create style node', () => {
  it('should create new style nodes', () => {
    createStyleNode('RULE')
    createStyleNode('RULE', '(max-width: 800px)')
    expect(
      beautify(document.documentElement.outerHTML, { indent_size: 2 })
    ).toMatchSnapshot()
  })
})
