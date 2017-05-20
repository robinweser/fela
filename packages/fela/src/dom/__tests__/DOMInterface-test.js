import createDOMInterface from '../DOMInterface'
import createRenderer from '../../createRenderer'

import DOMNode from './mocks/DOMNode'

describe('Updating DOM nodes', () => {
  it('should clear the DOM node', () => {
    process.env.NODE_ENV = 'production'
    const node = DOMNode()

    const renderer = createRenderer()
    const updateNode = createDOMInterface(renderer, node)

    node.textContent = 'testtest'
    renderer.subscribe(updateNode)

    renderer.clear()

    expect(node.textContent).toEqual('')
  })

  it('should add a rule to the cssRules', () => {
    process.env.NODE_ENV = 'production'
    const node = DOMNode()

    const renderer = createRenderer()
    const updateNode = createDOMInterface(renderer, node)

    renderer.subscribe(updateNode)
    renderer.renderRule(() => ({ color: 'red' }))

    expect(node.sheet.cssRules).toEqual(['.a{color:red}'])
  })

  it('should use the static renderer in development', () => {
    process.env.NODE_ENV = 'development'

    const node = DOMNode()

    const renderer = createRenderer()
    const updateNode = createDOMInterface(renderer, node)

    renderer.subscribe(updateNode)
    renderer.renderStatic({ color: 'red' }, '.class')

    expect(node.textContent).toEqual('.class{color:red}')
  })

  it('should add new rules after all other rules', () => {
    process.env.NODE_ENV = 'production'
    const node = DOMNode()

    const renderer = createRenderer()
    const updateNode = createDOMInterface(renderer, node)

    renderer.subscribe(updateNode)
    renderer.renderRule(() => ({ color: 'red' }))
    renderer.renderRule(() => ({ color: 'blue' }))

    expect(node.sheet.cssRules).toEqual(['.a{color:red}', '.b{color:blue}'])
  })
})
