import { outputFileSync, readFileSync } from 'fs-extra'
import { join } from 'path'
import recursive from 'recursive-readdir'

import React from 'react'
import TestRenderer from 'react-test-renderer'
import MDX from '@mdx-js/runtime'

import { getFixedId, getId } from '../components/Heading'

function Heading({ level, children, addHeading }) {
  const [text, fixedId] = getFixedId(children)
  const id = getId(children, level, fixedId)
  addHeading([text, id, level])

  return null
}
function generateHeadings(file) {
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

  const content = readFileSync(file, 'utf-8')

  TestRenderer.create(<MDX components={components}>{content}</MDX>)

  return headings
}

recursive(join(__dirname, '../pages/docs'), (err, files) => {
  if (err) {
    throw err
  }

  // `files` is an array of file paths
  files.forEach((file) => {
    const headings = generateHeadings(file)

    const dataPath = file.replace('/pages/docs/', '/data/headings/')

    outputFileSync(
      dataPath.replace('.mdx', '.json'),
      JSON.stringify(headings, null, 2)
    )
  })
})
