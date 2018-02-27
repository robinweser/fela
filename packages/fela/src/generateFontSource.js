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
    (src, local) => {
      const localUrl = getFontUrl(local)
      return `{src} local(${localUrl}), `
    },
    ''
  )

  return arrayReduce(
    files,
    (src, fileSource, index) => {
      const prefix = index > 0 ? ',' : ''
      const fileFormat = getFontFormat(fileSource)
      const fileUrl = getFontUrl(fileSource)

      return `${prefix}url(${fileUrl}) format('${fileFormat}')`
    },
    localSource
  )
}
