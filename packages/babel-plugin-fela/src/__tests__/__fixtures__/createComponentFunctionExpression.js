import { createComponent } from 'react-fela'

function rule({ fontSize, padding }) {
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
