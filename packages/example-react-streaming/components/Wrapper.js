import { createComponent } from 'react-fela'

const center = props => ({
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  flex: props.flex || 1,
  fontFace: {
    fontFamily: 'Lato',
    src: [
      'https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff'
    ]
  }
})

export default createComponent(center)
