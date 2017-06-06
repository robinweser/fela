import reflushStyleNodes from '../reflushStyleNodes'

describe('Reflush style nodes', () => {
  it('should load and process style nodes', () => {
    const node1 = document.createElement('style')
    node1.setAttribute('data-fela-type', 'RULE')
    node1.type = 'text/css'

    const node2 = document.createElement('style')
    node2.setAttribute('data-fela-type', 'RULE')
    node2.type = 'text/css'
    node2.media = '(max-width: 800px)'

    document.head.appendChild(node1)
    document.head.appendChild(node2)

    const nodes = reflushStyleNodes()
    expect(nodes).toEqual({
      RULE: node1,
      'RULE(max-width: 800px)': node2
    })
  })
})
