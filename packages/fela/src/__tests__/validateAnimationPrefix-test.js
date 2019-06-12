import validateAnimationPrefix from '../validateAnimationPrefix'

describe('Validating an animationPrefix', () => {
  it('should return without logging an error', () => {
    const spy = jest.spyOn(global.console, 'error')

    validateAnimationPrefix('fela_')
    validateAnimationPrefix('_fO09-4Da')

    expect(spy).not.toHaveBeenCalled()
  })

  it('should log an error', () => {
    const spy = jest.spyOn(global.console, 'error')

    validateAnimationPrefix('0fela')
    validateAnimationPrefix('fela ')
    validateAnimationPrefix('-foo')

    expect(spy).toHaveBeenCalledTimes(3)
  })
})
