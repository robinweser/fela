import Prefixer from 'inline-style-prefixer'

export default options => {
  const prefixer = new Prefixer(options)

  return style => prefixer.prefix(style)
}
