import clusterCache from '../clusterCache'

describe('Clustering the cache', () => {
  it('should correctly sort rules', () => {
    const cache = {
      ':focuscolorred': {
        type: 'RULE',
        className: 'd',
        selector: '.d:focus',
        declaration: 'color:red',
        pseudo: ':focus',
        media: '',
        support: '',
      },
      ':hovercolorred': {
        type: 'RULE',
        className: 'a',
        selector: '.a:hover',
        declaration: 'color:red',
        pseudo: ':hover',
        media: '',
        support: '',
      },
      ':activecolor#fff': {
        type: 'RULE',
        className: 'b',
        selector: '.b:active',
        declaration: 'color:#fff',
        pseudo: ':active',
        media: '',
        support: '',
      },
      ':hovercolor#000': {
        type: 'RULE',
        className: 'c',
        selector: '.c:hover',
        declaration: 'color:#000',
        pseudo: ':hover',
        media: '',
        support: '',
      },
    }

    expect(
      clusterCache(cache, [
        /^:link/,
        /^:visited/,
        /^:hover/,
        /^:focus-within/,
        /^:focus/,
        /^:active/,
      ])
    ).toMatchSnapshot()
  })
})
