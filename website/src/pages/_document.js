import Document, { Head, Main, NextScript } from 'next/document'
import { renderToSheetList } from 'fela-dom'

import FelaProvider from '../styling/FelaProvider'
import getFelaRenderer from '../styling/getFelaRenderer'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const serverRenderer = getFelaRenderer()

    const page = renderPage(App => props => (
      <FelaProvider renderer={serverRenderer}>
        <App {...props} />
      </FelaProvider>
    ))

    const sheetList = renderToSheetList(serverRenderer)

    return {
      ...page,
      sheetList,
    }
  }

  render() {
    const styleNodes = this.props.sheetList.map(
      ({ type, rehydration, support, media, css }) => (
        <style
          dangerouslySetInnerHTML={{ __html: css }}
          data-fela-rehydration={rehydration}
          data-fela-support={support}
          data-fela-type={type}
          key={`${type}-${media}`}
          media={media}
        />
      )
    )

    return (
      <html>
        <Head>
          <title>Fela Documentation</title>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
            integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
            crossOrigin="anonymous"
          />
          {styleNodes}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
