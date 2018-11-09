import 'raf/polyfill'
import React from 'react'
import { createComponent } from 'react-fela'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import felaMount from '../felaMount'

Enzyme.configure({ adapter: new Adapter() })

const rootTheme = {
  fontSizes: [10, 12, 14, 16, 20, 24, 32, 48, 64, 80],
  color: {
    grass: '#9BCA3E',
    black: '#000',
  },
  fontSize: '15px',
}

const boxRules = ({ size = 10, theme }) => ({
  width: `${size}px`,
  height: `${size}px`,
  color: theme.color.grass,
})
const Box = createComponent(boxRules)
const InnerBox = createComponent(boxRules)

const component = (
  <Box>
    <InnerBox size={15}>text</InnerBox>
    <InnerBox>text</InnerBox>
  </Box>
)

describe('felaMount', () => {
  it('should snapshot mounted component', () => {
    const { wrapper, snapshot } = felaMount(component, {}, rootTheme)
    expect(snapshot(wrapper)).toMatchSnapshot()
  })
})
