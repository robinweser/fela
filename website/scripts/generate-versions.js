import { outputFileSync, readdirSync, lstatSync } from 'fs-extra'
import { join } from 'path'

const isDirectory = (source) => lstatSync(source).isDirectory()
const getDirectories = (source) =>
  readdirSync(source).filter((name) => isDirectory(join(source, name)))

const versions = getDirectories(join(__dirname, '../pages/docs'))

outputFileSync(
  join(__dirname, '../data/versions.json'),
  JSON.stringify(versions, null, 2)
)
