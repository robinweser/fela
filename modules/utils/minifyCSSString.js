/* @flow */
export default function minifyCSSString(style: string): string {
  return style.replace(/\s{2,}/g, '')
}
