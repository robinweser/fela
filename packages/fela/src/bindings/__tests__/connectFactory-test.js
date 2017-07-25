import React, { createElement, Component } from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { html as beautify } from 'js-beautify'
import createRenderer from '../../createRenderer'
import connectFactory from '../connectFactory'

const connect = connectFactory(Component, createElement, {
  renderer: PropTypes.object
})

describe('Connect Factory for bindings', () => {
  it('should process rules and create classNames', () => {
    const rules = {
      rule1: () => ({
        padding: 1
      }),
      rule2: () => ({
        color: 'red'
      })
    }

    const MyComponent = connect(rules)(({ styles }) =>
      <div>
        <span className={styles.rule1} />
        <span className={styles.rule2} />
      </div>
    )

    const renderer = createRenderer()
    const wrapper = mount(<MyComponent />, {
      context: {
        renderer
      }
    })

    expect([
      beautify(`<style>${renderer.renderToString()}</style>`),
      toJson(wrapper)
    ]).toMatchSnapshot()
  })
})
