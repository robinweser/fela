var withMDX = require('@next/mdx')

var withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const mdxRenderer = `
  import React from 'react'
  import { mdx } from '@mdx-js/react'

  export async function getStaticProps () {
    return {
      props: {
        foo: 'bar'
      }
    }
  }
`

module.exports = withBundleAnalyzer(
  withMDX({
    extension: /\.(md|mdx)$/,
    options: {
      renderer: mdxRenderer,
    },
  })({
    pageExtensions: ['js', 'mdx'],
    target: 'serverless',
    async redirects() {
      return [
        {
          source: '/docs',
          destination: '/docs/latest/intro/getting-started',
          permanent: true,
        },
      ]
    },
    webpack(config) {
      for (const rule of config.module.rules) {
        if (!rule.oneOf) {
          continue
        }

        // removing the global css restriction
        // do not touch this
        const cssRule = rule.oneOf[2]

        cssRule.test = /.css$/
        cssRule.use.forEach((use) => {
          if (use.loader.indexOf('css-loader') !== -1) {
            use.options.modules = false
          }
        })
      }

      config.node.fs = 'empty'

      return config
    },
  })
)
