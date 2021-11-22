import React from 'react'

import DocLayout from '../../components/DocLayout'

import getAllPages from '../../utils/getAllPages'
import getPageDetails from '../../utils/getPageDetails'

export default function Page({ children, headings, toc, version }) {
  return (
    <DocLayout toc={toc} headings={headings} version={version}>
      {children}
    </DocLayout>
  )
}

export async function getStaticPaths() {
  const pages = await getAllPages()

  return {
    fallback: false,
    paths: pages.map((page) => ({
      params: {
        path: page.split('/'),
      },
    })),
  }
}

export async function getStaticProps({ params }) {
  const version = params.path[0]
  const pageDetails = await getPageDetails(params.path.join('/'))

  const toc = require('../../data/tocs/' + version + '.json')

  return {
    props: {
      toc,
      version,
      ...pageDetails,
    },
  }
}
