export default function queryNode(
  { type, media, support },
  targetDocument = document
) {
  const mediaQuery = media ? `[media="${media}"]` : ':not([media])'
  const supportQuery = support
    ? '[data-fela-support="true"]'
    : ':not([data-fela-support="true"])'

  return targetDocument.querySelector(
    `[data-fela-type="${type}"]${supportQuery}${mediaQuery}`
  )
}
