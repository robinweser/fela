import { createComponent } from 'react-fela'

const rule = ({ fontSize, padding }, renderer) => {
  if (!renderer.cache._asdsd) {
    renderer.cache._asdsd = renderer.renderRule(() => ({
      color: 'red',
      '@media (min-height: 300px)': {
        backgroundColor: 'red',
        lineHeight: 2,
        ':hover': {
          color: 'black'
        }
      }
    }))
  }

  return {
    _className: renderer.cache._asdsd,
    fontSize,
    color: 'red',
    '@media (min-height: 300px)': {
      ':hover': {
        paddingLeft: padding
      }
    }
  }
}

export default createComponent(rule)
