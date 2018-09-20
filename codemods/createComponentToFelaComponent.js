/**
 * Right now this file only includs examples rather than an actual codemod
 */

// Simple modification
const input = createComponent(rule)

const output = ({ children, ...props }) => (
  <FelaComponent {...props} rule={rule}>
    {children}
  </FelaComponent>
)

// custom render type
const input = createComponent(rule, 'span')

import c from 'classnames'

const output = ({ children, ...props }) => (
  <FelaComponent {...props} rule={rule} render="span">
    {children}
  </FelaComponent>
)

// passing special props
const output = ({ children, style, id, ...props }) => (
  <FelaComponent
    {...props}
    rule={rule}
    render={({ className }) => (
      <span className={className} style={style} id={id}>
        {children}
      </span>
    )}
  />
)

// merging classNames
import c from 'classnames'

const output = ({ children, className, ...props }) => (
  <FelaComponent
    {...props}
    rule={rule}
    render={renderProps => (
      <span className={c(className, renderProps.className)}>{children}</span>
    )}
  />
)

// array pass through
const input = createComponent(rule, 'div', ['data-foo'])

const output = ({ children, ...props }) => (
  <FelaComponent
    {...props}
    rule={rule}
    render={interface => (
      <div className={className} data-foo={props['data-foo']}>
        {children}
      </div>
    )}
  />
)

// composing components
const a = createComponent(rule)
const input = createComponent(rule2, a)

import { combineRules } from 'fela'

const output = ({ children, ...props }) => (
  <FelaComponent {...props} rule={combineRules(rule, rule2)}>
    {children}
  </FelaComponent>
)

// extending styles
const rule = ({ extend }) => ({
  color: 'red',
  ...extend,
})

const output = ({ children, ...props }) => (
  <FelaComponent {...props} rule={rule}>
    {children}
  </FelaComponent>
)
