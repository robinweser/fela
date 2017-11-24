/* @flow */
import forEach from 'lodash/forEach'

import type { Theme } from '../../../flowtypes/Theme'

export default function createTheme(
  themeProperties: Object = {},
  previousTheme: Theme
): Theme {
  const theme: Theme = {
    listeners: [],
    properties: themeProperties,

    update(newProperties: Object): void {
      theme.properties = newProperties
      theme._emitChange()
    },

    get(): Object {
      return {
        ...theme.previousProperties,
        ...theme.properties,
      }
    },

    subscribe(listener: Function): Function {
      theme.listeners.push(listener)

      return () => theme.listeners.splice(theme.listeners.indexOf(listener), 1)
    },

    _emitChange(): void {
      const properties = theme.get()

      forEach(theme.listeners, listener => listener(properties))
    },
  }

  if (previousTheme) {
    theme.previousProperties = previousTheme.get()
    previousTheme.subscribe(properties => {
      theme.previousProperties = properties
      theme._emitChange()
    })
  } else {
    theme.previousProperties = {}
  }

  return theme
}
