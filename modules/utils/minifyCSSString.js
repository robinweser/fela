/* @flow weak */
export default function minifyCSSString(style) {
  return style.replace(/\s{2,}/g, '')
}
