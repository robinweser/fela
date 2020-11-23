import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { renderToNodeList } from 'react-fela'

import getFelaRenderer from '../styling/getFelaRenderer'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const renderer = getFelaRenderer()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => <App {...props} renderer={renderer} />,
      })

    const initialProps = await Document.getInitialProps(ctx)
    const styles = renderToNodeList(renderer)
    return {
      ...initialProps,
      styles: [...initialProps.styles, ...styles],
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            src="https://kit.fontawesome.com/7ab8891207.js"
            crossorigin="anonymous"
          />
        </body>
      </Html>
    )
  }
}
