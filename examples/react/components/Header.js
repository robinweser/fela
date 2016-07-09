import React from 'react'
import { connect } from 'react-fela'

const Header = ({ title, styles }) => (
  <div className={styles}>
    {title}
  </div>
)

const welcome = props => ({
  animation: props.name + ' 2s infinite',
  color: 'rgb(50, 50, 50)',
  fontSize: 100,
  padding: 50,
  ':hover': {
    animationDuration: '500ms'
  },
  '@media (max-width: 800px)': {
    fontSize: '40px'
  },

  // validation test
  invalid: {
    color: 'blue'
  }
})

const animation = props => ({
  '0%': {
    color: props.color
  },
  '50%': {
    color: 'blue'
  },
  '80%': {
    color: 'purple'
  },
  '100%': {
    color: props.color
  },

  // validation test
  invalid: {
    color: 'blue'
  }
})

const mapStylesToProps = props => renderer => renderer.renderRule(welcome, {
  name: renderer.renderKeyframe(animation, { color: 'green' })
})

export default connect(mapStylesToProps)(Header)
