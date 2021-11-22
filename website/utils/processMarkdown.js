import { serialize } from 'next-mdx-remote/serialize'

export default async function processMarkdown(content, scope) {
  return await serialize(content, {
    scope,
  })
}
