import React from 'react'
import { ThemeProvider } from 'react-fela'
import Head from 'next/head'

import FelaProvider from '../styling/FelaProvider'
import theme from '../styling/theme'

export default function App({ Component, pageProps, renderer }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,height=device-height,initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <FelaProvider renderer={renderer}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </FelaProvider>
    </>
  )
}
