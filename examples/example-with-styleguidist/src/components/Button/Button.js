import React from 'react'
import PropTypes from 'prop-types'
import { createComponent } from 'react-fela'

// declare fela styles
const __buttonStyle = props => ({
  padding: '.5em 1.5em',
  color: `${props.color || props.theme.colorGrey}`,
  'background-color': props.theme.colorWhite,
  border: '1px solid currentColor',
  'border-radius': props.theme.borderRadius,
  'text-align': 'center',
  'vertical-align': 'middle',
  cursor: 'pointer',
  fontSize: `${props.theme.buttonSizes[props.size] ||
    props.theme.buttonSizes['normal']}`,
})

const ButtonComponent = createComponent(__buttonStyle, 'button', [
  'color',
  'size',
  'onClick',
])

/**
 * The only true button.
 * Note: This component uses react-fela createComponent api to render styles for demo.
 */
export default function Button(props) {
  const { children, ...passDownProps } = props
  return <ButtonComponent {...passDownProps}>{children}</ButtonComponent>
}
Button.propTypes = {
  /** Button label */
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  /** The color for the button */
  color: PropTypes.string,
  /** The size of the button */
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  /** Gets called when the user clicks on the button */
  onClick: PropTypes.func,
}
Button.defaultProps = {
  color: '#333',
  size: 'normal',
  /* eslint-disable no-console */
  onClick: event => {
    console.log('You have clicked me!', event.target)
  },
  /* eslint-enable no-console */
}
