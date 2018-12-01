export default function composeMods(...codemods) {
  return (file, api, options) => {
    let source = file.source

    codemods.forEach(mod => {
      source = mod({ ...file, source }, api, options)
    })

    return source
  }
}
