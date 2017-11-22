import findDOMNodes from '../findDOMNodes'

describe('Collecting fela DOM nodes', () => {
  it('should return all fela nodes', () => {
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

    expect(findDOMNodes()).toEqual({
      RULE: node1,
      'RULE(max-width: 800px)': node2,
    })
  })
})
