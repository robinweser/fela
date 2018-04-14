import { RULE_TYPE, KEYFRAME_TYPE } from 'fela-utils'
import validator from '../index'

describe('Validator plugin', () => {
  const consoleSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => undefined)

  afterEach(() => {
    consoleSpy.mockReset()
  })

  afterAll(() => {
    consoleSpy.mockRestore()
  })

  it('should be an empty console output for correct style', () => {
    validator()(
      {
        fontSize: '10px',
      },
      RULE_TYPE
    )

    expect(consoleSpy).not.toHaveBeenCalled()
  })

  it('should log into the console an error about the invalid keyframe', () => {
    validator()(
      {
        from: 10,
        to: 20,
      },
      KEYFRAME_TYPE
    )

    expect(consoleSpy.mock.calls).toMatchSnapshot()
  })

  describe('with useCSSLint', () => {
    it('should log into the console an error about the incorrect style', () => {
      validator({ useCSSLint: true })(
        {
          fontSize: 'abc',
        },
        RULE_TYPE
      )

      expect(consoleSpy.mock.calls).toMatchSnapshot()
    })

    it('should log into the console an error about the incorrect nested style', () => {
      validator({ useCSSLint: true })(
        {
          ':hover': {
            fontSize: 'abc',
          },
        },
        RULE_TYPE
      )

      expect(consoleSpy.mock.calls).toMatchSnapshot()
    })

    it('should log into the console an error about the invalid nested property', () => {
      validator({ useCSSLint: true })(
        {
          'wrong nested property': {},
        },
        RULE_TYPE
      )

      expect(consoleSpy.mock.calls).toMatchSnapshot()
    })

    it('should be an empty console output for correct keyframe', () => {
      validator({ useCSSLint: true })(
        {
          from: { fontSize: '10px' },
          to: { fontSize: '12px' },
        },
        KEYFRAME_TYPE
      )

      expect(consoleSpy).not.toHaveBeenCalled()
    })

    it('should log into the console an error about the invalid keyframe property', () => {
      validator({ useCSSLint: true })(
        {
          start: { fontSize: '10pxp' },
          end: { fontSiz: '12px' },
        },
        KEYFRAME_TYPE
      )

      expect(consoleSpy.mock.calls).toMatchSnapshot()
    })

    it('should log into the console an error about the incorrect style in keyframe', () => {
      validator({ useCSSLint: true })(
        {
          from: { fontSize: '10pxp' },
          to: { fontSiz: '12px' },
        },
        KEYFRAME_TYPE
      )

      expect(consoleSpy.mock.calls).toMatchSnapshot()
    })

    it('should not log into the console an error if current rule disabled', () => {
      validator({
        useCSSLint: {
          important: false,
        },
      })(
        {
          fontSize: '10px !important',
        },
        RULE_TYPE
      )

      expect(consoleSpy).not.toHaveBeenCalled()
    })
  })
})
