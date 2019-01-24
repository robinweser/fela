import extend from '../index'

describe('Extend plugin', () => {
  it('should extend style objects', () => {
    const extension = {
      backgroundColor: 'blue',
    }
    const base = {
      color: 'blue',
      extend: extension,
    }

    expect(extend()(base)).toEqual({
      color: 'blue',
      backgroundColor: 'blue',
    })
  })

  it('should extend nested style objects', () => {
    const extension = {
      backgroundColor: 'blue',
    }
    const base = {
      color: 'blue',
      ':hover': {
        color: 'red',
        extend: extension,
      },
    }

    expect(extend()(base)).toEqual({
      color: 'blue',
      ':hover': {
        color: 'red',
        backgroundColor: 'blue',
      },
    })
  })

  it('should extend conditional style object', () => {
    const extension = {
      backgroundColor: 'blue',
    }
    const base = {
      color: 'blue',
      extend: {
        condition: true,
        style: extension,
      },
    }

    expect(extend()(base)).toEqual({
      color: 'blue',
      backgroundColor: 'blue',
    })
  })

  it('should not extend conditional style object', () => {
    const extension = {
      backgroundColor: 'blue',
    }
    const base = {
      color: 'blue',
      extend: {
        condition: false,
        style: extension,
      },
    }

    expect(extend()(base)).toEqual({
      color: 'blue',
    })
  })

  it('should extend multiple style objects', () => {
    const extension = {
      backgroundColor: 'blue',
    }
    const otherExtension = {
      fontSize: '12px',
    }

    const base = {
      color: 'blue',
      extend: [extension, otherExtension],
    }

    expect(extend()(base)).toEqual({
      color: 'blue',
      backgroundColor: 'blue',
      fontSize: '12px',
    })
  })

  it('should extend multiple style objects and conditional style objects', () => {
    const extension = {
      backgroundColor: 'blue',
    }
    const otherExtension = {
      fontSize: '12px',
    }

    const base = {
      color: 'blue',
      extend: [
        extension,
        {
          condition: true,
          style: otherExtension,
        },
      ],
    }

    expect(extend()(base)).toEqual({
      color: 'blue',
      backgroundColor: 'blue',
      fontSize: '12px',
    })
  })

  it('should extend multiple style objects but not conditional style objects', () => {
    const extension = {
      backgroundColor: 'blue',
    }
    const otherExtension = {
      fontSize: '12px',
    }

    const base = {
      color: 'blue',
      extend: [
        extension,
        {
          condition: false,
          style: otherExtension,
        },
      ],
    }

    expect(extend()(base)).toEqual({
      color: 'blue',
      backgroundColor: 'blue',
    })
  })

  it('should not convert null values to empty objects', () => {
    const base = {
      color: 'blue',
      extend: {
        backgroundColor: null,
      },
    }

    expect(extend()(base)).toEqual({
      color: 'blue',
    })
  })

  it('should filter out null items in extend array', () => {
    const base = {
      color: 'blue',
      extend: [{ backgroundColor: '#ccc' }, null],
    }

    expect(extend()(base)).toEqual({
      color: 'blue',
      backgroundColor: '#ccc',
    })
  })

  it('should not overwrite values with null or undefined', () => {
    const base = {
      color: 'blue',
      backgroundColor: 'red',
      extend: {
        color: null,
        backgroundColor: undefined,
      },
    }

    expect(extend()(base)).toEqual({
      color: 'blue',
      backgroundColor: 'red',
    })
  })
})
