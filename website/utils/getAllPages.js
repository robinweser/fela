import { promises as fs } from 'fs'
import { join } from 'path'

const DIR_PATH = join(process.cwd(), 'docs/')

async function getFiles(path, prefix = '') {
  const entries = await fs.readdir(path, { withFileTypes: true })

  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => prefix + file.name.replace('.mdx', ''))
  const folders = entries.filter((folder) => folder.isDirectory())

  for (const folder of folders)
    files.push(
      ...(await getFiles(`${path}${folder.name}/`, prefix + folder.name + '/'))
    )

  return files
}

export default async function getAllPages() {
  return await getFiles(DIR_PATH)
}
