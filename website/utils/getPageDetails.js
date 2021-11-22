import { promises as fs } from 'fs'
import { join } from 'path'
import React from 'react'
import TestRenderer from 'react-test-renderer'
import MDX from '@mdx-js/runtime'

import { getFixedId, getId } from '../components/Heading'

import processMarkdown from './processMarkdown'

const DIR_PATH = join(process.cwd(), 'docs/')

function Heading({ level, children, addHeading }) {
  const [text, fixedId] = getFixedId(children)
  const id = getId(children, level, fixedId)
  addHeading([text, id, level])

  return null
}

function getHeadings(content) {
  const headings = []

  const components = {
    h2: ({ children }) => (
      <Heading level={2} addHeading={(h) => headings.push(h)}>
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading level={3} addHeading={(h) => headings.push(h)}>
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading level={4} addHeading={(h) => headings.push(h)}>
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading level={5} addHeading={(h) => headings.push(h)}>
        {children}
      </Heading>
    ),
    h6: ({ children }) => (
      <Heading level={6} addHeading={(h) => headings.push(h)}>
        {children}
      </Heading>
    ),
  }

  // we remove all import statements
  const lines = content.split('\n')
  const startLine = lines.find((line) => line.indexOf('# ') === 0)
  const startIndex = lines.indexOf(startLine)

  const safeContent = lines.slice(startIndex).join('\n')

  TestRenderer.create(<MDX components={components}>{safeContent}</MDX>)

  return headings
}

export default async function getPageDetails(page) {
  const content = await fs.readFile(join(DIR_PATH, page + '.mdx'), {
    encoding: 'utf-8',
  })

  const headings = getHeadings(content)
  const children = await processMarkdown(content)

  return {
    children,
    headings,
  }
}
