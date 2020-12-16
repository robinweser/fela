import React from 'react'
import { useFela } from 'react-fela'
import VisuallyHidden from './VisuallyHidden'

const base = {
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: '-2px',
  overflow: 'hidden',
}
const svg = {
  color: 'inherit',
  fill: 'currentcolor',
  verticalAlign: 'baseline',
}

const Icon = (props) => {
  const { css } = useFela()

  if (!props.icon) {
    return null
  }

  if (!props.label) {
    return (
      <props.icon
        aria-hidden
        focusable="false"
        className={css({ ...svg, ...base, ...props.extend })}
      />
    )
  }

  // The `role` and `aria-live` attributes might be useful in case the icon
  // needs to provide further information to the accessibility tree such as
  // for a loading spinner.
  return (
    <span
      title={props.label}
      className={css({ ...base, ...props.extend })}
      role={props.role}
      aria-live={props['aria-live']}>
      <props.icon
        aria-hidden
        focusable="false"
        className={css({
          ...svg,
          width: 'inherit',
          height: 'inherit',
        })}
      />
      <VisuallyHidden>{props.label}</VisuallyHidden>
    </span>
  )
}

export default Icon
