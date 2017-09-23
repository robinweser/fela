import { createComponent } from 'react-fela'

export default createComponent(({ fontSize, padding }) => ({
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
}))
