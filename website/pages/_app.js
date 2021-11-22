import React from 'react'
import { ThemeProvider } from 'react-fela'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Template from '../components/Template'
import DocLayout from '../components/DocLayout'
import FelaProvider from '../styling/FelaProvider'
import theme from '../styling/theme'

export default function App({ Component, pageProps, renderer }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,height=device-height,initial-scale=1, viewport-fit=cover"
        />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <FelaProvider renderer={renderer}>
        <ThemeProvider theme={theme}>
          <Template>
            <Component {...pageProps} />
          </Template>
        </ThemeProvider>
      </FelaProvider>
    </>
  )
}
