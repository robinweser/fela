import createTheme from '../createTheme'

describe('Creating a theme', () => {
  it('should return the properties', () => {
    const theme = createTheme({
      color: 'red',
    })

    expect(theme.get()).toEqual({
      color: 'red',
    })
  })

  it('should return the merged properties', () => {
    const previousTheme = createTheme({
      color: 'blue',
      backgroundColor: 'red',
    })
    const theme = createTheme(
      {
        color: 'red',
      },
      previousTheme
    )

    expect(theme.get()).toEqual({
      color: 'red',
      backgroundColor: 'red',
    })
  })
})

describe('Updating a theme', () => {
  it('should update the properties', () => {
    const theme = createTheme({
      color: 'red',
      backgroundColor: 'red',
    })

    theme.update({
      color: 'blue',
    })
    expect(theme.get()).toEqual({
      color: 'blue',
    })
  })

  it('should update the extended themes', () => {
    const previousTheme = createTheme({
      color: 'blue',
      backgroundColor: 'red',
    })
    const theme = createTheme(
      {
        color: 'red',
      },
      previousTheme
    )

    previousTheme.update({
      backgroundColor: 'blue',
    })
    expect(theme.get()).toEqual({
      color: 'red',
      backgroundColor: 'blue',
    })
  })
})

describe('Subscribing to changes', () => {
  it('should call the callback each time it emits changes', () => {
    const subscriber = jest.fn()

    const theme = createTheme({
      color: 'red',
      backgroundColor: 'red',
    })

    theme.subscribe(subscriber)

    theme.update({
      color: 'blue',
    })
    expect(subscriber).toHaveBeenCalledTimes(1)
  })

  it('should call the callback with the new theme properties', () => {
    let props

    const subscriber = properties => {
      props = properties
    }

    const theme = createTheme({
      color: 'red',
      backgroundColor: 'red',
    })

    theme.subscribe(subscriber)

    theme.update({
      color: 'blue',
    })

    expect(props).toEqual({
      color: 'blue',
    })
  })

  it('should return a unsubscribe method', () => {
    const subscriber = jest.fn()

    const theme = createTheme({
      color: 'red',
      backgroundColor: 'red',
    })

    const unsubscribe = theme.subscribe(subscriber)

    theme.update({
      color: 'blue',
    })

    unsubscribe()

    theme.update({
      color: 'red',
    })

    expect(subscriber).toHaveBeenCalledTimes(1)
    expect(theme.listeners.length).toEqual(0)
  })
})
