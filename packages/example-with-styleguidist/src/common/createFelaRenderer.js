import { createRenderer as createFelaRenderer } from 'fela'
import embedded from 'fela-plugin-embedded'
import validator from 'fela-plugin-validator'
import friendlyPsuedo from 'fela-plugin-friendly-pseudo-class'
import placeholderPrefixer from 'fela-plugin-placeholder-prefixer'
import beautifier from 'fela-beautifier'
import statistics from 'fela-statistics'
import webPreset from 'fela-preset-web'
import namedMediaQuery from 'fela-plugin-named-media-query'
import whitelistMediaQuery from './whitelistMediaQueryPlugin'
import theme from './base-ui-theme'

const mediaQueries = {
  mobile: `@media (min-width: ${theme.breakpoints.mobile})`,
  mobileWide: `@media (min-width: ${theme.breakpoints.mobileWide})`,
  tablet: `@media (min-width: ${theme.breakpoints.tablet})`,
  desktop: `@media (min-width: ${theme.breakpoints.desktop})`,
  desktopLarge: `@media (min-width: ${theme.breakpoints.desktopLarge})`
}

const removePrefix = query => query.replace('@media ', '')

const createRenderer = () => {
  const plugins = [
    placeholderPrefixer(),
    friendlyPsuedo(),
    ...webPreset,
    embedded(),
    namedMediaQuery(mediaQueries)
  ]
  const enhancers = []

  if (process.env.NODE_ENV === 'development') {
    plugins.push(
      validator({
        logInvalid: true,
        deleteInvalid: true
      })
    )
    plugins.push(whitelistMediaQuery(mediaQueries))
    /* eslint-disable no-undef */
    if (__CLIENT__ && __STATISTICS__) {
      /* eslint-enable */
      // enabled via define plugin in styleguidist.config.js
      plugins.push(statistics())
    }
    enhancers.push(beautifier())
  }

  return createFelaRenderer({
    plugins,
    enhancers,
    mediaQueryOrder: [
      removePrefix(mediaQueries.mobile),
      removePrefix(mediaQueries.mobileWide),
      removePrefix(mediaQueries.tablet),
      removePrefix(mediaQueries.desktop),
      removePrefix(mediaQueries.desktopLarge)
    ]
  })
}

export default createRenderer
