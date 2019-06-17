import arrayReduce from 'fast-loops/lib/arrayReduce'

import type { DOMRendererDocumentRef } from '../../../flowtypes/DOMRenderer'

const getDocumentRefIndex = (
  documentRefs: DOMRendererDocumentRef[],
  target: Object
) =>
  arrayReduce(documentRefs, (accIndex, documentRef, index) => {
    if (documentRef.target === target) {
      return index
    }

    return accIndex
  })

export default getDocumentRefIndex
