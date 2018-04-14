import { createComponent } from 'react-fela'

const rule = function({ fontSize, padding }) {
  return {
    fontSize,
    color: 'red',
    '@media (min-height: 300px)': {
      backgroundColor: 'red',
      lineHeight: 2,
      ':hover': {
        color: 'black',
        paddingLeft: padding,
      },
    },
  }
}

export default createComponent(rule)
