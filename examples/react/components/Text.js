import React from 'react'
import { connect } from 'react-fela'

const Text = ({ children, styles }) => (
  <div className={styles}>
    {children}
  </div>
)

const info = props => ({
  padding: 5,
  fontSize: '20px',
  color: 'gray',
  flexDirection: 'column'
})

const mapStylesToProps = () => renderer => renderer.renderRule(info)
export default connect(mapStylesToProps)(Text)
