import React from 'react'
import { Box } from 'kilvin'
import Head from 'next/head'
import { useFela } from 'react-fela'

import Layout from '../components/Layout'
import Button from '../components/Button'

export default function Page() {
  const { theme } = useFela()

  return (
    <>
      <Layout>
        <Box space={4} paddingTop={10} paddingBottom={10}>
          <h1>Not Found!</h1>
          <Box as="p" extend={{ fontSize: 20 }}>
            Sorry, the page your looking for could not be found.
          </Box>
          <br />

          <Box as="p">
            Are you searching for a specific documentation page?
            <br />
            We recently rewrote the whole website and sadly the links have
            changed. <br />
            But, the documentation structure mostly remained the same!
            <br />
          </Box>

          <Box alignSelf="flex-start" paddingTop={2} space={2} direction="row">
            <Button href="/docs">Documentation</Button>
            <Button
              href="https://github.com/robinweser/fela/discussions"
              variant="secondary">
              Ask For Help
            </Button>
          </Box>
        </Box>
      </Layout>
    </>
  )
}
