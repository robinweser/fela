import { createRenderer } from 'fela'
import plugins from 'fela-preset-web'
import responsiveValue from 'fela-plugin-responsive-value'
import sortMediaQueryMobileFirst from 'fela-sort-media-query-mobile-first'
import namedKeys from 'fela-plugin-named-keys'

import staticStyle from './staticStyle'

export const responsiveProps = {
  padding: true,
  paddingLeft: true,
  paddingRight: true,
  paddingBottom: true,
  paddingTop: true,
  margin: true,
  marginLeft: true,
  marginRight: true,
  marginBottom: true,
  marginTop: true,
  width: true,
  height: true,
  minWidth: true,
  minHeight: true,
  maxWidth: true,
  maxHeight: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  alignSelf: true,
  alignItems: true,
  alignContent: true,
  justifyContent: true,
  flexDirection: true,
  flexWrap: true,
  order: true,
  display: true,
}

const getResponsiveMediaQueries = (values, props) => {
  const { small, medium, large, huge } = props.theme.breakpoints

  const mediaQueryMap = {
    2: [small],
    3: [small, medium],
    4: [small, medium, large],
    5: [small, medium, large, huge],
  }

  return mediaQueryMap[values.length]
}

export default function getFelaRenderer() {
  const renderer = createRenderer({
    filterClassName: (cls) => cls.match(/(ad|fa)/gi) === null,
    enhancers: [sortMediaQueryMobileFirst()],
    plugins: [
      responsiveValue(getResponsiveMediaQueries, responsiveProps),
      namedKeys((props) =>
        props && props.theme ? props.theme.breakpoints : {}
      ),
      ...plugins,
    ],
  })

  staticStyle.forEach((rule) =>
    renderer.renderStatic(rule.style, rule.selector)
  )

  return renderer
}
