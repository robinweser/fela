var withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/latest/intro/getting-started',
        permanent: true,
      },
      {
        source: '/benchmarks',
        destination: '/benchmarks/benchmarks.html',
        permanent: true,
      },
    ]
  },
})
