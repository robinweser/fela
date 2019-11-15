import { createComponent } from 'react-fela'

const center = props => ({
  '@media (min-width: 100px)': {
    color: 'blue',
  },
  '@media (min-width: 10000px)': {
    color: 'red',
  },
  '@media (max-width: 200px)': {
    color: 'red',
  },
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  flex: props.flex || 1,
  fontFace: {
    fontFamily: 'Lato',
    src: [
      'https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff',
    ],
  },
})

export default createComponent(center)
