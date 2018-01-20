import { createComponent } from 'react-fela'

const rule = () => ({
  color: 'red',
  '@media (min-height: 300px)': {
    backgroundColor: 'red',
    lineHeight: 2,
    ':hover': {
      color: 'black',
    },
  },
})

export default createComponent(rule)
