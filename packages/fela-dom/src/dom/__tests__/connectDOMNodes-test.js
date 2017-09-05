import connectDOMNodes from '../connectDOMNodes'

describe('Reflush style nodes', () => {
  it('should load and process style nodes', () => {
    const node1 = document.createElement('style')
    node1.setAttribute('data-fela-type', 'RULE')
    node1.type = 'text/css'
    node1.textContent = '.a{color:yellow}.a:hover{color:red}'

    const node2 = document.createElement('style')
    node2.setAttribute('data-fela-type', 'RULE')
    node2.type = 'text/css'
    node2.media = '(max-width: 800px)'
    node2.textContent = '.b{color:blue}'

    document.head.appendChild(node1)
    document.head.appendChild(node2)

    const renderer = {
      cache: {},
      getNextRuleIdentifier() {
        return true
      }
    }

    connectDOMNodes(renderer)

    expect(renderer.nodes).toEqual({
      RULE: node1,
      'RULE(max-width: 800px)': node2
    })
  })
})
