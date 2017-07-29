import { createComponent } from 'react-fela'

const rule = ({ fontSize, padding }) => ({
  fontSize,
  color: 'red',
  '@media (min-height: 300px)': {
    backgroundColor: 'red',
    lineHeight: 2,
    ':hover': {
      color: 'black',
      paddingLeft: padding
    }
  }
})

export default createComponent(rule)
