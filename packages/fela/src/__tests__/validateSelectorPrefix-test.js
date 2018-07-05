import validateSelectorPrefix from '../validateSelectorPrefix'

describe('Validating a selectorPrefix', () => {
  it('should return without logging an error', () => {
    const spy = jest.spyOn(global.console, 'error')

    validateSelectorPrefix('fela_')
    validateSelectorPrefix('_fO09-4Da')

    expect(spy).not.toHaveBeenCalled()
  })

  it('should log an error', () => {
    const spy = jest.spyOn(global.console, 'error')

    validateSelectorPrefix('0fela')
    validateSelectorPrefix('fela ')
    validateSelectorPrefix('-foo')

    expect(spy).not.toHaveBeenCalledTimes(3)
  })
})
