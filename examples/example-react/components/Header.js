import React from 'react'
import { createComponentWithProxy } from 'react-fela'

const Header = ({ title, className }) => (
  <div className={className}>{title}</div>
)

const rule = () => ({
  '@media (min-width: 1024px)': {
    color: 'red',
  },
  color: 'rgb(50, 50, 50)',
  fontSize: 100,
  padding: 50,
  ':hover': { animationDuration: '500ms' },
  '@supports (-webkit-flex:1)': {
    fontFamily: 'Impact',
  },

  '@media (min-width: 480px)': {
    color: 'blue',
  },
  '@media (max-width: 800px)': {
    '@supports (-webkit-flex:1)': {
      fontSize: 180,
    },
    fontSize: '40px',
  },
  animationDuration: '2s',
  animationIterationCount: 'infinite',
  animationName: {
    '0%': { color: 'green' },
    '50%': { color: 'blue' },
    '80%': { color: 'purple' },
    '100%': { color: 'green' },
  },
})

export default createComponentWithProxy(rule, Header)
