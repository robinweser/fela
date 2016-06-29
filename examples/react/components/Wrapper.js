import React from 'react'
import { connect } from 'react-fela'

const Wrapper = ({ children, styles }) => (
  <div className={styles}>
    {children}
  </div>
)

const center = props => ({
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  flex: props.flex || 1
})

const mapStylesToProps = props => renderer => renderer.renderRule(center, props)
export default connect(mapStylesToProps)(Wrapper)
