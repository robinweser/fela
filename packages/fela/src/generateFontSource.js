/* @flow */
import arrayReduce from 'fast-loops/lib/arrayReduce'

import getFontUrl from './getFontUrl'
import getFontFormat from './getFontFormat'

export default function generateFontSource(
  files: Array<string> = [],
  fontLocals: Array<string> = []
): string {
  const localSource = arrayReduce(
    fontLocals,
    (src, local, index) => {
      const prefix = index > 0 ? ',' : ''
      const localUrl = getFontUrl(local)

      return `${src}${prefix}local(${localUrl})`
    },
    ''
  )
  const urlSource = arrayReduce(
    files,
    (src, fileSource, index) => {
      const prefix = index > 0 ? ',' : ''
      const fileFormat = getFontFormat(fileSource)
      const fileUrl = getFontUrl(fileSource)

      return `${src}${prefix}url(${fileUrl}) format('${fileFormat}')`
    },
    ''
  )
  const delimiter = localSource.length > 0 && urlSource.length > 0 ? ',' : ''

  return `${localSource}${delimiter}${urlSource}`
}
