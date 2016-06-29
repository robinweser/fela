import React from 'react'
import { connect } from 'react-fela'

const Label = ({ styles, fontSize }) => (
  <div className={styles}>
    {fontSize}
  </div>
)

const label = props => ({
  fontSize: props.size,
  lineHeight: '200px',
  padding: 20
})

const mapStylesToProps = props => renderer => renderer.renderRule(label, {
  size: props.fontSize
})
export default connect(mapStylesToProps)(Label)
