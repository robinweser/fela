import React from 'react'
import PropTypes from 'prop-types'
import { createComponent, ThemeProvider, withTheme } from 'react-fela'
import felaShallow from '../felaShallow'

const mergeThemes = (baseTheme, ...themes) => {
  if (themes) {
    return themes.reduce((acc, theme) => {
      if (typeof theme === 'function') {
        theme = theme(baseTheme)
      }

      return Object.assign({}, acc, theme)
    }, baseTheme)
  }

  return baseTheme
}

// eslint-disable-line behance/no-deprecated
const applyTheme = (ComponentToWrap, ...themes) => {
  const ThemedComponent = props => (
    <ThemeProvider theme={mergeThemes(props.theme || {}, ...themes)}>
      <ComponentToWrap {...props} />
    </ThemeProvider>
  )

  ThemedComponent._isFelaComponent = true
  ThemedComponent.defaultProps = {
    theme: {},
  }
  ThemedComponent.propTypes = {
    theme: PropTypes.object,
  }

  const WithThemeHOC = withTheme(ThemedComponent)
  return WithThemeHOC
}

const Div = createComponent(() => ({ color: 'black' }))

const rootTheme = {
  fontSizes: [10, 12, 14, 16, 20, 24, 32, 48, 64, 80],
  color: {
    grass: '#9BCA3E',
    black: '#000',
  },
  fontSize: '15px',
}

describe('felaShallow', () => {
  describe('component created with createComponent', () => {
    it('should return a formatted snapshot object with DOM and styles', () => {
      const { wrapper, snapshot } = felaShallow(<Div />, {}, rootTheme)
      expect(snapshot(wrapper)).toMatchSnapshot()
    })

    it('should return a shallow snapshot without styles(essentially same as enzyme shallow and enzyme-to-json) ', () => {
      const { wrapper, snapshot } = felaShallow(<Div />, {}, rootTheme)
      expect(snapshot(wrapper, false)).toMatchSnapshot()
    })
  })

  describe('Regular React Component', () => {
    it('should return a snapshot of the component, shallow rendered', () => {
      const Component = () => <Div />
      const { wrapper, snapshot } = felaShallow(<Component />, {}, rootTheme)
      expect(snapshot(wrapper)).toMatchSnapshot()
    })

    it('should return be able to find child Fela Component and capture its snapshot', () => {
      const Component = () => <Div />
      const { wrapper, snapshot } = felaShallow(<Component />, {}, rootTheme)
      const children = wrapper.find(Div)
      expect(snapshot(children)).toMatchSnapshot()
    })
  })

  describe('felaDive', () => {
    it('should allow access to component wrapped by Fela Hoc components', () => {
      const { wrapper, snapshot, felaDive } = felaShallow(
        <Div>
          <Div />
        </Div>
      )

      const innerDiv = felaDive(wrapper)
      expect(snapshot(innerDiv, false)).toMatchSnapshot()
    })
  })

  describe('components withTheme', () => {
    const DivWithTheme = ({ theme }) => <Div>{theme.color.grass}</Div>
    DivWithTheme.propTypes = {
      theme: PropTypes.object,
    }

    const WithThemeDiv = withTheme(DivWithTheme)
    it('should capture snapshot', () => {
      const { wrapper, snapshot } = felaShallow(<WithThemeDiv />, {}, rootTheme)
      expect(snapshot(wrapper)).toMatchSnapshot()
    })
  })

  describe('components created with applyTheme', () => {
    const boxRules = ({ size = 10, theme }) => ({
      width: `${size}px`,
      height: `${size}px`,
      color: theme.color.grass,
      backgroundColor: theme.foo,
      fontSize: theme.fontSize,
    })

    const themeBoxRules = theme => ({
      foo: theme.color.black,
    })

    const extraThemeBoxRules = theme => ({
      fontSize: theme.fontSizes[0],
    })

    const Box = ({ className, children }) => (
      <div className={className}> {children} </div>
    )

    Box.defaultProps = {
      className: '',
      children: null,
    }
    Box.propTypes = {
      className: PropTypes.string,
      children: PropTypes.node,
    }

    const UnstyledBox = createComponent(boxRules, Box)
    const StyledBox = applyTheme(UnstyledBox, themeBoxRules)
    const StyledBoxWithExtraRules = applyTheme(
      UnstyledBox,
      themeBoxRules,
      extraThemeBoxRules
    )

    it('should snapshot fela component with extra theme', () => {
      const component = <StyledBox>innerText</StyledBox>

      const { wrapper, snapshot } = felaShallow(component, {}, rootTheme)
      expect(snapshot(wrapper)).toMatchSnapshot()
    })

    it('should snapshot fela component without extra theme', () => {
      const component = (
        <StyledBoxWithExtraRules>innerText</StyledBoxWithExtraRules>
      )

      const { wrapper, snapshot } = felaShallow(component, {}, rootTheme)
      expect(snapshot(wrapper)).toMatchSnapshot()
    })
  })

  describe('nested fela components', () => {
    const boxRules = ({ size = 10, theme }) => ({
      width: `${size}px`,
      height: `${size}px`,
      color: theme.color.grass,
    })
    const Box = createComponent(boxRules)
    const InnerBox = createComponent(boxRules)

    let component
    beforeEach(() => {
      component = (
        <Box>
          <InnerBox size={'15'}>text</InnerBox>
          <InnerBox>text</InnerBox>
        </Box>
      )
    })

    it('should snapshot root level box', () => {
      const { wrapper, snapshot } = felaShallow(component, {}, rootTheme)
      expect(snapshot(wrapper)).toMatchSnapshot()
    })

    it('should snapshot children boxes', () => {
      const { wrapper, snapshot } = felaShallow(component, {}, rootTheme)
      const children = wrapper.find(InnerBox)
      expect(snapshot(children)).toMatchSnapshot()
    })

    it('should snapshot not found objects', () => {
      const { wrapper, snapshot } = felaShallow(component, {}, rootTheme)
      const noChild = wrapper.find('foo')
      expect(snapshot(noChild)).toMatchSnapshot('no child')
    })
  })
})
