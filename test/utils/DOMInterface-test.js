import createDOMInterface from '../../modules/utils/DOMInterface'
import createRenderer from '../../modules/createRenderer'
import DOMNode from '../_mocks/DOMNode'


describe('Updating DOM nodes', () => {
  it('should clear the DOM node', () => {
    process.env.NODE_ENV = 'production'
    const node = DOMNode()

    const renderer = createRenderer()
    const DOMInterface = createDOMInterface(renderer, node)

    node.textContent = 'testtest'

    DOMInterface.updateNode({ type: 'clear' })
    expect(node.textContent).to.eql('')
  })

  it('should add a rule to the cssRules', () => {
    process.env.NODE_ENV = 'production'
    const node = DOMNode()

    const renderer = createRenderer()
    const DOMInterface = createDOMInterface(renderer, node)

    DOMInterface.updateNode({
      type: 'rule',
      css: 'color:red',
      style: {
        color: 'red'
      },
      selector: '.foo',
      media: ''
    })

    expect(node.sheet.cssRules).to.eql([ '.foo{color:red}' ])
  })

  it('should add a media rule to the cssRules', () => {
    process.env.NODE_ENV = 'production'
    const node = DOMNode()

    const DOMInterface = createDOMInterface(undefined, node)

    DOMInterface.updateNode({
      type: 'rule',
      css: 'color:red',
      style: {
        color: 'red'
      },
      selector: '.foo',
      media: '(min-width: 300px)'
    })

    expect(node.sheet.cssRules).to.eql([ '@media (min-width: 300px){.foo{color:red}}' ])
  })

  it('should use the static renderer in development', () => {
    process.env.NODE_ENV = 'development'

    const node = DOMNode()
    const renderer = createRenderer()

    const DOMInterface = createDOMInterface(renderer, node)

    renderer.renderStatic({ color: 'red' }, '.foo')
    DOMInterface.updateNode({
      type: 'rule',
      css: 'color:red',
      style: {
        color: 'red'
      },
      selector: '.foo',
      media: ''
    })

    expect(node.textContent).to.eql('.foo{color:red}')
  })

  it('should add new rules before all other rules', () => {
    process.env.NODE_ENV = 'production'
    const node = DOMNode()
    const DOMInterface = createDOMInterface(undefined, node)

    DOMInterface.updateNode({
      type: 'rule',
      css: 'color:red',
      style: {
        color: 'red'
      },
      selector: '.foo',
      media: ''
    })

    DOMInterface.updateNode({
      type: 'rule',
      css: 'color:blue',
      style: {
        color: 'blue'
      },
      selector: '.bar',
      media: ''
    })

    expect(node.sheet.cssRules).to.eql([ '.bar{color:blue}', '.foo{color:red}' ])
  })

  it('should add new media rules before other media rules', () => {
    process.env.NODE_ENV = 'production'
    const node = DOMNode()
    const DOMInterface = createDOMInterface(undefined, node)

    DOMInterface.updateNode({
      type: 'rule',
      css: 'color:red',
      style: {
        color: 'red'
      },
      selector: '.foo',
      media: '(min-width: 300px)'
    })

    DOMInterface.updateNode({
      type: 'rule',
      css: 'color:blue',
      style: {
        color: 'blue'
      },
      selector: '.foo',
      media: '(min-width: 500px)'
    })

    expect(node.sheet.cssRules).to.eql([ '@media (min-width: 500px){.foo{color:blue}}', '@media (min-width: 300px){.foo{color:red}}' ])
  })

  it('should add new media rules before other media rules but after basic rules', () => {
    process.env.NODE_ENV = 'production'
    const node = DOMNode()
    const DOMInterface = createDOMInterface(undefined, node)

    DOMInterface.updateNode({
      type: 'rule',
      css: 'color:red',
      style: {
        color: 'red'
      },
      selector: '.foo',
      media: ''
    })

    DOMInterface.updateNode({
      type: 'rule',
      css: 'color:red',
      style: {
        color: 'red'
      },
      selector: '.foo',
      media: '(min-width: 300px)'
    })

    DOMInterface.updateNode({
      type: 'rule',
      css: 'color:blue',
      style: {
        color: 'blue'
      },
      selector: '.bar',
      media: ''
    })

    DOMInterface.updateNode({
      type: 'rule',
      css: 'color:blue',
      style: {
        color: 'blue'
      },
      selector: '.foo',
      media: '(min-width: 500px)'
    })

    DOMInterface.updateNode({
      type: 'rule',
      css: 'color:red',
      style: {
        color: 'red'
      },
      selector: '.baz',
      media: ''
    })

    expect(node.sheet.cssRules).to.eql([ '.baz{color:red}', '.bar{color:blue}', '.foo{color:red}', '@media (min-width: 500px){.foo{color:blue}}', '@media (min-width: 300px){.foo{color:red}}' ])
  })
})
