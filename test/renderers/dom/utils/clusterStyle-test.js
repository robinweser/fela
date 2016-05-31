import clusterStyle from '../../../../modules/renderers/dom/utils/clusterStyle'


describe('Clustering style', () => {
  it('should cluster and flatten media query nestings', () => {
    const style = {
      color: 'blue',
      fontSize: '12px',
      '@media (min-height: 300px)': {
        color: 'red',
        fontSize: '5px',
        '@media (max-width: 200px)': {
          color: 'black'
        }
      },
      '@media screen': {
        fontSize: '20px'
      }
    }

    expect(clusterStyle(style)).to.eql({
      '': {
        '': {
          color: 'blue',
          fontSize: '12px'
        }
      },
      '(min-height: 300px)': {
        '': {
          color: 'red',
          fontSize: '5px'
        }
      },
      '(min-height: 300px) and (max-width: 200px)': {
        '': {
          color: 'black'
        }
      },
      screen: {
        '': {
          fontSize: '20px'
        }
      }
    })
  })

  it('should cluster and flatten pseudo classes', () => {
    const style = {
      color: 'blue',
      fontSize: '12px',
      ':hover': {
        color: 'red',
        fontSize: '5px',
        ':focus': {
          color: 'black'
        }
      },
      ':focus': {
        fontSize: '20px'
      }
    }

    expect(clusterStyle(style)).to.eql({
      '': {
        '': {
          color: 'blue',
          fontSize: '12px'
        },
        ':hover': {
          color: 'red',
          fontSize: '5px'
        },
        ':hover:focus': {
          color: 'black'
        },
        ':focus': {
          fontSize: '20px'
        }
      }
    })
  })

  it('should cluster flatten media query styles and pseudo classes combined', () => {
    const style = {
      color: 'blue',
      fontSize: '12px',
      ':hover': {
        color: 'black',
        ':active': {
          color: 'gray'
        }
      },
      '@media (min-height: 300px)': {
        color: 'red',
        fontSize: '5px',
        ':hover': {
          color: 'yellow',
          ':focus': {
            color: 'brown'
          }
        },
        '@media (max-width: 200px)': {
          color: 'black',
          ':focus': {
            color: 'purple'
          }
        }
      }
    }

    expect(clusterStyle(style)).to.eql({
      '': {
        '': {
          color: 'blue',
          fontSize: '12px'
        },
        ':hover': {
          color: 'black'
        },
        ':hover:active': {
          color: 'gray'
        }
      },
      '(min-height: 300px)': {
        '': {
          color: 'red',
          fontSize: '5px'
        },
        ':hover': {
          color: 'yellow'
        },
        ':hover:focus': {
          color: 'brown'
        }
      },
      '(min-height: 300px) and (max-width: 200px)': {
        '': {
          color: 'black'
        },
        ':focus': {
          color: 'purple'
        }
      }
    })
  })
})