import prefix from 'inline-style-prefix-all'

export default function prefixer() {
  return ({ styles }) => prefix(styles)
}
